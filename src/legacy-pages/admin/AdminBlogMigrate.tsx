import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText
} from 'lucide-react';

// Static blog posts data to migrate (from src/pages/Blog.tsx)
const STATIC_BLOG_POSTS = [
  { slug: "examen-civique-decret-20251345", title: "Examen Civique 2026 : Réussir le QCM Obligatoire - Décret n° 2025-1345", excerpt: "Tout savoir sur le nouvel examen civique : format, seuil 80%, dispenses et préparation efficace.", date: "2025-12-30", readTime: "15 min", category: "Examen Civique" },
  { slug: "examen-civique-guide-complet-2026", title: "Examen Civique 2026 : Guide Complet du QCM Obligatoire", excerpt: "Guide complet examen civique 2026 : format QCM 40 questions, seuil 80%, décret 2025-1345, titre de séjour pluriannuel, naturalisation.", date: "2025-12-18", readTime: "18 min", category: "Guide Complet" },
  { slug: "entretien-naturalisation-100-questions", title: "Entretien Naturalisation : 100 Questions/Réponses", excerpt: "Les questions les plus posées lors de l'entretien en préfecture avec réponses modèles.", date: "2025-12-18", readTime: "12 min", category: "Entretien" },
  { slug: "niveau-b2-naturalisation-2026", title: "Niveau B2 Naturalisation 2026 : Quel Test Choisir ?", excerpt: "TCF, DELF, TEF : comparatif des tests de langue et stratégie pour valider le B2.", date: "2025-12-18", readTime: "10 min", category: "Langue" },
  { slug: "carte-pluriannuelle-vs-resident", title: "Carte Pluriannuelle vs Carte de Résident : Comparatif", excerpt: "Quelle stratégie choisir pour votre renouvellement en 2026 ?", date: "2025-12-18", readTime: "10 min", category: "Comparatif" },
  { slug: "naturalisation-mariage-vs-decret", title: "Naturalisation : Mariage vs Décret - Quelle Procédure ?", excerpt: "Comparatif détaillé des deux voies vers la nationalité française.", date: "2025-12-18", readTime: "12 min", category: "Procédure" },
  { slug: "motifs-refus-ajournement", title: "Refus et Ajournement : Motifs et Recours", excerpt: "Comprendre les motifs de refus et comment contester efficacement.", date: "2025-12-18", readTime: "11 min", category: "Recours" },
  { slug: "tuto-anef-naturalisation", title: "Tuto ANEF : Déposer votre Dossier en Ligne", excerpt: "Guide pas à pas de la procédure numérique avec solutions aux bugs fréquents.", date: "2025-12-18", readTime: "9 min", category: "Tutoriel" },
  { slug: "resume-livret-citoyen-2026", title: "Résumé Livret du Citoyen : L'Essentiel", excerpt: "Les points clés du livret officiel pour réussir l'examen civique.", date: "2025-12-18", readTime: "10 min", category: "Révision" },
  { slug: "contrat-integration-republicaine", title: "Contrat d'Intégration Républicaine (CIR)", excerpt: "Obligations, formations et impact sur votre titre de séjour.", date: "2025-12-18", readTime: "8 min", category: "Intégration" },
  { slug: "carte-resident-longue-duree-ue", title: "Carte Résident Longue Durée-UE : Mobilité Europe", excerpt: "Le sésame pour travailler dans toute l'Union Européenne.", date: "2025-12-18", readTime: "9 min", category: "Mobilité" },
  { slug: "entretien-naturalisation-100-questions-complet", title: "Entretien Naturalisation : Questions Incontournables 2026", excerpt: "Guide complet avec questions sur le parcours personnel, l'histoire, les valeurs et les institutions.", date: "2025-12-18", readTime: "15 min", category: "Guide Complet" },
  { slug: "comprendre-livret-citoyen-2026", title: "Comprendre le Livret du Citoyen 2025-2026", excerpt: "Les 5 grands thèmes du livret officiel et comment l'étudier efficacement.", date: "2025-12-18", readTime: "12 min", category: "Référentiel" },
  { slug: "naturalisation-vs-carte-resident-vs-pluriannuelle", title: "Naturalisation vs Carte Résident vs Pluriannuelle", excerpt: "Comparatif des trois statuts pour s'installer en France avec leurs droits et conditions.", date: "2025-12-18", readTime: "10 min", category: "Comparatif" },
  { slug: "naturalisation-par-mariage-conditions-2026", title: "Naturalisation par Mariage : Conditions et Pièges", excerpt: "La voie accélérée vers la nationalité : conditions, procédure et erreurs à éviter.", date: "2025-12-18", readTime: "14 min", category: "Procédure" },
  { slug: "examen-civique-40-questions-80-pourcent", title: "Examen Civique : 40 Questions, 80% de Réussite", excerpt: "Structure de l'examen, les 5 thématiques et stratégie de préparation.", date: "2025-12-18", readTime: "12 min", category: "Guide Examen" },
  { slug: "carte-resident-france-droits-2026", title: "Carte de Résident : Durée, Droits, Renouvellement", excerpt: "Le Graal des étrangers : 10 ans de stabilité juridique en France.", date: "2025-12-18", readTime: "11 min", category: "Titre de Séjour" },
  { slug: "carte-sejour-pluriannuelle-conditions-2026", title: "Carte Pluriannuelle : Conditions et Passage à Résident", excerpt: "De la carte 1 an à la pluriannuelle, puis vers la carte de résident.", date: "2025-12-18", readTime: "9 min", category: "Titre de Séjour" },
  { slug: "symboles-france-drapeau-marseillaise", title: "Symboles de la France : Drapeau, Marseillaise, Marianne", excerpt: "Les symboles officiels de la République à connaître pour l'examen.", date: "2025-12-18", readTime: "8 min", category: "Culture" },
  { slug: "droits-devoirs-citoyens-francais", title: "Droits et Devoirs des Citoyens Français", excerpt: "Vote, impôts, éducation, défense : tout ce qu'implique la citoyenneté.", date: "2025-12-18", readTime: "10 min", category: "Citoyenneté" },
  { slug: "parcours-integration-cir-2026", title: "Parcours d'Intégration et CIR : Étapes Clés 2026", excerpt: "Le Contrat d'Intégration Républicaine et son impact sur votre parcours.", date: "2025-12-18", readTime: "10 min", category: "Intégration" },
  { slug: "reussir-examen-civique-2026", title: "Comment Réussir l'Examen Civique 2026", excerpt: "Stratégies éprouvées pour réussir votre test de naturalisation dès la première tentative.", date: "2025-11-18", readTime: "8 min", category: "Guide Pratique" },
  { slug: "10-erreurs-a-eviter", title: "10 Erreurs à Éviter à l'Examen Civique", excerpt: "Évitez les pièges les plus courants qui empêchent les candidats de réussir.", date: "2025-12-15", readTime: "8 min", category: "Conseils" },
  { slug: "valeurs-republique-expliquees", title: "Valeurs de la République Expliquées", excerpt: "Liberté, Égalité, Fraternité, Laïcité : comprendre les principes fondamentaux.", date: "2025-12-14", readTime: "6 min", category: "Apprentissage" },
  { slug: "examen-civique-obligatoire-2026", title: "Examen Civique 2026 : Le Sésame Obligatoire", excerpt: "Tout savoir sur cette réforme immigration à partir du 1er janvier 2026.", date: "2025-12-13", readTime: "7 min", category: "Actualité" },
  { slug: "algeriens-france-examen-civique", title: "Algériens en France : Ce Qui Change", excerpt: "Accord bilatéral et nouvel examen civique : ce qui change pour les titres de séjour.", date: "2025-12-12", readTime: "6 min", category: "Cas Particuliers" },
  { slug: "5-themes-cles-examen-civique", title: "Les 5 Thèmes Clés du Référentiel", excerpt: "Focus sur les 5 thèmes essentiels du référentiel officiel de l'examen civique.", date: "2025-12-11", readTime: "10 min", category: "Référentiel" },
];

