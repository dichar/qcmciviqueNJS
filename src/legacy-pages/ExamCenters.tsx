import { useState, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Building2,
  ExternalLink,
  Calendar,
  Clock,
  FileCheck,
  Euro,
  CheckCircle,
  MapPin,
  Globe,
  HelpCircle,
  ArrowLeft,
  List,
  LocateFixed,
  Navigation as NavigationIcon,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import Breadcrumb from "@/components/exam-centers/Breadcrumb";
import SearchBar from "@/components/exam-centers/SearchBar";
import CenterCard from "@/components/exam-centers/CenterCard";
import CentersCTASocialProof from "@/components/exam-centers/CentersCTASocialProof";
import { useLazyLoadMap } from "@/hooks/useLazyLoadMap";
import { ExamCenter } from "@/components/exam-centers/types";
import centersData from "@/data/exam-centers.json";

// Lazy load the map for better performance
const ExamCentersMap = lazy(() => import("@/components/exam-centers/ExamCentersMap"));

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// Helper to extract city from address
const getCity = (address: string): string => {
  const postalMatch = address.match(/\b(\d{5})\s+([A-ZÀ-Ÿ][A-Za-zÀ-ÿ\s-]+)/);
  if (postalMatch && postalMatch[2]) {
    return postalMatch[2].trim();
  }
  const parts = address.split(",");
  if (parts.length >= 2) {
    return parts[parts.length - 1].trim();
  }
  return "";
};

const getPostalCode = (address: string): string => {
  const postalMatch = address.match(/\b(\d{5})\b/);
  return postalMatch ? postalMatch[1] : "";
};

const getDepartment = (address: string): string => {
  const postalCode = getPostalCode(address);
  return postalCode ? postalCode.substring(0, 2) : "";
};

// Lazy Map Section Component with Intersection Observer
interface LazyMapSectionProps {
  centers: ExamCenter[];
  filteredCenters: ExamCenter[];
  selectedCenter: ExamCenter | null;
  onCenterSelect: (center: ExamCenter | null) => void;
}

const LazyMapSection = ({ centers, filteredCenters, selectedCenter, onCenterSelect }: LazyMapSectionProps) => {
  const [mapContainerRef, shouldLoadMap] = useLazyLoadMap({ rootMargin: "300px" });
  
  return (
    <Card className="p-4 md:p-6 mb-8" ref={mapContainerRef}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        Carte Interactive des Centres
      </h2>
      {shouldLoadMap ? (
        <Suspense
          fallback={
            <div className="w-full h-[400px] md:h-[500px] rounded-lg bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
              </div>
            </div>
          }
        >
          <ExamCentersMap
            centers={centers}
            filteredCenters={filteredCenters}
            selectedCenter={selectedCenter}
            onCenterSelect={onCenterSelect}
          />
        </Suspense>
      ) : (
        <div className="w-full h-[400px] md:h-[500px] rounded-lg bg-secondary/30 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Faites défiler pour charger la carte</p>
          </div>
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-3">
        💡 Cliquez sur un marqueur pour voir les détails et les boutons d'inscription.
      </p>
    </Card>
  );
};

const ExamCenters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<ExamCenter | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);

  const centers: ExamCenter[] = centersData as ExamCenter[];

  const topCities = useMemo(() => {
    const counts = new Map<string, number>();
    centers.forEach((center) => {
      const city = getCity(center.adresse);
      if (!city) return;
      counts.set(city, (counts.get(city) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([city]) => city);
  }, [centers]);

  // Filter centers based on search
  const filteredCenters = useMemo(() => {
    if (!searchQuery.trim()) return centers;

    const query = normalizeText(searchQuery);
    return centers.filter(
      (center) => {
        const city = getCity(center.adresse);
        const address = center.adresse;
        const department = getDepartment(center.adresse);
        const postal = getPostalCode(center.adresse);
        return (
          normalizeText(center.nom).includes(query) ||
          normalizeText(address).includes(query) ||
          normalizeText(city).includes(query) ||
          normalizeText(department).includes(query) ||
          normalizeText(postal).includes(query)
        );
      },
    );
  }, [centers, searchQuery]);

  const distanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const nearestCenter = useMemo<{ center: ExamCenter; distance: number } | null>(() => {
    if (!userLocation) return null;
    let closest: { center: ExamCenter; distance: number } | null = null;
    filteredCenters.forEach((center) => {
      const d = distanceKm(userLocation.lat, userLocation.lng, center.latitude, center.longitude);
      if (!closest || d < closest.distance) {
        closest = { center, distance: d };
      }
    });
    return closest;
  }, [filteredCenters, userLocation]);

  const handleLocate = () => {
    setLocError(null);
    if (!navigator.geolocation) {
      const msg = "La géolocalisation n'est pas supportée par votre navigateur.";
      setLocError(msg);
      toast({ title: "Géolocalisation indisponible", description: msg, variant: "destructive" });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setLocating(false);
        toast({ title: "Position trouvée", description: "Le centre le plus proche a été identifié." });
      },
      (err) => {
        setLocating(false);
        let msg = "Impossible de récupérer votre position. Réessayez.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Autorisation refusée. Activez la localisation dans les paramètres de votre navigateur pour trouver le centre le plus proche.";
        } else if (err.code === err.TIMEOUT) {
          msg = "La demande de localisation a expiré. Vérifiez votre connexion et réessayez.";
        }
        setLocError(msg);
        toast({ title: "Erreur de localisation", description: msg, variant: "destructive" });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  // Group centers by region/department for SEO listing
  const groupedCenters = useMemo(() => {
    const groups: Record<string, ExamCenter[]> = {};

    filteredCenters.forEach((center) => {
      // Extract postal code and department
      const postalMatch = center.adresse.match(/\b(\d{5})\b/);
      const postalCode = postalMatch ? postalMatch[1] : "00000";
      const dept = postalCode.substring(0, 2);

      // Handle overseas territories
      let region = "";
      if (dept.startsWith("97") || dept.startsWith("98")) {
        region = "Outre-Mer";
      } else {
        region = `Département ${dept}`;
      }

      if (!groups[region]) {
        groups[region] = [];
      }
      groups[region].push(center);
    });

    // Sort by region name
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCenters]);

  const modalites = [
    {
      icon: Calendar,
      titre: "Premières sessions",
      description: "Dès le 8 décembre 2025 en QCM numérique (ordinateur)",
    },
    {
      icon: Clock,
      titre: "Durée",
      description: "60 minutes, 50 questions sur les valeurs républicaines",
    },
    {
      icon: FileCheck,
      titre: "Obligatoire pour",
      description: "Titre de séjour >1 an, naturalisation (attestation de réussite requise)",
    },
    {
      icon: Euro,
      titre: "Coût",
      description: "Variable par centre (environ 50-100€, vérifier sur site)",
    },
  ];

  const faqItems = [
    {
      question: "Quand commence l'examen civique ?",
      answer:
        "Les premières sessions démarrent le 8 décembre 2025 dans les centres agréés CCI. L'examen devient obligatoire à partir du 1er janvier 2026 pour les cartes de séjour pluriannuelles, titre de résident et naturalisation.",
    },
    {
      question: "Où passer l'examen civique ?",
      answer:
        "L'examen se passe uniquement dans les centres agréés CCI (via Le Français des Affaires). Attention : les préfectures ne peuvent PAS faire passer cet examen. Utilisez notre carte interactive ci-dessus pour trouver un centre près de chez vous parmi les 158 centres agréés en France.",
    },
    {
      question: "Comment s'inscrire à l'examen civique ?",
      answer:
        "Cliquez sur le bouton 'S'inscrire' du centre de votre choix sur notre carte ou dans la liste ci-dessous. Vous serez redirigé vers le site officiel du Français des Affaires pour finaliser votre inscription.",
    },
    {
      question: "Combien coûte l'examen civique ?",
      answer:
        "Le coût varie selon les centres, généralement entre 50€ et 100€. Vérifiez le tarif exact sur le site du centre agréé de votre choix lors de l'inscription.",
    },
    {
      question: "Quel est le format de l'examen civique ?",
      answer:
        "L'examen dure 60 minutes et comprend 50 questions en QCM (questionnaire à choix multiples) sur ordinateur. Les questions portent sur les valeurs de la République française, l'histoire, la géographie et les institutions.",
    },
    {
      question: "Qui doit passer l'examen civique ?",
      answer:
        "L'examen est obligatoire pour : les demandeurs d'une carte de séjour pluriannuelle (>1 an), les demandeurs du titre de résident, et les candidats à la naturalisation française. Une attestation de réussite est requise.",
    },
    {
      question: "Les préfectures peuvent-elles faire passer l'examen ?",
      answer:
        "Non. Seuls les centres agréés CCI (via Le Français des Affaires) sont habilités à faire passer l'examen civique. Les préfectures ne sont pas autorisées à organiser cet examen.",
    },
    {
      question: "Comment se préparer à l'examen civique ?",
      answer:
        "Testez notre plateforme QCMcivique.fr avec un essai gratuit ! Nous proposons des QCM sur les valeurs républicaines, l'histoire et la géographie française, ainsi que le Livret du Citoyen interactif pour réviser tous les thèmes.",
    },
    {
      question: "Que faire si j'échoue à l'examen civique ?",
      answer:
        "En cas d'échec, vous pouvez repasser l'examen. Il n'y a pas de délai d'attente obligatoire, mais vous devrez vous réinscrire et repayer les frais d'examen dans un centre agréé CCI.",
    },
    {
      question: "L'attestation de réussite est-elle valable combien de temps ?",
      answer:
        "Les modalités exactes de validité de l'attestation seront précisées par les textes réglementaires. Consultez les sources officielles (Légifrance, Service-Public.fr) pour les informations les plus récentes.",
    },
  ];

  // JSON-LD structured data for local business listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Centres d'examen civique agréés en France",
    description:
      "Liste des 158 centres agréés CCI pour passer l'examen civique obligatoire en France métropolitaine et outre-mer",
    numberOfItems: centers.length,
    itemListElement: centers.slice(0, 50).map((center, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOrganization",
        name: center.nom,
        address: {
          "@type": "PostalAddress",
          streetAddress: center.adresse,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: center.latitude,
          longitude: center.longitude,
        },
      },
    })),
  };

  // Dynamic SEO based on selected center
  const dynamicSEO = useMemo(() => {
    if (selectedCenter) {
      const city = getCity(selectedCenter.adresse);
      return {
        title: `Centre d'examen ${city} - ${selectedCenter.nom} | QCM Civique`,
        description: `Coordonnées, adresse et horaires du centre d'examen civique à ${city}. Préparez votre naturalisation avec nos QCM.`,
      };
    }
    return {
      title: "158 Centres d'examen civique agréés CCI en France | Carte interactive",
      description:
        "Trouvez un centre agréé CCI près de chez vous pour passer l'examen civique 2026. Carte interactive, liste complète des 158 centres, inscription en ligne.",
    };
  }, [selectedCenter]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={dynamicSEO.title} description={dynamicSEO.description} canonical="/centres" />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navigation />

      {/* CTA Banner - Social Proof Version */}
      <CentersCTASocialProof />

      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Header */}
        <header className="mb-8">
          <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 md:p-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <MapPin className="w-3.5 h-3.5" />
                158 centres agréés CCI
              </div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                <span>Centres d'Examen Civique</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trouvez rapidement un centre près de chez vous par ville, code postal ou département.
              </p>
            </div>
            <div className="mt-6 md:mt-8">
              <Card className="p-4 md:p-5 border-primary/10 bg-background/80 backdrop-blur">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  resultsCount={filteredCenters.length}
                  totalCount={centers.length}
                  quickFilters={topCities}
                  onQuickFilter={setSearchQuery}
                />
              </Card>
            </div>
          </div>
        </header>

        {/* Nearest center */}
            <Card className="p-4 md:p-5 mb-6 border-primary/10 bg-primary/5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-sm mb-1">Trouver le centre le plus proche</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilisez votre position pour calculer le centre le plus proche.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setUserLocation(null);
                      setSelectedCenter(null);
                      setLocError(null);
                    }}
                  >
                    Recherche manuelle
                  </Button>
                  <Button onClick={handleLocate} size="sm" disabled={locating} className="gap-2 w-full sm:w-auto">
                    <LocateFixed className="w-4 h-4" />
                    {locating ? "Localisation..." : "Me localiser"}
                  </Button>
                </div>
              </div>

          {locError && (
            <p className="text-xs text-destructive mt-2">{locError}</p>
          )}

          {nearestCenter && (
            <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{nearestCenter.center.nom}</p>
                  <p className="text-xs text-muted-foreground">{nearestCenter.center.adresse}</p>
                  <p className="text-xs text-primary mt-1">~{nearestCenter.distance.toFixed(1)} km</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => setSelectedCenter(nearestCenter.center)}
                  >
                    <NavigationIcon className="w-3 h-3" />
                    Voir
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Map - Full width */}
        <LazyMapSection
          centers={centers}
          filteredCenters={filteredCenters}
          selectedCenter={selectedCenter}
          onCenterSelect={setSelectedCenter}
        />

        {/* Info section */}
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Dates et Modalités */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Dates et Modalités
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {modalites.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">{item.titre}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Selected center hint */}
            {selectedCenter && (
              <Card className="p-4 border-primary/20 bg-primary/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Centre sélectionné</p>
                    <p className="text-sm text-muted-foreground">{selectedCenter.nom}</p>
                  </div>
                </div>
              </Card>
            )}
        </div>

        {/* SEO Listing Grid */}
        <Card className="p-4 md:p-6 mb-8">
          <button
            onClick={() => setListOpen((v) => !v)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <List className="w-5 h-5 text-primary" />
              Liste Complète des {filteredCenters.length} Centres
            </h2>
            <span className="text-sm text-muted-foreground">
              {listOpen ? "Masquer" : "Afficher"}
            </span>
          </button>

          {listOpen && (
            <div className="mt-6">
              {groupedCenters.map(([region, regionCenters]) => (
                <div key={region} className="mb-6 last:mb-0">
                  <h3 className="font-medium text-sm text-primary mb-3 pb-2 border-b">
                    {region} ({regionCenters.length} centre{regionCenters.length > 1 ? "s" : ""})
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {regionCenters.map((center, index) => {
                      const d = userLocation
                        ? distanceKm(userLocation.lat, userLocation.lng, center.latitude, center.longitude)
                        : null;
                      return (
                        <CenterCard
                          key={`${center.nom}-${index}`}
                          center={center}
                          onSelect={setSelectedCenter}
                          distanceKm={d}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredCenters.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">Aucun centre trouvé pour "{searchQuery}"</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setSearchQuery("")}>
                    Effacer la recherche
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* FAQ Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Questions Fréquentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary text-sm">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Call to Action */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Préparez-vous dès maintenant</h3>
            <p className="text-muted-foreground mb-4">Testez nos quiz pour réussir l'examen civique du premier coup</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/quiz">
                <Button size="lg">🎯 Tester le QCM gratuitement</Button>
              </Link>
              <Link to="/livret-citoyen">
                <Button variant="outline" size="lg">
                  📚 Lire le Livret du Citoyen
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Ressources officielles */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Ressources Officielles
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                nom: "Le Français des Affaires - Centres agréés",
                description: "Site officiel CCI",
                url: "https://www.lefrancaisdesaffaires.fr/candidat/trouver-un-centre-agree/",
              },
              {
                nom: "Le Français des Affaires - Inscription",
                description: "Page d'inscription examen civique",
                url: "https://www.lefrancaisdesaffaires.fr/candidat/examen-civique/inscription/",
              },
              {
                nom: "Légifrance",
                description: "Texte officiel de l'arrêté",
                url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052381620",
              },
              {
                nom: "Service-Public.fr",
                description: "Informations officielles naturalisation",
                url: "https://www.service-public.fr",
              },
            ].map((ressource, index) => (
              <a
                key={index}
                href={ressource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{ressource.nom}</p>
                  <p className="text-xs text-muted-foreground">{ressource.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </a>
            ))}
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamCenters;
