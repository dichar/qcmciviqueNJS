import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4 max-w-md">
        {/* Logo */}
        <Link to="/qcm-citoyennete-francaise" className="inline-block mb-8">
          <img 
            src="/assets/logo.png" 
            alt="QCM Civique Logo" 
            className="h-16 mx-auto"
            onError={(e) => {
              // Fallback to text if logo doesn't load
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('logo-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div 
            id="logo-fallback" 
            className="hidden text-2xl font-bold text-primary"
          >
            QCM Civique
          </div>
        </Link>

        {/* 404 Error */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-primary mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Page introuvable
          </p>
          <p className="text-muted-foreground">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" size="lg">
            <Link to="/qcm-citoyennete-francaise">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
            <span className="cursor-pointer" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </span>
          </Button>
        </div>

        {/* Helpful links */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Liens utiles :
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/quiz" className="text-primary hover:underline">
              Essayer le Quiz
            </Link>
            <Link to="/packs" className="text-primary hover:underline">
              Nos packs
            </Link>
            <Link to="/livret-citoyen" className="text-primary hover:underline">
              Livret citoyen
            </Link>
            <Link to="/blog" className="text-primary hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