interface MigrationStatus {
  slug: string;
  status: 'pending' | 'success' | 'error' | 'skipped';
  message?: string;
}

export default function AdminBlogMigrate() {
  const navigate = useNavigate();
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statuses, setStatuses] = useState<MigrationStatus[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set(STATIC_BLOG_POSTS.map(p => p.slug)));

  const togglePost = (slug: string) => {
    setSelectedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (selectedPosts.size === STATIC_BLOG_POSTS.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(STATIC_BLOG_POSTS.map(p => p.slug)));
    }
  };

  const runMigration = async () => {
    const postsToMigrate = STATIC_BLOG_POSTS.filter(p => selectedPosts.has(p.slug));
    
    if (postsToMigrate.length === 0) {
      toast.error('Sélectionnez au moins un article');
      return;
    }

    setMigrating(true);
    setStatuses([]);
    setProgress(0);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const newStatuses: MigrationStatus[] = [];

    for (let i = 0; i < postsToMigrate.length; i++) {
      const post = postsToMigrate[i];
      
      try {
        // Check if slug already exists
        const { data: existing } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', post.slug)
          .single();

        if (existing) {
          newStatuses.push({ slug: post.slug, status: 'skipped', message: 'Déjà existant' });
        } else {
          // Insert new post
          const { error } = await supabase
            .from('blog_posts')
            .insert({
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: `<p>${post.excerpt}</p>\n\n<p>Contenu à compléter depuis l'éditeur admin.</p>`,
              meta_title: post.title.length > 60 ? post.title.substring(0, 57) + '...' : post.title,
              meta_description: post.excerpt.length > 160 ? post.excerpt.substring(0, 157) + '...' : post.excerpt,
              category: post.category,
              read_time: post.readTime,
              author: 'QCM Civique',
              status: 'published',
              published_at: new Date(post.date).toISOString(),
              created_by: userId,
            });

          if (error) throw error;
          newStatuses.push({ slug: post.slug, status: 'success' });
        }
      } catch (error: any) {
        console.error(`Error migrating ${post.slug}:`, error);
        newStatuses.push({ slug: post.slug, status: 'error', message: error.message });
      }

      setStatuses([...newStatuses]);
      setProgress(((i + 1) / postsToMigrate.length) * 100);
    }

    setMigrating(false);
    
    const successCount = newStatuses.filter(s => s.status === 'success').length;
    const skippedCount = newStatuses.filter(s => s.status === 'skipped').length;
    const errorCount = newStatuses.filter(s => s.status === 'error').length;

    if (errorCount === 0) {
      toast.success(`Migration terminée ! ${successCount} créés, ${skippedCount} ignorés`);
    } else {
      toast.warning(`Migration avec erreurs : ${successCount} créés, ${skippedCount} ignorés, ${errorCount} erreurs`);
    }
  };

  const getStatusIcon = (status: MigrationStatus['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'skipped':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/gestion-qcmcivique-admin/blog')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Migration des articles</h1>
            <p className="text-muted-foreground text-sm">
              Importez les {STATIC_BLOG_POSTS.length} articles statiques vers la base de données
            </p>
          </div>
        </div>

        {/* Progress */}
        {migrating && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Migration en cours...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Articles à migrer</CardTitle>
                <CardDescription>
                  {selectedPosts.size} / {STATIC_BLOG_POSTS.length} sélectionnés
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={toggleAll}>
                  {selectedPosts.size === STATIC_BLOG_POSTS.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                </Button>
                <Button onClick={runMigration} disabled={migrating || selectedPosts.size === 0}>
                  {migrating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Migration...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Lancer la migration
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {STATIC_BLOG_POSTS.map((post) => {
                const status = statuses.find(s => s.slug === post.slug);
                return (
                  <div
                    key={post.slug}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      selectedPosts.has(post.slug) ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                    }`}
                  >
                    <Checkbox
                      checked={selectedPosts.has(post.slug)}
                      onCheckedChange={() => togglePost(post.slug)}
                      disabled={migrating}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                    </div>
                    <Badge variant="outline" className="hidden sm:flex">{post.category}</Badge>
                    {status && (
                      <div className="flex items-center gap-1">
                        {getStatusIcon(status.status)}
                        {status.message && (
                          <span className="text-xs text-muted-foreground">{status.message}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {statuses.length > 0 && !migrating && (
          <Card>
            <CardHeader>
              <CardTitle>Résultat de la migration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {statuses.filter(s => s.status === 'success').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Créés</p>
                </div>
                <div className="p-4 bg-yellow-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {statuses.filter(s => s.status === 'skipped').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ignorés (existants)</p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {statuses.filter(s => s.status === 'error').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Erreurs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
