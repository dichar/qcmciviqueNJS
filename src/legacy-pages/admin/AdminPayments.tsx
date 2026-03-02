import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard, AdminCardHeader } from "@/components/admin/AdminCard";
import { AdminTable, AdminTableRow, AdminTableCell, AdminTableEmpty } from "@/components/admin/AdminTable";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { StatCard } from "@/components/admin/StatCard";
import { UserIdentity } from "@/components/admin/UserIdentity";
import { useAdminUserEmails } from "@/hooks/useAdminUserEmails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, Edit, Eye, CreditCard, TrendingUp, Zap, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";


interface Payment {
  id: string;
  user_id: string;
  amount_paid: number;
  currency: string;
  pack_type: string | null;
  purchased_at: string;
  expires_at: string | null;
  has_full_access: boolean;
}

interface PaymentFilters {
  search: string;
  packType: string;
  dateFrom: string;
  dateTo: string;
  minAmount: string;
  maxAmount: string;
  status: string;
}

const ITEMS_PER_PAGE = 20;

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PaymentFilters>({
    search: "",
    packType: "all",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
    status: "all",
  });
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const { userEmails } = useAdminUserEmails();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [addPaymentDialog, setAddPaymentDialog] = useState(false);
  const [editPaymentDialog, setEditPaymentDialog] = useState<Payment | null>(null);
  const [viewPaymentDialog, setViewPaymentDialog] = useState<Payment | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    user_id: "",
    pack_type: "PREMIUM_PLUS",
    amount_paid: "",
    currency: "eur",
  });
  const [saving, setSaving] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_purchases")
        .select("*")
        .order("purchased_at", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
      setFilteredPayments(data || []);

      const userIds = [...new Set(data?.map((p) => p.user_id) || [])];
      if (userIds.length > 0) {
        const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", userIds);

        const nameMap: Record<string, string> = {};
        profiles?.forEach((p) => {
          nameMap[p.id] = p.full_name || "";
        });
        setUserNames(nameMap);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Erreur lors du chargement des paiements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    let result = [...payments];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.user_id.toLowerCase().includes(searchLower) ||
          (userNames[p.user_id] || "").toLowerCase().includes(searchLower) ||
          (userEmails[p.user_id] || "").toLowerCase().includes(searchLower) ||
          (p.pack_type || "").toLowerCase().includes(searchLower),
      );
    }

    if (filters.packType !== "all") {
      result = result.filter((p) => p.pack_type === filters.packType);
    }

    if (filters.dateFrom) {
      result = result.filter((p) => new Date(p.purchased_at) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter((p) => new Date(p.purchased_at) <= new Date(filters.dateTo));
    }

    if (filters.minAmount) {
      result = result.filter((p) => Number(p.amount_paid) >= Number(filters.minAmount));
    }
    if (filters.maxAmount) {
      result = result.filter((p) => Number(p.amount_paid) <= Number(filters.maxAmount));
    }

    if (filters.status === "active") {
      result = result.filter((p) => !p.expires_at || new Date(p.expires_at) > new Date());
    } else if (filters.status === "expired") {
      result = result.filter((p) => p.expires_at && new Date(p.expires_at) <= new Date());
    }

    setFilteredPayments(result);
    setCurrentPage(1);
  }, [filters, payments, userNames, userEmails]);

  const paginatedPayments = filteredPayments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

  const handleExport = () => {
    const csvContent = [
      ["ID", "User ID", "Email", "Nom", "Montant", "Pack", "Date achat", "Expiration", "Statut"].join(","),
      ...filteredPayments.map((p) =>
        [
          p.id,
          p.user_id,
          userEmails[p.user_id] || "",
          userNames[p.user_id] || "",
          p.amount_paid,
          p.pack_type || "",
          new Date(p.purchased_at).toISOString(),
          p.expires_at ? new Date(p.expires_at).toISOString() : "Lifetime",
          !p.expires_at || new Date(p.expires_at) > new Date() ? "Actif" : "Expiré",
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `paiements_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("Export CSV téléchargé");
  };

  const handleAddPayment = async () => {
    if (!paymentForm.user_id.trim()) {
      toast.error("Veuillez entrer un ID utilisateur");
      return;
    }

    setSaving(true);
    try {
      let expiresAt: string | null = null;
      if (paymentForm.pack_type === "ESSENTIEL") {
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      } else if (paymentForm.pack_type === "REUSSITE") {
        expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      }

      const { error } = await supabase.from("user_purchases").insert({
        user_id: paymentForm.user_id.trim(),
        pack_type: paymentForm.pack_type,
        amount_paid: Number(paymentForm.amount_paid) || 0,
        currency: paymentForm.currency,
        expires_at: expiresAt,
        has_full_access: true,
      });

      if (error) throw error;

      toast.success("Paiement ajouté avec succès");
      setAddPaymentDialog(false);
      setPaymentForm({ user_id: "", pack_type: "PREMIUM_PLUS", amount_paid: "", currency: "eur" });
      fetchPayments();
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error("Erreur lors de l'ajout du paiement");
    } finally {
      setSaving(false);
    }
  };

  const handleEditPayment = async () => {
    if (!editPaymentDialog) return;

    setSaving(true);
    try {
      let expiresAt: string | null = editPaymentDialog.expires_at;
      if (paymentForm.pack_type === "ESSENTIEL") {
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      } else if (paymentForm.pack_type === "REUSSITE") {
        expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      } else if (paymentForm.pack_type === "PREMIUM_PLUS") {
        expiresAt = null;
      }

      const { error } = await supabase
        .from("user_purchases")
        .update({
          pack_type: paymentForm.pack_type,
          amount_paid: Number(paymentForm.amount_paid) || 0,
          expires_at: expiresAt,
        })
        .eq("id", editPaymentDialog.id);

      if (error) throw error;

      toast.success("Paiement mis à jour");
      setEditPaymentDialog(null);
      fetchPayments();
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const openEditDialog = (payment: Payment) => {
    setEditPaymentDialog(payment);
    setPaymentForm({
      user_id: payment.user_id,
      pack_type: payment.pack_type || "PREMIUM_PLUS",
      amount_paid: String(payment.amount_paid),
      currency: payment.currency,
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      packType: "all",
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
      status: "all",
    });
  };

  const hasActiveFilters = filters.search || filters.packType !== "all" || filters.dateFrom || filters.dateTo || filters.minAmount || filters.maxAmount || filters.status !== "all";

  const totalRevenue = filteredPayments.reduce((sum, p) => sum + Number(p.amount_paid), 0);

  const getPackBadgeStyles = (packType: string | null) => {
    switch (packType) {
      case "ESSENTIEL":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "REUSSITE":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "PREMIUM_PLUS":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Paiements"
          description="Gestion et suivi des transactions"
          onRefresh={fetchPayments}
          onExport={handleExport}
          onAdd={() => setAddPaymentDialog(true)}
          addLabel="Ajouter paiement"
          loading={loading}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Paiements"
            value={filteredPayments.length.toLocaleString()}
            description="Transactions filtrées"
            icon={CreditCard}
            gradient="blue"
          />
          <StatCard
            title="Revenus"
            value={`${totalRevenue.toFixed(2)}€`}
            description="Total filtré"
            icon={TrendingUp}
            gradient="green"
          />
          <StatCard
            title="Actifs"
            value={filteredPayments.filter((p) => !p.expires_at || new Date(p.expires_at) > new Date()).length.toLocaleString()}
            description="Abonnements valides"
            icon={Zap}
            gradient="amber"
          />
          <StatCard
            title="Panier moyen"
            value={`${(totalRevenue / (filteredPayments.length || 1)).toFixed(2)}€`}
            description="Montant moyen"
            icon={ShoppingCart}
            gradient="purple"
          />
        </div>

        {/* Filters */}
        <AdminCard>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par nom, email, ID..."
                  className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                  value={filters.search}
                  onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
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
                  {hasActiveFilters && <span className="ml-2 w-2 h-2 rounded-full bg-primary" />}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
                <div className="space-y-2">
                  <Label className="text-slate-400">Type de pack</Label>
                  <Select value={filters.packType} onValueChange={(v) => setFilters((f) => ({ ...f, packType: v }))}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="ESSENTIEL">Essentiel</SelectItem>
                      <SelectItem value="REUSSITE">Réussite</SelectItem>
                      <SelectItem value="PREMIUM_PLUS">Premium Plus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Statut</Label>
                  <Select value={filters.status} onValueChange={(v) => setFilters((f) => ({ ...f, status: v }))}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="expired">Expiré</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Date début</Label>
                  <Input
                    type="date"
                    className="bg-slate-900/50 border-slate-600 text-white"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-400">Date fin</Label>
                  <Input
                    type="date"
                    className="bg-slate-900/50 border-slate-600 text-white"
                    value={filters.dateTo}
                    onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
                  />
                </div>
              </div>
            )}
          </div>
        </AdminCard>

        {/* Payments table */}
        <AdminCard noPadding>
          <div className="p-4 sm:p-6 border-b border-slate-700/50">
            <AdminCardHeader
              title="Liste des paiements"
              description={`${filteredPayments.length} paiement(s) trouvé(s) sur ${payments.length} total`}
              icon={
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
              }
            />
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary"></div>
              </div>
            ) : (
              <>
                <AdminTable headers={["Date", "Utilisateur", "Pack", "Montant", "Expiration", "Statut", "Actions"]}>
                  {paginatedPayments.length === 0 ? (
                    <AdminTableEmpty message="Aucun paiement trouvé" colSpan={7} />
                  ) : (
                    paginatedPayments.map((payment) => {
                      const isActive = !payment.expires_at || new Date(payment.expires_at) > new Date();
                      return (
                        <AdminTableRow key={payment.id}>
                          <AdminTableCell>
                            <span className="text-slate-400 text-sm">
                              {format(new Date(payment.purchased_at), "d MMM yyyy", { locale: fr })}
                            </span>
                          </AdminTableCell>
                          <AdminTableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                                <span className="text-slate-300 font-medium">
                                  {(userNames[payment.user_id] || userEmails[payment.user_id] || "U").charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <UserIdentity
                                name={userNames[payment.user_id]}
                                email={userEmails[payment.user_id]}
                                size="sm"
                              />
                            </div>
                          </AdminTableCell>
                          <AdminTableCell>
                            <Badge variant="outline" className={getPackBadgeStyles(payment.pack_type)}>
                              {payment.pack_type || "Premium"}
                            </Badge>
                          </AdminTableCell>
                          <AdminTableCell>
                            <span className="font-medium text-emerald-400">
                              {Number(payment.amount_paid).toFixed(2)}€
                            </span>
                          </AdminTableCell>
                          <AdminTableCell>
                            <span className="text-slate-400 text-sm">
                              {payment.expires_at
                                ? format(new Date(payment.expires_at), "d MMM yyyy", { locale: fr })
                                : "Lifetime"}
                            </span>
                          </AdminTableCell>
                          <AdminTableCell>
                            <div className="flex items-center gap-2">
                              <span className={cn("w-2 h-2 rounded-full", isActive ? "bg-emerald-500" : "bg-red-500")} />
                              <span className={cn("text-sm", isActive ? "text-emerald-400" : "text-red-400")}>
                                {isActive ? "Actif" : "Expiré"}
                              </span>
                            </div>
                          </AdminTableCell>
                          <AdminTableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewPaymentDialog(payment)}
                                className="text-slate-400 hover:text-white hover:bg-slate-700"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(payment)}
                                className="text-slate-400 hover:text-white hover:bg-slate-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </AdminTableCell>
                        </AdminTableRow>
                      );
                    })
                  )}
                </AdminTable>

                <AdminPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredPayments.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                  itemName="paiements"
                />
              </>
            )}
          </div>
        </AdminCard>
      </div>

      {/* Add Payment Dialog */}
      <Dialog open={addPaymentDialog} onOpenChange={setAddPaymentDialog}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Ajouter un paiement manuel</DialogTitle>
            <DialogDescription className="text-slate-400">
              Créer un paiement pour un utilisateur (paiement raté, offert, etc.)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">ID Utilisateur *</Label>
              <Input
                placeholder="UUID de l'utilisateur"
                className="bg-slate-900/50 border-slate-600 text-white"
                value={paymentForm.user_id}
                onChange={(e) => setPaymentForm((f) => ({ ...f, user_id: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Type de pack</Label>
              <Select
                value={paymentForm.pack_type}
                onValueChange={(v) => setPaymentForm((f) => ({ ...f, pack_type: v }))}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="ESSENTIEL">Essentiel (1 mois)</SelectItem>
                  <SelectItem value="REUSSITE">Réussite (3 mois)</SelectItem>
                  <SelectItem value="PREMIUM_PLUS">Premium Plus (Lifetime)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Montant (€)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-slate-900/50 border-slate-600 text-white"
                value={paymentForm.amount_paid}
                onChange={(e) => setPaymentForm((f) => ({ ...f, amount_paid: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddPaymentDialog(false)} className="border-slate-600 text-slate-300">
              Annuler
            </Button>
            <Button onClick={handleAddPayment} disabled={saving}>
              {saving ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={!!editPaymentDialog} onOpenChange={() => setEditPaymentDialog(null)}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Modifier le paiement</DialogTitle>
            <DialogDescription className="text-slate-400">
              Modifier les détails du paiement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Type de pack</Label>
              <Select
                value={paymentForm.pack_type}
                onValueChange={(v) => setPaymentForm((f) => ({ ...f, pack_type: v }))}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="ESSENTIEL">Essentiel (1 mois)</SelectItem>
                  <SelectItem value="REUSSITE">Réussite (3 mois)</SelectItem>
                  <SelectItem value="PREMIUM_PLUS">Premium Plus (Lifetime)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Montant (€)</Label>
              <Input
                type="number"
                step="0.01"
                className="bg-slate-900/50 border-slate-600 text-white"
                value={paymentForm.amount_paid}
                onChange={(e) => setPaymentForm((f) => ({ ...f, amount_paid: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPaymentDialog(null)} className="border-slate-600 text-slate-300">
              Annuler
            </Button>
            <Button onClick={handleEditPayment} disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Payment Dialog */}
      <Dialog open={!!viewPaymentDialog} onOpenChange={() => setViewPaymentDialog(null)}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Détails du paiement</DialogTitle>
          </DialogHeader>

          {viewPaymentDialog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400 text-xs">Utilisateur</Label>
                  <UserIdentity
                    name={userNames[viewPaymentDialog.user_id]}
                    email={userEmails[viewPaymentDialog.user_id]}
                  />
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Pack</Label>
                  <p className="text-white font-medium">{viewPaymentDialog.pack_type || "Premium"}</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Montant</Label>
                  <p className="text-emerald-400 font-medium">{Number(viewPaymentDialog.amount_paid).toFixed(2)}€</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Date d'achat</Label>
                  <p className="text-white">{format(new Date(viewPaymentDialog.purchased_at), "d MMMM yyyy à HH:mm", { locale: fr })}</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Expiration</Label>
                  <p className="text-white">
                    {viewPaymentDialog.expires_at
                      ? format(new Date(viewPaymentDialog.expires_at), "d MMMM yyyy", { locale: fr })
                      : "Lifetime (jamais)"}
                  </p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">ID Paiement</Label>
                  <p className="text-slate-400 text-xs font-mono truncate">{viewPaymentDialog.id}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewPaymentDialog(null)} className="border-slate-600 text-slate-300">
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
