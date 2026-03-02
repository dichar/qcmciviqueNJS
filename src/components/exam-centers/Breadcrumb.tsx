import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-primary transition-colors"
            itemProp="item"
          >
            <Home className="w-4 h-4" />
            <span itemProp="name">Accueil</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <ChevronRight className="w-4 h-4" />
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <span className="font-medium text-foreground" itemProp="name">
            Centres d'examen civique
          </span>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
