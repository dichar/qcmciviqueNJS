import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Shield, UserPlus, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

export default function AdminSettings() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin');

      if (error) throw error;

      // Get user info from profiles
      const userIds = data?.map(a => a.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const profileMap: Record<string, string> = {};
      profiles?.forEach(p => {
        profileMap[p.id] = p.full_name || 'N/A';
      });

      const enrichedAdmins = data?.map(a => ({
        ...a,
        user_name: profileMap[a.user_id],
      })) || [];

      setAdmins(enrichedAdmins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Erreur lors du chargement des admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) return;

    setAdding(true);
    try {
      // Note: In a real scenario, you'd need to find the user by email
      // This requires access to auth.users which is not directly accessible
      // For now, we'll show an info message
      toast.info(
        'Pour ajouter un admin, exécutez cette requête SQL dans la console Supabase:\n' +
        `INSERT INTO user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email = '${newAdminEmail}';`,
        { duration: 10000 }
      );
      setNewAdminEmail('');
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Erreur lors de l\'ajout de l\'admin');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveAdmin = async (adminId: string, userId: string) => {
    // Prevent removing yourself
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id === userId) {
      toast.error('Vous ne pouvez pas vous retirer vous-même');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      toast.success('Admin supprimé');
      fetchAdmins();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground">Configuration du back-office</p>
        </div>

        {/* Security info */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Sécurité</AlertTitle>
          <AlertDescription>
            Le premier admin doit être ajouté manuellement en base de données.
            Les admins suivants peuvent être ajoutés depuis cette interface.
          </AlertDescription>
        </Alert>

        {/* Admin management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Gestion des administrateurs
            </CardTitle>
            <CardDescription>
              Gérer les utilisateurs ayant accès au back-office
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add admin form */}
            <div className="flex gap-4 items-end">
              <div className="flex-1 max-w-md space-y-2">
                <Label htmlFor="adminEmail">Ajouter un administrateur</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="email@exemple.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleAddAdmin} disabled={adding || !newAdminEmail.trim()}>
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>

            {/* Info about manual SQL */}
            <Alert variant="default" className="bg-muted">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Ajout manuel du premier admin</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>Pour ajouter le premier administrateur, exécutez cette requête SQL :</p>
                <code className="block bg-card p-2 rounded text-xs overflow-x-auto">
                  INSERT INTO public.user_roles (user_id, role)<br />
                  SELECT id, 'admin' FROM auth.users WHERE email = 'VOTRE_EMAIL';
                </code>
              </AlertDescription>
            </Alert>

            {/* Admins list */}
            <div>
              <h3 className="text-lg font-medium mb-4">Administrateurs actuels</h3>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Ajouté le</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          Aucun administrateur configuré
                        </TableCell>
                      </TableRow>
                    ) : (
                      admins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-primary" />
                              <span className="font-medium">{admin.user_name || 'N/A'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {admin.user_id.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            {new Date(admin.created_at).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemoveAdmin(admin.id, admin.user_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">URL du back-office</p>
                <p className="font-mono text-sm">/gestion-qcmcivique-admin</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Webhook Stripe</p>
                <p className="font-mono text-xs truncate">/functions/v1/stripe-webhook</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
