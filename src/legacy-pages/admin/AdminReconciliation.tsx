import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Play, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ReconciliationResult {
  summary: {
    stripe_sessions_checked: number;
    already_recorded: number;
    missing_with_user: number;
    missing_no_user: number;
    reconciled: number;
  };
  dry_run: boolean;
  missing_payments: Array<{
    session_id: string;
    payment_intent: string;
    email: string | null;
    amount: number;
    currency: string;
    created: string;
    user_found: boolean;
    user_id: string | null;
  }>;
  unmatched_payments: Array<{
    session_id: string;
    payment_intent: string;
    email: string | null;
    amount: number;
    currency: string;
    created: string;
    user_found: boolean;
    user_id: string | null;
  }>;
  reconciled_payments: Array<{
    session_id: string;
    payment_intent: string;
    email: string | null;
    amount: number;
    currency: string;
    created: string;
    user_found: boolean;
    user_id: string | null;
    pack_type: string;
    expires_at: string | null;
  }>;
}

export default function AdminReconciliation() {
  const [days, setDays] = useState('30');
  const [dryRun, setDryRun] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReconciliationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runReconciliation = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('reconcile-payments', {
        body: {
          days: parseInt(days),
          dryRun: dryRun,
        },
      });

      if (fnError) throw fnError;

      setResult(data);
      
      if (data.dry_run) {
        toast.info(`Dry run terminé: ${data.summary?.missing_with_user || 0} paiement(s) à réconcilier, ${data.summary?.missing_no_user || 0} non matchés`);
      } else {
        toast.success(`Réconciliation terminée: ${data.summary?.reconciled || 0} paiement(s) réconciliés`);
      }
    } catch (err: any) {
      console.error('Reconciliation error:', err);
      setError(err.message || 'Erreur lors de la réconciliation');
      toast.error('Erreur lors de la réconciliation');
    } finally {
      setLoading(false);
    }
  };

  // Safe accessors with fallbacks
  const summary = result?.summary || {
    stripe_sessions_checked: 0,
    already_recorded: 0,
    missing_with_user: 0,
    missing_no_user: 0,
    reconciled: 0,
  };
  const isDryRun = result?.dry_run ?? true;
  const missingPayments = result?.missing_payments || [];
  const unmatchedPayments = result?.unmatched_payments || [];
  const reconciledPayments = result?.reconciled_payments || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Réconciliation Stripe</h1>
          <p className="text-muted-foreground">
            Comparer les paiements Stripe avec la base de données et corriger les écarts
          </p>
        </div>

        {/* Info alert */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            La réconciliation compare les sessions Stripe avec les paiements enregistrés.
            Les paiements "non matchés" peuvent être dus à des emails différents entre Stripe et le compte utilisateur,
            ou à des utilisateurs non encore inscrits.
          </AlertDescription>
        </Alert>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Paramètres de la réconciliation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="days">Période (jours)</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  max="365"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Analyser les paiements des X derniers jours
                </p>
              </div>

              <div className="space-y-2">
                <Label>Mode</Label>
                <div className="flex gap-2">
                  <Button
                    variant={dryRun ? 'default' : 'outline'}
                    onClick={() => setDryRun(true)}
                    className="flex-1"
                  >
                    Dry Run (test)
                  </Button>
                  <Button
                    variant={!dryRun ? 'default' : 'outline'}
                    onClick={() => setDryRun(false)}
                    className="flex-1"
                  >
                    Exécuter
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {dryRun 
                    ? 'Mode test : aucune modification en base'
                    : 'Mode réel : les paiements seront créés'
                  }
                </p>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={runReconciliation} 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {loading ? 'En cours...' : 'Lancer la réconciliation'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{summary.stripe_sessions_checked}</div>
                  <p className="text-xs text-muted-foreground">Sessions Stripe vérifiées</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">{summary.already_recorded}</div>
                  <p className="text-xs text-muted-foreground">Paiements déjà enregistrés</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-orange-600">{summary.missing_with_user + summary.missing_no_user}</div>
                  <p className="text-xs text-muted-foreground">Paiements non enregistrés</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">{summary.reconciled}</div>
                  <p className="text-xs text-muted-foreground">
                    {isDryRun ? 'À réconcilier' : 'Réconciliés'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Reconciled payments (with matching user) */}
            {(reconciledPayments.length > 0 || missingPayments.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Paiements {isDryRun ? 'à réconcilier' : 'réconciliés'} ({isDryRun ? missingPayments.length : reconciledPayments.length})
                  </CardTitle>
                  <CardDescription>
                    {isDryRun 
                      ? 'Ces paiements peuvent être associés à un utilisateur existant'
                      : 'Ces paiements ont été ajoutés à la base'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Pack</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(isDryRun ? missingPayments : reconciledPayments).map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item.email || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge>{(item as any).pack_type || 'PREMIUM_PLUS'}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.amount.toFixed(2)}€
                          </TableCell>
                          <TableCell>
                            {new Date(item.created).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Unmatched payments (no user found) */}
            {unmatchedPayments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Paiements sans utilisateur ({unmatchedPayments.length})
                  </CardTitle>
                  <CardDescription>
                    Ces paiements Stripe n'ont pas pu être associés car l'email n'existe pas dans la base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email Stripe</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unmatchedPayments.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item.email || 'N/A'}</TableCell>
                          <TableCell className="font-medium">
                            {item.amount.toFixed(2)}€
                          </TableCell>
                          <TableCell>
                            {new Date(item.created).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Utilisateur non trouvé</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
