import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowRight, BookOpen, Search, Filter } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ShareButtons } from "@/components/ShareButtons";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string | null;
  read_time: string;
  category: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  author: string;
}

// Static blog posts for fallback (existing URLs preserved)
const STATIC_BLOG_POSTS = [
  {
    slug: "examen-civique-decret-20251345",
    title: "Examen Civique 2026 : Réussir le QCM Obligatoire - Décret n° 2025-1345",
    excerpt: "Tout savoir sur le nouvel examen civique : format, seuil 80%, dispenses et préparation efficace.",
    date: "30 décembre 2025",
    readTime: "15 min",
    category: "Examen Civique",
  },
  {
    slug: "examen-civique-guide-complet-2026",
    title: "Examen Civique 2026 : Guide Complet du QCM Obligatoire",
    excerpt:
      "Guide complet examen civique 2026 : format QCM 40 questions, seuil 80%, décret 2025-1345, titre de séjour pluriannuel, naturalisation.",
    date: "18 décembre 2025",
    readTime: "18 min",
    category: "Guide Complet",
  },
  {
    slug: "entretien-naturalisation-100-questions",
    title: "Entretien Naturalisation : 100 Questions/Réponses",
    excerpt: "Les questions les plus posées lors de l'entretien en préfecture avec réponses modèles.",
    date: "18 décembre 2025",
    readTime: "12 min",
    category: "Entretien",
  },
  {
    slug: "niveau-b2-naturalisation-2026",
    title: "Niveau B2 Naturalisation 2026 : Quel Test Choisir ?",
    excerpt: "TCF, DELF, TEF : comparatif des tests de langue et stratégie pour valider le B2.",
    date: "18 décembre 2025",
    readTime: "10 min",
    category: "Langue",
  },
  {
    slug: "carte-pluriannuelle-vs-resident",
    title: "Carte Pluriannuelle vs Carte de Résident : Comparatif",
    excerpt: "Quelle stratégie choisir pour votre renouvellement en 2026 ?",
    date: "18 décembre 2025",
    readTime: "10 min",
    category: "Stratégie",
  },
  {
    slug: "naturalisation-mariage-vs-decret",
    title: "Naturalisation : Mariage vs Décret - Quelle Procédure ?",
    excerpt: "Comparatif détaillé des deux voies vers la nationalité française.",
    date: "18 décembre 2025",
    readTime: "12 min",
    category: "Procédure",
  },
  {
    slug: "motifs-refus-ajournement",
    title: "Refus et Ajournement : Motifs et Recours",
    excerpt: "Comprendre les motifs de refus et comment contester efficacement.",
    date: "18 décembre 2025",
    readTime: "11 min",
    category: "Recours",
  },
  {
    slug: "tuto-anef-naturalisation",
    title: "Tuto ANEF : Déposer votre Dossier en Ligne",
    excerpt: "Guide pas à pas de la procédure numérique avec solutions aux bugs fréquents.",
    date: "18 décembre 2025",
    readTime: "9 min",
    category: "Tutoriel",
  },
  {
    slug: "resume-livret-citoyen-2026",
    title: "Résumé Livret du Citoyen : L'Essentiel",
    excerpt: "Les points clés du livret officiel pour réussir l'examen civique.",
    date: "18 décembre 2025",
    readTime: "10 min",
    category: "Révision",
  },
  {
    slug: "contrat-integration-republicaine",
    title: "Contrat d'Intégration Républicaine (CIR)",
    excerpt: "Obligations, formations et impact sur votre titre de séjour.",
    date: "18 décembre 2025",
    readTime: "8 min",
    category: "Intégration",
  },
  {
    slug: "carte-resident-longue-duree-ue",
    title: "Carte Résident Longue Durée-UE : Mobilité Europe",
    excerpt: "Le sésame pour travailler dans toute l'Union Européenne.",
    date: "18 décembre 2025",
    readTime: "9 min",
    category: "Mobilité",
  },
  {
    slug: "entretien-naturalisation-100-questions-complet",
    title: "Entretien Naturalisation : Questions Incontournables 2026",
    excerpt: "Guide complet avec questions sur le parcours personnel, l'histoire, les valeurs et les institutions.",
    date: "18 décembre 2025",
    readTime: "15 min",
    category: "Guide Complet",
  },
  {
    slug: "comprendre-livret-citoyen-2026",
    title: "Comprendre le Livret du Citoyen 2025-2026",
    excerpt: "Les 5 grands thèmes du livret officiel et comment l'étudier efficacement.",
    date: "18 décembre 2025",
    readTime: "12 min",
    category: "Référentiel",
  },
  {
    slug: "naturalisation-vs-carte-resident-vs-pluriannuelle",
    title: "Naturalisation vs Carte Résident vs Pluriannuelle",
    excerpt: "Comparatif des trois statuts pour s'installer en France avec leurs droits et conditions.",
    date: "18 décembre 2025",
    readTime: "10 min",
    category: "Comparatif",
  },
  {
    slug: "naturalisation-par-mariage-conditions-2026",
    title: "Naturalisation par Mariage : Conditions et Pièges",
    excerpt: "La voie accélérée vers la nationalité : conditions, procédure et erreurs à éviter.",
    date: "18 décembre 2025",
    readTime: "14 min",
    category: "Procédure",
  },
  {
    slug: "examen-civique-40-questions-80-pourcent",
    title: "Examen Civique : 40 Questions, 80% de Réussite",
    excerpt: "Structure de l'examen, les 5 thématiques et stratégie de préparation.",
    date: "18 décembre 2025",
    readTime: "12 min",
    category: "Guide Examen",
  },
  {
    slug: "carte-resident-france-droits-2026",
    title: "Carte de Résident : Durée, Droits, Renouvellement",
    excerpt: "Le Graal des étrangers : 10 ans de stabilité juridique en France.",
    date: "18 décembre 2025",
    readTime: "11 min",
    category: "Titre de Séjour",
  },
  {
    slug: "carte-sejour-pluriannuelle-conditions-2026",
    title: "Carte Pluriannuelle : Conditions et Passage à Résident",
    excerpt: "De la carte 1 an à la pluriannuelle, puis vers la carte de résident.",
    date: "18 décembre 2025",
    readTime: "9 min",
    category: "Titre de Séjour",
  },
  {
    slug: "symboles-france-drapeau-marseillaise",
    title: "Symboles de la France : Drapeau, Marseillaise, Marianne",
    excerpt: "Les symboles officiels de la République à connaître pour l'examen.",
    date: "18 décembre 2025",
    readTime: "8 min",
    category: "Culture",
  },
  {
    slug: "droits-devoirs-citoyens-francais",
    title: "Droits et Devoirs des Citoyens Français",
    excerpt: "Vote, impôts, éducation, défense : tout ce qu'implique la citoyenneté.",
    date: "18 décembre 2025",
    readTime: "10 min",
    category: "Citoyenneté",
  },
  {
    slug: "parcours-integration-cir-2026",
    title: "Parcours d'Intégration et CIR : Étapes Clés 2026",
    excerpt: "Le Contrat d'Intégration Républicaine et son impact sur votre parcours.",
    date: "18 décembre 2025",
    readTime: "10 min",
    category: "Intégration",
  },
  {
    slug: "reussir-examen-civique-2026",
    title: "Comment Réussir l'Examen Civique 2026",
    excerpt: "Stratégies éprouvées pour réussir votre test de naturalisation dès la première tentative.",
    date: "18 novembre 2025",
    readTime: "8 min",
    category: "Guide Pratique",
  },
  {
    slug: "10-erreurs-a-eviter",
    title: "10 Erreurs à Éviter à l'Examen Civique",
    excerpt: "Évitez les pièges les plus courants qui empêchent les candidats de réussir.",
    date: "15 décembre 2025",
    readTime: "8 min",
    category: "Conseils",
  },
  {
    slug: "valeurs-republique-expliquees",
    title: "Valeurs de la République Expliquées",
    excerpt: "Liberté, Égalité, Fraternité, Laïcité : comprendre les principes fondamentaux.",
    date: "14 décembre 2025",
    readTime: "6 min",
    category: "Apprentissage",
  },
  {
    slug: "examen-civique-obligatoire-2026",
    title: "Examen Civique 2026 : Le Sésame Obligatoire",
    excerpt: "Tout savoir sur cette réforme immigration à partir du 1er janvier 2026.",
    date: "13 décembre 2025",
    readTime: "7 min",
    category: "Actualité",
  },
  {
    slug: "algeriens-france-examen-civique",
    title: "Algériens en France : Ce Qui Change",
    excerpt: "Accord bilatéral et nouvel examen civique : ce qui change pour les titres de séjour.",
    date: "12 décembre 2025",
    readTime: "6 min",
    category: "Cas Particuliers",
  },
  {
    slug: "5-themes-cles-examen-civique",
    title: "Les 5 Thèmes Clés du Référentiel",
    excerpt: "Focus sur les 5 thèmes essentiels du référentiel officiel de l'examen civique.",
    date: "11 décembre 2025",
    readTime: "10 min",
    category: "Référentiel",
  },
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        const staticAsPosts = STATIC_BLOG_POSTS.map((p, i) => ({
          id: `static-${i}`,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          published_at: p.date,
          read_time: p.readTime,
          category: p.category,
          featured_image: null,
          featured_image_alt: null,
          author: "L'équipe QCM Civique",
        }));
        setPosts(staticAsPosts);
        const uniqueCategories = [
          ...new Set(
            staticAsPosts.map((p) => p.category).filter((v): v is string => Boolean(v)),
          ),
        ] as string[];
        setCategories(uniqueCategories);
        return;
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, slug, title, excerpt, published_at, read_time, category, featured_image, featured_image_alt, author",
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setPosts(data);
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(
            data.map((p) => p.category).filter((v): v is string => Boolean(v)),
          ),
        ] as string[];
        setCategories(uniqueCategories);
      } else {
        // Fallback to static posts if no DB posts
        const staticAsPosts = STATIC_BLOG_POSTS.map((p, i) => ({
          id: `static-${i}`,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          published_at: p.date,
          read_time: p.readTime,
          category: p.category,
          featured_image: null,
          featured_image_alt: null,
          author: "L'équipe QCM Civique",
        }));
        setPosts(staticAsPosts);
      const uniqueCategories = [
        ...new Set(
          staticAsPosts.map((p) => p.category).filter((v): v is string => Boolean(v)),
        ),
      ] as string[];
      setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      // Fallback to static posts
      const staticAsPosts = STATIC_BLOG_POSTS.map((p, i) => ({
        id: `static-${i}`,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        published_at: p.date,
        read_time: p.readTime,
        category: p.category,
        featured_image: null,
        featured_image_alt: null,
        author: "L'équipe QCM Civique",
      }));
      setPosts(staticAsPosts);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured post (first one)
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  // Generate exhaustive article list for SEO crawlers (appears in source code)
  const allArticleLinks = STATIC_BLOG_POSTS.map(post => ({
    slug: post.slug,
    title: post.title
  }));

  return (
    <UnifiedLayout>
      <SEO
        title="Blog Examen Civique 2026 – Guides et Conseils Naturalisation"
        description="Plus de 25 articles détaillés pour réussir l'examen civique 2026 et votre naturalisation française. Guides pratiques conformes au décret 2025-1345."
        canonical="/blog"
        keywords="blog examen civique, articles naturalisation, guide examen civique 2026, décret 2025-1345, conseils naturalisation"
      />

      {/* SEO: Hidden exhaustive article list for crawlers - ensures all URLs are discoverable */}
      <nav aria-label="Liste complète des articles" className="sr-only">
        <h2>Tous les articles du blog - Examen Civique 2026</h2>
        <ul>
          {allArticleLinks.map(article => (
            <li key={article.slug}>
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
          {/* Additional dynamic articles from Supabase */}
          {posts.filter(p => !allArticleLinks.find(a => a.slug === p.slug)).map(post => (
            <li key={post.id}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              <span>{posts.length} articles disponibles</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Blog & Guides
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Conseils d'experts pour réussir votre naturalisation française et l'examen civique 2026
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {loading ? (
            // Skeleton loading
            <div className="space-y-8">
              <Skeleton className="h-80 w-full rounded-2xl" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Aucun article trouvé</h2>
              <p className="text-muted-foreground">Essayez de modifier vos critères de recherche</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <Link to={`/blog/${featuredPost.slug}`} className="block mb-12 group">
                  <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-strong">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image or gradient placeholder */}
                      <div className="relative h-48 md:h-full min-h-[250px] bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center">
                        {featuredPost.featured_image ? (
                          <img
                            src={featuredPost.featured_image}
                            alt={featuredPost.featured_image_alt || featuredPost.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-center p-8">
                            <img 
                              src="/assets/logo.png" 
                              alt="QCM Civique" 
                              className="w-20 h-20 object-contain mx-auto mb-4"
                            />
                            <Badge variant="secondary" className="text-sm">
                              {featuredPost.category}
                            </Badge>
                          </div>
                        )}
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">À la une</Badge>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge variant="outline" className="text-primary border-primary">
                            {featuredPost.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {featuredPost.read_time}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(featuredPost.published_at)}
                          </div>
                          <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                            Lire l'article
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              )}

              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Tous les articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {otherPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                        <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary hover:shadow-strong transition-all duration-300 group-hover:scale-[1.02]">
                          {/* Card Header with gradient */}
                          <div className="h-32 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent flex items-center justify-center relative">
                            {post.featured_image ? (
                              <img
                                src={post.featured_image}
                                alt={post.featured_image_alt || post.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <img 
                                src="/assets/logo.png" 
                                alt="QCM Civique" 
                                className="w-12 h-12 object-contain"
                              />
                            )}
                          </div>

                          {/* Card Body */}
                          <div className="flex-1 p-5 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs font-medium">
                                {post.category}
                              </Badge>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {post.read_time}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                            <div className="flex items-center justify-between pt-4 mt-4 border-t">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.published_at)}
                              </div>
                              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Share Section */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-4">Partagez nos guides</h2>
          <div className="flex justify-center">
            <ShareButtons
              title="Blog QCM Civique - Guides Naturalisation"
              description="Guides et conseils pour réussir l'examen civique français"
              compact={false}
            />
          </div>
        </div>
      </section>
    </UnifiedLayout>
  );
};

export default Blog;
