import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle, ExternalLink, RefreshCw, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

interface Discrepancy {
  id: string;
  discrepancy_type: 'stripe_only' | 'db_only' | 'mismatch';
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  user_purchase_id: string | null;
  user_id: string | null;
  email: string | null;
  amount_cents: number | null;
  currency: string;
  stripe_created_at: string | null;
  detected_at: string;
  status: 'pending' | 'resolved' | 'ignored';
  metadata: any;
}

export function PaymentDiscrepanciesAlert() {
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState<string | null>(null);
  const [runningCheck, setRunningCheck] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'ignored'>('all');

  const fetchDiscrepancies = async () => {
    try {
      let query = supabase
        .from('payment_discrepancies')
        .select('*')
        .order('detected_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setDiscrepancies((data as Discrepancy[]) || []);
    } catch (error) {
      console.error('Error fetching discrepancies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscrepancies();
  }, [statusFilter]);

  const runAutoReconcile = async () => {
    setRunningCheck(true);
    try {
      const { data, error } = await supabase.functions.invoke('auto-reconcile', {
        body: { days: 7 }
      });

      if (error) throw error;
      
      toast.success(`Vérification terminée: ${data.new_stripe_only_discrepancies + data.new_db_only_discrepancies} nouvelles anomalies détectées`);
      await fetchDiscrepancies();
    } catch (error) {
      console.error('Error running auto-reconcile:', error);
      toast.error('Erreur lors de la vérification');
    } finally {
      setRunningCheck(false);
    }
  };

  const resolveDiscrepancy = async (id: string, action: 'resolve' | 'ignore') => {
    setResolving(id);
    try {
      const { error } = await supabase
        .from('payment_discrepancies')
        .update({
          status: action === 'resolve' ? 'resolved' : 'ignored',
          resolved_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(action === 'resolve' ? 'Anomalie résolue' : 'Anomalie ignorée');
      await fetchDiscrepancies();
    } catch (error) {
      console.error('Error resolving discrepancy:', error);
      toast.error('Erreur lors de la résolution');
    } finally {
      setResolving(null);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'stripe_only': return 'Stripe seulement';
      case 'db_only': return 'DB seulement';
      case 'mismatch': return 'Incohérence';
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'stripe_only': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'db_only': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'mismatch': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'resolved': return 'Résolu';
      case 'ignored': return 'Ignoré';
      default: return status;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'resolved': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      case 'ignored': return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="py-8">
          <div className="animate-pulse flex items-center justify-center gap-2 text-slate-400">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Chargement des alertes...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              discrepancies.length > 0 
                ? 'bg-gradient-to-br from-orange-500 to-red-500' 
                : 'bg-gradient-to-br from-emerald-500 to-green-500'
            }`}>
              {discrepancies.length > 0 ? (
                <AlertTriangle className="h-5 w-5 text-white" />
              ) : (
                <CheckCircle className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                Alertes paiements
                {discrepancies.length > 0 && (
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    {discrepancies.length}
                  </Badge>
                )}
              </CardTitle>
              <p className="text-slate-400 text-sm">
                {discrepancies.length > 0 
                  ? 'Anomalies détectées nécessitant une action'
                  : 'Aucune anomalie détectée'
                }
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={runAutoReconcile}
            disabled={runningCheck}
            className="border-slate-600 hover:bg-slate-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${runningCheck ? 'animate-spin' : ''}`} />
            Vérifier maintenant
          </Button>
          <Select value={statusFilter} onValueChange={(value: 'all' | 'pending' | 'resolved' | 'ignored') => setStatusFilter(value)}>
            <SelectTrigger className="w-[150px] bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="resolved">Résolues</SelectItem>
              <SelectItem value="ignored">Ignorées</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {discrepancies.length > 0 && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {discrepancies.map((discrepancy) => (
              <div 
                key={discrepancy.id}
                className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getTypeBadgeColor(discrepancy.discrepancy_type)}>
                        {getTypeLabel(discrepancy.discrepancy_type)}
                      </Badge>
                      <Badge variant="outline" className={getStatusBadgeColor(discrepancy.status)}>
                        {getStatusLabel(discrepancy.status)}
                      </Badge>
                      {discrepancy.metadata?.pack_type && (
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                          {discrepancy.metadata.pack_type}
                        </Badge>
                      )}
                      {discrepancy.metadata?.user_found === false && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          Utilisateur non trouvé
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm space-y-1">
                      {discrepancy.email && (
                        <p className="text-slate-300">
                          <span className="text-slate-500">Email:</span> {discrepancy.email}
                        </p>
                      )}
                      {discrepancy.amount_cents && (
                        <p className="text-slate-300">
                          <span className="text-slate-500">Montant:</span> {(discrepancy.amount_cents / 100).toFixed(2)}€
                        </p>
                      )}
                      {discrepancy.stripe_payment_intent && (
                        <p className="text-slate-400 text-xs font-mono truncate max-w-[300px]">
                          PI: {discrepancy.stripe_payment_intent}
                        </p>
                      )}
                      <p className="text-slate-500 text-xs">
                        Détecté le {format(new Date(discrepancy.detected_at), 'd MMM yyyy à HH:mm', { locale: fr })}
                      </p>
                      {discrepancy.stripe_created_at && (
                        <p className="text-slate-500 text-xs">
                          Paiement du {format(new Date(discrepancy.stripe_created_at), 'd MMM yyyy à HH:mm', { locale: fr })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {discrepancy.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resolveDiscrepancy(discrepancy.id, 'resolve')}
                          disabled={resolving === discrepancy.id}
                          className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-500/10"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Résolu
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resolveDiscrepancy(discrepancy.id, 'ignore')}
                          disabled={resolving === discrepancy.id}
                          className="border-slate-600 hover:bg-slate-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Ignorer
                        </Button>
                      </>
                    )}
                    {discrepancy.stripe_payment_intent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-slate-400 hover:text-white"
                      >
                        <a 
                          href={`https://dashboard.stripe.com/payments/${discrepancy.stripe_payment_intent}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
