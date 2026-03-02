import { useEffect, useState, useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard, AdminCardHeader } from '@/components/admin/AdminCard';
import { AdminTable, AdminTableRow, AdminTableCell, AdminTableEmpty } from '@/components/admin/AdminTable';
import { StatCard } from '@/components/admin/StatCard';
import { UserIdentity } from '@/components/admin/UserIdentity';
import { useAdminUserEmails } from '@/hooks/useAdminUserEmails';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Search, UserPlus, Edit, Filter, X, Users, CreditCard, FileText, Award, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface UserProfile {
  id: string;
  full_name: string | null;
  nickname: string | null;
  avatar_url: string | null;
  created_at: string;
  free_quiz_used: boolean;
  nickname_edit_count: number;
  purchase?: {
    pack_type: string | null;
    expires_at: string | null;
    amount_paid: number;
  } | null;
  quiz_count?: number;
}

const ITEMS_PER_PAGE = 20;

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { userEmails, loading: emailsLoading, refetch: refetchEmails } = useAdminUserEmails();
  const [grantAccessDialog, setGrantAccessDialog] = useState<UserProfile | null>(null);
  const [editUserDialog, setEditUserDialog] = useState<UserProfile | null>(null);
  const [grantPackType, setGrantPackType] = useState('PREMIUM_PLUS');
  const [grantAmount, setGrantAmount] = useState('0');
  const [editForm, setEditForm] = useState({ full_name: '', nickname: '', avatar_url: '' });
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [packFilter, setPackFilter] = useState('all');
  const [quizFilter, setQuizFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    withPurchase: 0,
    activeQuiz: 0,
    totalQuiz: 0,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: withPurchase } = await supabase
        .from('user_purchases')
        .select('user_id', { count: 'exact', head: true });

      const { data: quizData } = await supabase
        .from('quiz_results')
        .select('user_id');

      const uniqueQuizUsers = new Set(quizData?.map(q => q.user_id) || []);

      setStats({
        totalUsers: totalUsers || 0,
        withPurchase: withPurchase || 0,
        activeQuiz: uniqueQuizUsers.size,
        totalQuiz: quizData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  // Main data fetch with server-side pagination
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      // Build search filter - search in emails from client side if we have them
      let matchingUserIds: string[] | null = null;
      if (debouncedSearch && Object.keys(userEmails).length > 0) {
        const searchLower = debouncedSearch.toLowerCase();
        matchingUserIds = Object.entries(userEmails)
          .filter(([_, email]) => email?.toLowerCase().includes(searchLower))
          .map(([id, _]) => id);
      }

      // Build date filter
      let dateFrom: string | null = null;
      const now = new Date();
      if (dateFilter === '7days') {
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (dateFilter === '30days') {
        dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      } else if (dateFilter === '90days') {
        dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      }

      // Build query
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Apply search (name/nickname/id)
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        // Combine name search with email matches
        if (matchingUserIds && matchingUserIds.length > 0) {
          query = query.or(`full_name.ilike.%${searchLower}%,nickname.ilike.%${searchLower}%,id.in.(${matchingUserIds.join(',')})`);
        } else {
          query = query.or(`full_name.ilike.%${searchLower}%,nickname.ilike.%${searchLower}%,id.ilike.%${searchLower}%`);
        }
      }

      // Apply date filter
      if (dateFrom) {
        query = query.gte('created_at', dateFrom);
      }

      // Order and paginate
      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1);

      const { data: profiles, count, error } = await query;

      if (error) throw error;

      // Fetch purchases for these users
      const userIds = profiles?.map(p => p.id) || [];
      let purchases: any[] = [];
      if (userIds.length > 0) {
        const { data: purchaseData } = await supabase
          .from('user_purchases')
          .select('*')
          .in('user_id', userIds);
        purchases = purchaseData || [];
      }

      // Fetch quiz counts for these users
      let quizCounts: Record<string, number> = {};
      if (userIds.length > 0) {
        const { data: quizData } = await supabase
          .from('quiz_results')
          .select('user_id')
          .in('user_id', userIds);
        
        quizData?.forEach(q => {
          quizCounts[q.user_id] = (quizCounts[q.user_id] || 0) + 1;
        });
      }

      // Build purchase map (latest per user)
      const purchaseMap: Record<string, typeof purchases[0]> = {};
      purchases.forEach(p => {
        if (!purchaseMap[p.user_id] || new Date(p.purchased_at) > new Date(purchaseMap[p.user_id].purchased_at)) {
          purchaseMap[p.user_id] = p;
        }
      });

      // Merge data
      let mergedUsers = profiles?.map(profile => ({
        ...profile,
        purchase: purchaseMap[profile.id] ? {
          pack_type: purchaseMap[profile.id].pack_type,
          expires_at: purchaseMap[profile.id].expires_at,
          amount_paid: Number(purchaseMap[profile.id].amount_paid),
        } : null,
        quiz_count: quizCounts[profile.id] || 0,
      })) || [];

      // Apply client-side pack filter
      if (packFilter !== 'all') {
        if (packFilter === 'none') {
          mergedUsers = mergedUsers.filter(u => !u.purchase);
        } else if (packFilter === 'active') {
          mergedUsers = mergedUsers.filter(u => u.purchase && (!u.purchase.expires_at || new Date(u.purchase.expires_at) > new Date()));
        } else if (packFilter === 'expired') {
          mergedUsers = mergedUsers.filter(u => u.purchase && u.purchase.expires_at && new Date(u.purchase.expires_at) <= new Date());
        } else {
          mergedUsers = mergedUsers.filter(u => u.purchase?.pack_type === packFilter);
        }
      }

      // Apply client-side quiz filter
      if (quizFilter !== 'all') {
        if (quizFilter === 'none') {
          mergedUsers = mergedUsers.filter(u => !u.quiz_count || u.quiz_count === 0);
        } else if (quizFilter === 'some') {
          mergedUsers = mergedUsers.filter(u => u.quiz_count && u.quiz_count > 0 && u.quiz_count < 5);
        } else if (quizFilter === 'active') {
          mergedUsers = mergedUsers.filter(u => u.quiz_count && u.quiz_count >= 5);
        }
      }

      setUsers(mergedUsers);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, packFilter, quizFilter, dateFilter, userEmails]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (!emailsLoading) {
      fetchUsers();
    }
  }, [fetchUsers, emailsLoading]);

  const clearFilters = () => {
    setSearch('');
    setPackFilter('all');
    setQuizFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || packFilter !== 'all' || quizFilter !== 'all' || dateFilter !== 'all';
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Email', 'Nom', 'Pseudo', 'Pack', 'Expiration', 'Quiz complétés', 'Date inscription'].join(','),
      ...users.map(u => [
        u.id,
        userEmails[u.id] || '',
        u.full_name || '',
        u.nickname || '',
        u.purchase?.pack_type || 'Aucun',
        u.purchase?.expires_at ? new Date(u.purchase.expires_at).toISOString() : '',
        u.quiz_count || 0,
        new Date(u.created_at).toISOString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('Export CSV téléchargé');
  };

  const handleGrantAccess = async () => {
    if (!grantAccessDialog) return;

    try {
      let expiresAt: string | null = null;
      if (grantPackType === 'ESSENTIEL') {
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      } else if (grantPackType === 'REUSSITE') {
        expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      }

      const { error } = await supabase
        .from('user_purchases')
        .insert({
          user_id: grantAccessDialog.id,
          pack_type: grantPackType,
          amount_paid: Number(grantAmount),
          expires_at: expiresAt,
          has_full_access: true,
        });

      if (error) throw error;

      toast.success(`Accès ${grantPackType} accordé`);
      setGrantAccessDialog(null);
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error granting access:', error);
      toast.error('Erreur lors de l\'attribution de l\'accès');
    }
  };

  const handleEditUser = (user: UserProfile) => {
    setEditUserDialog(user);
    setEditForm({
      full_name: user.full_name || '',
      nickname: user.nickname || '',
      avatar_url: user.avatar_url || '',
    });
  };

  const handleSaveUser = async () => {
    if (!editUserDialog) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name || null,
          nickname: editForm.nickname || null,
          avatar_url: editForm.avatar_url || null,
        })
        .eq('id', editUserDialog.id);

      if (error) throw error;

      toast.success('Profil mis à jour');
      setEditUserDialog(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const getPackBadgeStyles = (packType: string | null) => {
    switch (packType) {
      case 'ESSENTIEL': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'REUSSITE': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'PREMIUM_PLUS': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const handleRefresh = () => {
    refetchEmails();
    fetchUsers();
    fetchStats();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Utilisateurs"
          description="Gestion des comptes utilisateurs"
          onRefresh={handleRefresh}
          onExport={handleExport}
          loading={loading}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total utilisateurs"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            gradient="blue"
          />
          <StatCard
            title="Avec achat"
            value={stats.withPurchase.toLocaleString()}
            icon={CreditCard}
            gradient="green"
          />
          <StatCard
            title="Actifs (≥1 quiz)"
            value={stats.activeQuiz.toLocaleString()}
            icon={FileText}
            gradient="purple"
          />
          <StatCard
            title="Quiz total"
            value={stats.totalQuiz.toLocaleString()}
            icon={Award}
            gradient="amber"
          />
        </div>

        {/* Filters */}
        <AdminCard>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par nom, email, pseudo ou ID..."
                  className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={showFilters ? "default" : "outline"} 
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-primary" />
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                <div className="space-y-2">
                  <Label className="text-slate-400">Pack</Label>
                  <Select value={packFilter} onValueChange={setPackFilter}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white [&>span]:text-white">
                      <SelectValue placeholder="Tous les packs" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-slate-100 focus:bg-slate-700 focus:text-white">Tous les packs</SelectItem>
                      <SelectItem value="none" className="text-slate-100 focus:bg-slate-700 focus:text-white">Sans pack</SelectItem>
                      <SelectItem value="active" className="text-slate-100 focus:bg-slate-700 focus:text-white">Avec pack actif</SelectItem>
                      <SelectItem value="expired" className="text-slate-100 focus:bg-slate-700 focus:text-white">Pack expiré</SelectItem>
                      <SelectItem value="ESSENTIEL" className="text-slate-100 focus:bg-slate-700 focus:text-white">Essentiel</SelectItem>
                      <SelectItem value="REUSSITE" className="text-slate-100 focus:bg-slate-700 focus:text-white">Réussite</SelectItem>
                      <SelectItem value="PREMIUM_PLUS" className="text-slate-100 focus:bg-slate-700 focus:text-white">Premium Plus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400">Activité Quiz</Label>
                  <Select value={quizFilter} onValueChange={setQuizFilter}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white [&>span]:text-white">
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-slate-100 focus:bg-slate-700 focus:text-white">Tous</SelectItem>
                      <SelectItem value="none" className="text-slate-100 focus:bg-slate-700 focus:text-white">Aucun quiz</SelectItem>
                      <SelectItem value="some" className="text-slate-100 focus:bg-slate-700 focus:text-white">1-4 quiz</SelectItem>
                      <SelectItem value="active" className="text-slate-100 focus:bg-slate-700 focus:text-white">5+ quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400">Inscription</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white [&>span]:text-white">
                      <SelectValue placeholder="Toutes" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-slate-100 focus:bg-slate-700 focus:text-white">Toutes</SelectItem>
                      <SelectItem value="7days" className="text-slate-100 focus:bg-slate-700 focus:text-white">7 derniers jours</SelectItem>
                      <SelectItem value="30days" className="text-slate-100 focus:bg-slate-700 focus:text-white">30 derniers jours</SelectItem>
                      <SelectItem value="90days" className="text-slate-100 focus:bg-slate-700 focus:text-white">90 derniers jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </AdminCard>

        {/* Users table */}
        <AdminCard noPadding>
          <div className="p-4 sm:p-6 border-b border-slate-700/50">
            <AdminCardHeader
              title="Liste des utilisateurs"
              description={`${totalCount} utilisateur(s) au total • Page ${currentPage} sur ${totalPages || 1}`}
              icon={
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              }
            />
          </div>
          
          <div className="p-4 sm:p-6">
            {loading || emailsLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary"></div>
              </div>
            ) : (
              <>
                <AdminTable headers={['Utilisateur', 'Pack', 'Quiz', 'Inscription', 'Actions']}>
                  {users.length === 0 ? (
                    <AdminTableEmpty message="Aucun utilisateur trouvé" colSpan={5} />
                  ) : (
                    users.map((user) => {
                      const isActive = user.purchase && (!user.purchase.expires_at || new Date(user.purchase.expires_at) > new Date());
                      return (
                        <AdminTableRow key={user.id}>
                          <AdminTableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                                <span className="text-slate-300 font-medium">
                                  {(user.full_name?.[0] || user.nickname?.[0] || userEmails[user.id]?.[0] || '?').toUpperCase()}
                                </span>
                              </div>
                              <UserIdentity 
                                name={user.full_name || user.nickname}
                                email={userEmails[user.id]}
                              />
                            </div>
                          </AdminTableCell>
                          <AdminTableCell>
                            {user.purchase ? (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getPackBadgeStyles(user.purchase.pack_type)}>
                                  {user.purchase.pack_type || 'PREMIUM_PLUS'}
                                </Badge>
                                {isActive ? (
                                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                ) : (
                                  <span className="w-2 h-2 rounded-full bg-red-500" title="Expiré" />
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-500 text-sm">—</span>
                            )}
                          </AdminTableCell>
                          <AdminTableCell>
                            <span className={cn(
                              "font-medium",
                              user.quiz_count && user.quiz_count >= 5 ? "text-emerald-400" : 
                              user.quiz_count && user.quiz_count > 0 ? "text-slate-300" : "text-slate-500"
                            )}>
                              {user.quiz_count || 0}
                            </span>
                          </AdminTableCell>
                          <AdminTableCell>
                            <span className="text-slate-400 text-sm">
                              {format(new Date(user.created_at), 'd MMM yyyy', { locale: fr })}
                            </span>
                          </AdminTableCell>
                          <AdminTableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                className="text-slate-400 hover:text-white"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setGrantAccessDialog(user)}
                                className="text-slate-400 hover:text-emerald-400"
                              >
                                <UserPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </AdminTableCell>
                        </AdminTableRow>
                      );
                    })
                  )}
                </AdminTable>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
                    <p className="text-sm text-slate-400">
                      Affichage {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} sur {totalCount}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-slate-300 px-3">
                        Page {currentPage} / {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </AdminCard>

        {/* Grant Access Dialog */}
        <Dialog open={!!grantAccessDialog} onOpenChange={() => setGrantAccessDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Attribuer un accès</DialogTitle>
              <DialogDescription className="text-slate-400">
                Attribuer un pack à {grantAccessDialog?.full_name || grantAccessDialog?.nickname || userEmails[grantAccessDialog?.id || ''] || 'cet utilisateur'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Type de pack</Label>
                <Select value={grantPackType} onValueChange={setGrantPackType}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white [&>span]:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="ESSENTIEL" className="text-slate-100 focus:bg-slate-700 focus:text-white">Essentiel (30 jours)</SelectItem>
                    <SelectItem value="REUSSITE" className="text-slate-100 focus:bg-slate-700 focus:text-white">Réussite (90 jours)</SelectItem>
                    <SelectItem value="PREMIUM_PLUS" className="text-slate-100 focus:bg-slate-700 focus:text-white">Premium Plus (Illimité)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Montant payé (€)</Label>
                <Input
                  type="number"
                  value={grantAmount}
                  onChange={(e) => setGrantAmount(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setGrantAccessDialog(null)} className="border-slate-600 text-slate-300">
                Annuler
              </Button>
              <Button onClick={handleGrantAccess}>
                Attribuer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={!!editUserDialog} onOpenChange={() => setEditUserDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Modifier l'utilisateur</DialogTitle>
              <DialogDescription className="text-slate-400">
                Modifier les informations de profil
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nom complet</Label>
                <Input
                  value={editForm.full_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Pseudo</Label>
                <Input
                  value={editForm.nickname}
                  onChange={(e) => setEditForm(prev => ({ ...prev, nickname: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Avatar URL</Label>
                <Input
                  value={editForm.avatar_url}
                  onChange={(e) => setEditForm(prev => ({ ...prev, avatar_url: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditUserDialog(null)} className="border-slate-600 text-slate-300">
                Annuler
              </Button>
              <Button onClick={handleSaveUser} disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
