import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, MapPin, Users, Scale, Landmark, Heart, ArrowRight } from "lucide-react";

// Silo pages for SEO internal linking
const SILO_PAGES = [
  { href: "/valeurs-republique", label: "Valeurs de la République", icon: Heart },
  { href: "/histoire-france", label: "Histoire de France", icon: BookOpen },
  { href: "/droits-devoirs", label: "Droits et Devoirs", icon: Scale },
  { href: "/institutions-francaises", label: "Institutions françaises", icon: Landmark },
  { href: "/vivre-france", label: "Vivre en France", icon: Users },
];

interface RecentPost {
  slug: string;
  title: string;
}

export function Footer() {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("slug, title")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(5);

        if (!error && data) {
          setRecentPosts(data);
        }
      } catch (err) {
        console.error("Error fetching recent posts for footer:", err);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <footer role="contentinfo" className="bg-muted/50 border-t py-12">
      <div className="container mx-auto px-4">
        {/* SEO Section: Silos + Recent Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 text-sm">
          {/* Column 1: Thématiques (Silos) */}
          <div>
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Thématiques
            </h3>
            <ul className="space-y-2">
              {SILO_PAGES.map((silo) => (
                <li key={silo.href}>
                  <Link 
                    to={silo.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <silo.icon className="w-3 h-3" />
                    {silo.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Recent Blog Articles */}
          <div>
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Articles récents
            </h3>
            {recentPosts.length > 0 ? (
              <ul className="space-y-2">
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Chargement...</p>
            )}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 mt-3 text-primary hover:underline text-xs font-medium"
            >
              Voir tous les articles
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/qcm-citoyennete-francaise" className="text-muted-foreground hover:text-primary transition-colors">
                  QCM Examen Civique
                </Link>
              </li>
              <li>
                <Link to="/centres" className="text-muted-foreground hover:text-primary transition-colors">
                  Centres d'examen
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="text-muted-foreground hover:text-primary transition-colors">
                  Test d'éligibilité
                </Link>
              </li>
              <li>
                <Link to="/livret-citoyen" className="text-muted-foreground hover:text-primary transition-colors">
                  Livret du Citoyen
                </Link>
              </li>
              <li>
                <Link to="/packs" className="text-muted-foreground hover:text-primary transition-colors">
                  Nos offres
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>Avertissement :</strong> Ce site est un outil d'entraînement indépendant et non officiel.
          </p>
          <p className="mb-4">
            Les résultats obtenus ne garantissent pas la réussite à l'examen officiel. Pour toute information
            officielle, consultez Service-Public.fr
          </p>
          
          {/* Main navigation links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs mb-4">
            <Link to="/about" className="hover:text-primary transition-colors">
              À propos
            </Link>
            <span>•</span>
            <Link to="/support" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </div>

          {/* Exam levels links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs mb-4">
            <span className="font-medium text-foreground">Niveaux d'examen :</span>
            <Link to="/entrainement-csp" className="hover:text-primary transition-colors">
              Quiz niveau CSP (Fondamental)
            </Link>
            <span>•</span>
            <Link to="/entrainement-cr" className="hover:text-primary transition-colors">
              Quiz niveau Résident (Intermédiaire)
            </Link>
            <span>•</span>
            <Link to="/entrainement-naturalisation" className="hover:text-primary transition-colors">
              Quiz Naturalisation (Approfondi)
            </Link>
          </div>
          
          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs border-t pt-4 mt-4">
            <Link to="/cgu" className="hover:text-primary transition-colors">
              CGU
            </Link>
            <span>•</span>
            <Link to="/confidentialite" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
            <span>•</span>
            <Link to="/cgv" className="hover:text-primary transition-colors">
              CGV
            </Link>
            <span>•</span>
            <Link to="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </Link>
          </div>
          
          <p className="mt-4 text-xs">
            © {new Date().getFullYear()} QCM Civique France - Préparation à l'examen civique de naturalisation
          </p>
        </div>
      </div>
    </footer>
  );
}
