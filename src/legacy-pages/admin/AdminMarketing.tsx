import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Mail, 
  Users, 
  Send, 
  TestTube, 
  Calendar as CalendarIcon, 
  AlertTriangle,
  Loader2,
  Info,
  History,
  CheckCircle,
  XCircle,
  Filter,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignFilters {
  freeUsersOnly: boolean;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
}

interface Campaign {
  id: string;
  subject: string;
  recipients_count: number;
  sent_count: number;
  failed_count: number;
  is_test: boolean;
  status: string;
  sent_at: string | null;
}

const AdminMarketing = () => {
  // Filters state
  const [filters, setFilters] = useState<CampaignFilters>({
    freeUsersOnly: true,
    dateFrom: undefined,
    dateTo: undefined
  });
  
  // Batch settings
  const [batchLimit, setBatchLimit] = useState(100);
  const [excludeIfEmailedTimes, setExcludeIfEmailedTimes] = useState(1);
  
  // Email content state
  const [subject, setSubject] = useState('Votre Examen Civique');
  const [body, setBody] = useState(`Bonjour {{first_name}},

Beaucoup de candidats commettent l'erreur de réviser des questions obsolètes. Saviez-vous que selon votre objectif, le contenu de l'examen change désormais radicalement ?

Grâce aux retours de nos 20 000 utilisateurs et à l'analyse de plus de 40 000 sessions de quiz, nous avons mis à jour notre moteur d'entraînement pour coller strictement aux 3 nouveaux types d'examens officiels :

🔹 Niveau Fondamental (CSP) - 193 questions : Pour la Carte de Séjour Pluriannuelle (vie quotidienne et bases).

🔸 Niveau Intermédiaire (CR) - 209 questions : Pour la Carte de Résident (histoire, institutions et politique).

🥇 Niveau Approfondi (Naturalisation) - 240 questions : Pour la Nationalité (culture générale, patrimoine et nuances républicaines).

Ne révisez pas à l'aveugle. Notre plateforme utilise un algorithme d'anti-répétition et une analyse de performance par catégorie pour vous garantir une préparation optimale.

🎁 VOTRE OFFRE DE BIENVENUE
Utilisez votre code promo : 2026 pour bénéficier de -50% immédiat sur tous nos packs.

👉 Profitez-en sur : www.qcmcivique.fr

À très vite pour votre réussite,

L'équipe QCM Civique`);
  
  // UI state
  const [totalUsersInDatabase, setTotalUsersInDatabase] = useState<number | null>(null);
  const [targetedCount, setTargetedCount] = useState<number | null>(null);
  const [alreadyContactedCount, setAlreadyContactedCount] = useState<number | null>(null);
  const [afterExclusionCount, setAfterExclusionCount] = useState<number | null>(null);
  const [countLoading, setCountLoading] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Campaign history
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);

  // Calculate how many will actually be sent (based on after exclusion count)
  const selectedForSend = Math.min(afterExclusionCount || 0, batchLimit, 100);

  // Fetch targeted user count with exclusions whenever filters or excludeIfEmailedTimes change
  useEffect(() => {
    const fetchCount = async () => {
      setCountLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('Non authentifié');
        }

        const response = await supabase.functions.invoke('get-marketing-count', {
          body: {
            filters: {
              freeUsersOnly: filters.freeUsersOnly,
              dateFrom: filters.dateFrom?.toISOString(),
              dateTo: filters.dateTo?.toISOString()
            },
            excludeIfEmailedTimes
          }
        });

        if (response.error) throw response.error;
        
        setTotalUsersInDatabase(response.data.totalUsersInDatabase ?? 0);
        setTargetedCount(response.data.totalCandidates ?? 0);
        setAlreadyContactedCount(response.data.alreadyContactedCount ?? 0);
        setAfterExclusionCount(response.data.afterExclusion ?? 0);
      } catch (error) {
        console.error('Error fetching count:', error);
        setTotalUsersInDatabase(null);
        setTargetedCount(null);
        setAlreadyContactedCount(null);
        setAfterExclusionCount(null);
      } finally {
        setCountLoading(false);
      }
    };
    
    fetchCount();
  }, [filters, excludeIfEmailedTimes]);

  // Fetch campaign history
  useEffect(() => {
    const fetchCampaigns = async () => {
      setCampaignsLoading(true);
      try {
        const { data, error } = await supabase
          .from('email_campaigns')
          .select('id, subject, recipients_count, sent_count, failed_count, is_test, status, sent_at')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        setCampaigns(data || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setCampaignsLoading(false);
      }
    };
    
    fetchCampaigns();
  }, []);

  const handleSendTest = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.error('Veuillez remplir l\'objet et le corps du message');
      return;
    }
    
    setSendingTest(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Non authentifié');
      
      const response = await supabase.functions.invoke('send-marketing-email', {
        body: {
          subject,
          body,
          filters: {
            freeUsersOnly: filters.freeUsersOnly,
            dateFrom: filters.dateFrom?.toISOString(),
            dateTo: filters.dateTo?.toISOString()
          },
          isTest: true,
          batchLimit,
          excludeIfEmailedTimes
        }
      });
      
      if (response.error) throw response.error;
      if (!response.data.success) throw new Error(response.data.error);
      
      toast.success(response.data.message || 'Email de test envoyé !');
      
      // Refresh campaigns
      const { data: newCampaigns } = await supabase
        .from('email_campaigns')
        .select('id, subject, recipients_count, sent_count, failed_count, is_test, status, sent_at')
        .order('created_at', { ascending: false })
        .limit(10);
      if (newCampaigns) setCampaigns(newCampaigns);
      
    } catch (error: any) {
      console.error('Error sending test:', error);
      toast.error(error.message || 'Erreur lors de l\'envoi du test');
    } finally {
      setSendingTest(false);
    }
  };

  const handleSendCampaign = async () => {
    setShowConfirmDialog(false);
    setSendingCampaign(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Non authentifié');
      
      const response = await supabase.functions.invoke('send-marketing-email', {
        body: {
          subject,
          body,
          filters: {
            freeUsersOnly: filters.freeUsersOnly,
            dateFrom: filters.dateFrom?.toISOString(),
            dateTo: filters.dateTo?.toISOString()
          },
          isTest: false,
          batchLimit,
          excludeIfEmailedTimes
        }
      });
      
      if (response.error) throw response.error;
      if (!response.data.success) throw new Error(response.data.error);
      
      toast.success(response.data.message || `Campagne envoyée à ${response.data.sent} utilisateurs !`);
      
      // Refresh campaigns
      const { data: newCampaigns } = await supabase
        .from('email_campaigns')
        .select('id, subject, recipients_count, sent_count, failed_count, is_test, status, sent_at')
        .order('created_at', { ascending: false })
        .limit(10);
      if (newCampaigns) setCampaigns(newCampaigns);
      
      // Clear form
      setSubject('');
      setBody('');
      
    } catch (error: any) {
      console.error('Error sending campaign:', error);
      toast.error(error.message || 'Erreur lors de l\'envoi de la campagne');
    } finally {
      setSendingCampaign(false);
    }
  };

  const isFormValid = subject.trim() && body.trim() && afterExclusionCount !== null && afterExclusionCount > 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Email Marketing</h1>
            <p className="text-muted-foreground">Relancez les utilisateurs gratuits pour les convertir</p>
          </div>
        </div>

        {/* Rate Limit Warning */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-200">Limite d'envoi : 100 emails/jour (quota Resend gratuit)</p>
            <p className="text-amber-700 dark:text-amber-300 mt-1">
              Les envois sont limités et "throttlés" (10 emails par seconde) pour respecter les quotas.
            </p>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Ciblage
              </CardTitle>
              <CardDescription>
                Définissez les critères pour sélectionner les destinataires
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Free Users Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="free-users">Utilisateurs sans abonnement actif</Label>
                  <p className="text-sm text-muted-foreground">
                    Cible uniquement les utilisateurs gratuits (Free users)
                  </p>
                </div>
                <Switch
                  id="free-users"
                  checked={filters.freeUsersOnly}
                  onCheckedChange={(checked) => setFilters(f => ({ ...f, freeUsersOnly: checked }))}
                />
              </div>

              <Separator />

              {/* Date Range - Optional */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Plage de dates d'inscription (optionnel)</Label>
                  {(filters.dateFrom || filters.dateTo) && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setFilters(f => ({ ...f, dateFrom: undefined, dateTo: undefined }))}
                      className="text-xs h-7"
                    >
                      Réinitialiser
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Date From */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Du</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filters.dateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateFrom ? format(filters.dateFrom, "dd/MM/yyyy", { locale: fr }) : "Début"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateFrom}
                          onSelect={(date) => setFilters(f => ({ ...f, dateFrom: date }))}
                          initialFocus
                          locale={fr}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Date To */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Au</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filters.dateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateTo ? format(filters.dateTo, "dd/MM/yyyy", { locale: fr }) : "Fin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateTo}
                          onSelect={(date) => setFilters(f => ({ ...f, dateTo: date }))}
                          initialFocus
                          locale={fr}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Batch Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Label>Paramètres d'envoi</Label>
                </div>
                
                {/* Batch Limit */}
                <div className="space-y-2">
                  <Label htmlFor="batch-limit" className="text-sm">
                    Limite d'envoi (Batch)
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="batch-limit"
                      type="number"
                      min={1}
                      max={100}
                      value={batchLimit}
                      onChange={(e) => setBatchLimit(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      (max 100/jour)
                    </span>
                  </div>
                </div>

                {/* Exclude if already emailed */}
                <div className="space-y-2">
                  <Label htmlFor="exclude-emailed" className="text-sm">
                    Exclure si déjà relancé X fois
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="exclude-emailed"
                      type="number"
                      min={0}
                      max={10}
                      value={excludeIfEmailedTimes}
                      onChange={(e) => setExcludeIfEmailedTimes(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      {excludeIfEmailedTimes === 0 ? "(envoie à tous)" : `(exclut si ≥${excludeIfEmailedTimes} email${excludeIfEmailedTimes > 1 ? 's' : ''})`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mettez 0 pour envoyer à tout le monde, même s'ils ont déjà été relancés.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Targeted Count - Complete Statistics Display */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                {/* Total users in database */}
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Total utilisateurs en base
                    </span>
                    <p className="text-xs text-muted-foreground">Tous les comptes créés</p>
                  </div>
                  {countLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {totalUsersInDatabase?.toLocaleString('fr-FR') || '—'}
                    </Badge>
                  )}
                </div>

                {/* Candidates matching filters */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium">Candidats (filtres appliqués)</span>
                    <p className="text-xs text-muted-foreground">
                      {filters.freeUsersOnly ? 'Utilisateurs gratuits uniquement' : 'Tous les utilisateurs'}
                      {(filters.dateFrom || filters.dateTo) && ' + filtre dates'}
                    </p>
                  </div>
                  {countLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {targetedCount?.toLocaleString('fr-FR') || '—'}
                    </Badge>
                  )}
                </div>

                {/* Already contacted */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium text-blue-600">Déjà contactés</span>
                    <p className="text-xs text-muted-foreground">Ont reçu au moins 1 email marketing</p>
                  </div>
                  {countLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <Badge variant="outline" className="text-lg px-3 py-1 border-blue-500 text-blue-600">
                      {alreadyContactedCount?.toLocaleString('fr-FR') || '—'}
                    </Badge>
                  )}
                </div>

                {/* After exclusion */}
                {excludeIfEmailedTimes > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium text-green-600">
                        À contacter (après exclusion)
                      </span>
                      <p className="text-xs text-muted-foreground">
                        N'ont pas reçu ≥{excludeIfEmailedTimes} email{excludeIfEmailedTimes > 1 ? 's' : ''}
                      </p>
                    </div>
                    {countLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    ) : (
                      <Badge variant="outline" className="text-lg px-3 py-1 border-green-500 text-green-600">
                        {afterExclusionCount?.toLocaleString('fr-FR') || '—'}
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Selected for this send */}
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium text-primary">Sélectionnés pour cet envoi</span>
                    <p className="text-xs text-muted-foreground">Limité à {batchLimit} max</p>
                  </div>
                  {countLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <Badge variant="default" className="text-lg px-3 py-1 bg-primary">
                      {selectedForSend.toLocaleString('fr-FR')}
                    </Badge>
                  )}
                </div>

                {/* Summary messages */}
                <div className="pt-2 space-y-1 border-t">
                  {afterExclusionCount !== null && afterExclusionCount > selectedForSend && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      {(afterExclusionCount - selectedForSend).toLocaleString('fr-FR')} utilisateur{afterExclusionCount - selectedForSend > 1 ? 's' : ''} restant{afterExclusionCount - selectedForSend > 1 ? 's' : ''} pour les prochaines campagnes
                    </p>
                  )}

                  {targetedCount !== null && afterExclusionCount !== null && targetedCount > afterExclusionCount && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {(targetedCount - afterExclusionCount).toLocaleString('fr-FR')} exclu{targetedCount - afterExclusionCount > 1 ? 's' : ''} (déjà relancé{targetedCount - afterExclusionCount > 1 ? 's' : ''} ≥{excludeIfEmailedTimes} fois)
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Email Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contenu de l'email
              </CardTitle>
              <CardDescription>
                Rédigez votre message de relance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Objet de l'email</Label>
                <Input
                  id="subject"
                  placeholder="Ex: Préparez votre examen civique avec QCM Civique 🇫🇷"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Body */}
              <div className="space-y-2">
                <Label htmlFor="body">Corps du message</Label>
                <Textarea
                  id="body"
                  placeholder="Bonjour {{first_name}},

Vous avez commencé à préparer votre examen civique sur QCM Civique mais vous n'avez pas encore accès à tous nos quiz...

Profitez de notre offre spéciale pour débloquer l'accès complet !

À bientôt,
L'équipe QCM Civique"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              {/* Personalization Tip */}
              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>
                    Utilisez <code className="bg-background px-1 py-0.5 rounded text-xs">{"{{first_name}}"}</code> pour personnaliser le message avec le prénom de l'utilisateur.
                  </p>
                  <p className="mt-1 text-xs">
                    Les sauts de ligne seront conservés dans l'email.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleSendTest}
                  disabled={!subject.trim() || !body.trim() || sendingTest}
                  className="flex-1"
                >
                  {sendingTest ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <TestTube className="h-4 w-4 mr-2" />
                  )}
                  Envoyer un test à moi-même
                </Button>
                <Button
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={!isFormValid || sendingCampaign}
                  className="flex-1"
                >
                  {sendingCampaign ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Envoyer aux {selectedForSend} prochains utilisateurs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Historique des campagnes
            </CardTitle>
            <CardDescription>
              Les 10 dernières campagnes envoyées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {campaignsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucune campagne envoyée pour le moment
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Objet</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Envoyés</TableHead>
                    <TableHead className="text-center">Échecs</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="whitespace-nowrap">
                        {campaign.sent_at ? format(new Date(campaign.sent_at), "dd/MM/yy HH:mm", { locale: fr }) : '—'}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {campaign.subject}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={campaign.is_test ? "secondary" : "default"}>
                          {campaign.is_test ? 'Test' : 'Campagne'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-green-600 font-medium">{campaign.sent_count}</span>
                        <span className="text-muted-foreground">/{campaign.recipients_count}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {campaign.failed_count > 0 ? (
                          <span className="text-destructive font-medium">{campaign.failed_count}</span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {campaign.status === 'sent' ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Confirmer l'envoi
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  Vous êtes sur le point d'envoyer un email à <strong>{selectedForSend.toLocaleString('fr-FR')}</strong> utilisateur{selectedForSend > 1 ? 's' : ''}.
                </p>
                {targetedCount && targetedCount > selectedForSend && (
                  <p className="text-muted-foreground text-sm">
                    ({targetedCount - selectedForSend} autres utilisateurs seront envoyés lors des prochaines campagnes)
                  </p>
                )}
                <p className="pt-2">
                  Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendCampaign}>
              Envoyer aux {selectedForSend} utilisateurs
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminMarketing;
