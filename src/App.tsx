import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { FeedbackDialog } from "./components/FeedbackDialog";
import { AuthCallback } from "./components/AuthCallback";
import { useServiceWorkerUpdate } from "./hooks/useServiceWorkerUpdate";
import { ScrollToTop } from "./components/ScrollToTop";

// Skeleton fallbacks
import { LegalPageSkeleton } from "./components/skeletons/LegalPageSkeleton";
import { BlogPageSkeleton } from "./components/skeletons/BlogPageSkeleton";
import { QuizPageSkeleton } from "./components/skeletons/QuizPageSkeleton";
import { GenericPageSkeleton } from "./components/skeletons/GenericPageSkeleton";
import { SiloPageSkeleton } from "./components/skeletons/SiloPageSkeleton";

// Critical pages - eager load
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Lazy loaded pages
const Quiz = lazy(() => import("./pages/Quiz"));
const Eligibility = lazy(() => import("./pages/Eligibility"));
const ExamCenters = lazy(() => import("./pages/ExamCenters"));
const Account = lazy(() => import("./pages/Account"));
const Results = lazy(() => import("./pages/Results"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const QuizValeursRepublique = lazy(() => import("./pages/QuizValeursRepublique"));
const QuizDroitsDevoirs = lazy(() => import("./pages/QuizDroitsDevoirs"));
const QuizHistoireGeographie = lazy(() => import("./pages/QuizHistoireGeographie"));
const SmartRevision = lazy(() => import("./pages/SmartRevision"));
const CommonErrors = lazy(() => import("./pages/CommonErrors"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/blog/BlogArticle"));
const ReussirExamenCivique2026 = lazy(() => import("./pages/blog/ReussirExamenCivique2026"));
const QuizUnlocked = lazy(() => import("./pages/QuizUnlocked"));
const LivretCitoyen = lazy(() => import("./pages/LivretCitoyen"));
const Objectives = lazy(() => import("./pages/Objectives"));
const Support = lazy(() => import("./pages/Support"));
const EntrainementCSP = lazy(() => import("./pages/EntrainementCSP"));
const EntrainementCR = lazy(() => import("./pages/EntrainementCR"));
const EntrainementNaturalisation = lazy(() => import("./pages/EntrainementNaturalisation"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Packs = lazy(() => import("./pages/Packs"));

// Blog articles - lazy
const DixErreursAEviter = lazy(() => import("./pages/blog/DixErreursAEviter"));
const ValeursRepubliqueExpliquees = lazy(() => import("./pages/blog/ValeursRepubliqueExpliquees"));
const ExamenCiviqueObligatoire2026 = lazy(() => import("./pages/blog/ExamenCiviqueObligatoire2026"));
const AlgeriensFranceExamenCivique = lazy(() => import("./pages/blog/AlgeriensFranceExamenCivique"));
const CinqThemesClesExamenCivique = lazy(() => import("./pages/blog/CinqThemesClesExamenCivique"));
const ExamenCiviqueDecret20251345 = lazy(() => import("./pages/blog/ExamenCiviqueDecret20251345"));
const ExamenCiviqueGuideComplet2026 = lazy(() => import("./pages/blog/ExamenCiviqueGuideComplet2026"));
const EntretienNaturalisation100Questions = lazy(() => import("./pages/blog/EntretienNaturalisation100Questions"));
const NiveauB2Naturalisation2026 = lazy(() => import("./pages/blog/NiveauB2Naturalisation2026"));
const CartePluriannuelleVsResident = lazy(() => import("./pages/blog/CartePluriannuelleVsResident"));
const NaturalisationMariageVsDecret = lazy(() => import("./pages/blog/NaturalisationMariageVsDecret"));
const MotifsRefusAjournement = lazy(() => import("./pages/blog/MotifsRefusAjournement"));
const TutoANEFNaturalisation = lazy(() => import("./pages/blog/TutoANEFNaturalisation"));
const ResumeLivretCitoyen2026 = lazy(() => import("./pages/blog/ResumeLivretCitoyen2026"));
const ContratIntegrationRepublicaine = lazy(() => import("./pages/blog/ContratIntegrationRepublicaine"));
const CarteResidentLongueDureeUE = lazy(() => import("./pages/blog/CarteResidentLongueDureeUE"));
const EntretienNaturalisation100QuestionsComplet = lazy(() => import("./pages/blog/EntretienNaturalisation100QuestionsComplet"));
const ComprenderLivretCitoyen2026 = lazy(() => import("./pages/blog/ComprenderLivretCitoyen2026"));
const NaturalisationVsCarteResidentVsPluriannuelle = lazy(() => import("./pages/blog/NaturalisationVsCarteResidentVsPluriannuelle"));
const NaturalisationParMariageConditions2026 = lazy(() => import("./pages/blog/NaturalisationParMariageConditions2026"));
const ExamenCivique40Questions80Pourcent = lazy(() => import("./pages/blog/ExamenCivique40Questions80Pourcent"));
const CarteResidentFranceDroits2026 = lazy(() => import("./pages/blog/CarteResidentFranceDroits2026"));
const CarteSejourPluriannuelleConditions2026 = lazy(() => import("./pages/blog/CarteSejourPluriannuelleConditions2026"));
const SymbolesFranceDrapeauMarseillaise = lazy(() => import("./pages/blog/SymbolesFranceDrapeauMarseillaise"));
const DroitsDevoirsCitoyensFrancais = lazy(() => import("./pages/blog/DroitsDevoirsCitoyensFrancais"));
const ParcoursIntegrationCIR2026 = lazy(() => import("./pages/blog/ParcoursIntegrationCIR2026"));

// Admin pages - lazy
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminReconciliation = lazy(() => import("./pages/admin/AdminReconciliation"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminDataExport = lazy(() => import("./pages/admin/AdminDataExport"));
const AdminMessaging = lazy(() => import("./pages/admin/AdminMessaging"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminBlogMigrate = lazy(() => import("./pages/admin/AdminBlogMigrate"));
const AdminMarketing = lazy(() => import("./pages/admin/AdminMarketing"));
const AdminPaymentAlerts = lazy(() => import("./pages/admin/AdminPaymentAlerts"));
const AdminIndexNow = lazy(() => import("./pages/admin/AdminIndexNow"));
const AdminHealthCheck = lazy(() => import("./pages/admin/AdminHealthCheck"));
const AdminQuizStats = lazy(() => import("./pages/admin/AdminQuizStats"));
const AdminRevenue = lazy(() => import("./pages/admin/AdminRevenue"));

// Silo pages - lazy
const HistoireFrance = lazy(() => import("./pages/silos/HistoireFrance"));
const ValeursRepublique = lazy(() => import("./pages/silos/ValeursRepublique"));
const DroitsDevoirs = lazy(() => import("./pages/silos/DroitsDevoirs"));
const InstitutionsFrancaises = lazy(() => import("./pages/silos/InstitutionsFrancaises"));
const VivreFrance = lazy(() => import("./pages/silos/VivreFrance"));

// Legal pages - lazy
const CGU = lazy(() => import("./pages/legal/CGU"));
const PolitiqueConfidentialite = lazy(() => import("./pages/legal/PolitiqueConfidentialite"));
const CGV = lazy(() => import("./pages/legal/CGV"));
const MentionsLegales = lazy(() => import("./pages/legal/MentionsLegales"));

const queryClient = new QueryClient();

const ServiceWorkerUpdater = () => {
  useServiceWorkerUpdate();
  return null;
};

// Suspense wrappers
const Legal = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LegalPageSkeleton />}>{children}</Suspense>
);
const BlogSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<BlogPageSkeleton />}>{children}</Suspense>
);
const QuizSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<QuizPageSkeleton />}>{children}</Suspense>
);
const SiloSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SiloPageSkeleton />}>{children}</Suspense>
);
const Generic = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<GenericPageSkeleton />}>{children}</Suspense>
);

/**
 * Main App component for development mode (CSR)
 * For production SSG build, see main.tsx which uses vite-react-ssg
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <ServiceWorkerUpdater />
          <Toaster />
          <Sonner />
           <BrowserRouter>
            <ScrollToTop />
            <AuthCallback>
            <FeedbackDialog />
            <PWAInstallPrompt />
            <Routes>
            <Route path="/" element={<Index />} />
            {/* Canonical URL for quiz - SEO optimized */}
            <Route path="/qcm-citoyennete-francaise" element={<QuizSuspense><Quiz /></QuizSuspense>} />
            {/* SEO Redirects */}
            <Route path="/test-civique-naturalisation" element={<Navigate to="/qcm-citoyennete-francaise" replace />} />
            <Route path="/quiz" element={<Navigate to="/qcm-citoyennete-francaise" replace />} />
            <Route path="/eligibility" element={<Generic><Eligibility /></Generic>} />
            <Route path="/centres" element={<Generic><ExamCenters /></Generic>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Generic><Account /></Generic>} />
            <Route path="/dashboard" element={<Generic><Dashboard /></Generic>} />
            <Route path="/results" element={<Generic><Results /></Generic>} />
            <Route path="/livret-citoyen" element={<Generic><LivretCitoyen /></Generic>} />
            <Route path="/support" element={<Generic><Support /></Generic>} />
            <Route path="/notifications" element={<Generic><Notifications /></Generic>} />
            <Route path="/objectives" element={<Generic><Objectives /></Generic>} />
            <Route path="/privacy" element={<Legal><Privacy /></Legal>} />
            <Route path="/terms" element={<Legal><Terms /></Legal>} />
            <Route path="/about" element={<Generic><About /></Generic>} />
            <Route path="/contact" element={<Generic><Contact /></Generic>} />
            {/* Legal pages */}
            <Route path="/cgu" element={<Legal><CGU /></Legal>} />
            <Route path="/confidentialite" element={<Legal><PolitiqueConfidentialite /></Legal>} />
            <Route path="/cgv" element={<Legal><CGV /></Legal>} />
            <Route path="/mentions-legales" element={<Legal><MentionsLegales /></Legal>} />
            <Route path="/packs" element={<Generic><Packs /></Generic>} />
            <Route path="/quiz-valeurs-republique" element={<QuizSuspense><QuizValeursRepublique /></QuizSuspense>} />
            <Route path="/quiz-droits-devoirs-citoyen" element={<QuizSuspense><QuizDroitsDevoirs /></QuizSuspense>} />
            <Route path="/quiz-histoire-geographie-france" element={<QuizSuspense><QuizHistoireGeographie /></QuizSuspense>} />
            <Route path="/revision-intelligente" element={<Generic><SmartRevision /></Generic>} />
            <Route path="/erreurs-frequentes" element={<Generic><CommonErrors /></Generic>} />
            {/* Training pages */}
            <Route path="/entrainement-csp" element={<QuizSuspense><EntrainementCSP /></QuizSuspense>} />
            <Route path="/entrainement-cr" element={<QuizSuspense><EntrainementCR /></QuizSuspense>} />
            <Route path="/entrainement-naturalisation" element={<QuizSuspense><EntrainementNaturalisation /></QuizSuspense>} />
            <Route path="/blog" element={<BlogSuspense><Blog /></BlogSuspense>} />
            <Route path="/blog/:slug" element={<BlogSuspense><BlogArticle /></BlogSuspense>} />
            {/* Blog static routes */}
            <Route path="/blog/reussir-examen-civique-2026" element={<BlogSuspense><ReussirExamenCivique2026 /></BlogSuspense>} />
            <Route path="/blog/10-erreurs-a-eviter" element={<BlogSuspense><DixErreursAEviter /></BlogSuspense>} />
            <Route path="/blog/valeurs-republique-expliquees" element={<BlogSuspense><ValeursRepubliqueExpliquees /></BlogSuspense>} />
            <Route path="/blog/examen-civique-obligatoire-2026" element={<BlogSuspense><ExamenCiviqueObligatoire2026 /></BlogSuspense>} />
            <Route path="/blog/algeriens-france-examen-civique" element={<BlogSuspense><AlgeriensFranceExamenCivique /></BlogSuspense>} />
            <Route path="/blog/5-themes-cles-examen-civique" element={<BlogSuspense><CinqThemesClesExamenCivique /></BlogSuspense>} />
            <Route path="/blog/examen-civique-decret-20251345" element={<BlogSuspense><ExamenCiviqueDecret20251345 /></BlogSuspense>} />
            <Route path="/blog/examen-civique-guide-complet-2026" element={<BlogSuspense><ExamenCiviqueGuideComplet2026 /></BlogSuspense>} />
            <Route path="/blog/entretien-naturalisation-100-questions" element={<BlogSuspense><EntretienNaturalisation100Questions /></BlogSuspense>} />
            <Route path="/blog/niveau-b2-naturalisation-2026" element={<BlogSuspense><NiveauB2Naturalisation2026 /></BlogSuspense>} />
            <Route path="/blog/carte-pluriannuelle-vs-resident" element={<BlogSuspense><CartePluriannuelleVsResident /></BlogSuspense>} />
            <Route path="/blog/naturalisation-mariage-vs-decret" element={<BlogSuspense><NaturalisationMariageVsDecret /></BlogSuspense>} />
            <Route path="/blog/motifs-refus-ajournement" element={<BlogSuspense><MotifsRefusAjournement /></BlogSuspense>} />
            <Route path="/blog/tuto-anef-naturalisation" element={<BlogSuspense><TutoANEFNaturalisation /></BlogSuspense>} />
            <Route path="/blog/resume-livret-citoyen-2026" element={<BlogSuspense><ResumeLivretCitoyen2026 /></BlogSuspense>} />
            <Route path="/blog/contrat-integration-republicaine" element={<BlogSuspense><ContratIntegrationRepublicaine /></BlogSuspense>} />
            <Route path="/blog/carte-resident-longue-duree-ue" element={<BlogSuspense><CarteResidentLongueDureeUE /></BlogSuspense>} />
            <Route path="/blog/entretien-naturalisation-100-questions-complet" element={<BlogSuspense><EntretienNaturalisation100QuestionsComplet /></BlogSuspense>} />
            <Route path="/blog/comprendre-livret-citoyen-2026" element={<BlogSuspense><ComprenderLivretCitoyen2026 /></BlogSuspense>} />
            <Route path="/blog/naturalisation-vs-carte-resident-vs-pluriannuelle" element={<BlogSuspense><NaturalisationVsCarteResidentVsPluriannuelle /></BlogSuspense>} />
            <Route path="/blog/naturalisation-par-mariage-conditions-2026" element={<BlogSuspense><NaturalisationParMariageConditions2026 /></BlogSuspense>} />
            <Route path="/blog/examen-civique-40-questions-80-pourcent" element={<BlogSuspense><ExamenCivique40Questions80Pourcent /></BlogSuspense>} />
            <Route path="/blog/carte-resident-france-droits-2026" element={<BlogSuspense><CarteResidentFranceDroits2026 /></BlogSuspense>} />
            <Route path="/blog/carte-sejour-pluriannuelle-conditions-2026" element={<BlogSuspense><CarteSejourPluriannuelleConditions2026 /></BlogSuspense>} />
            <Route path="/blog/symboles-france-drapeau-marseillaise" element={<BlogSuspense><SymbolesFranceDrapeauMarseillaise /></BlogSuspense>} />
            <Route path="/blog/droits-devoirs-citoyens-francais" element={<BlogSuspense><DroitsDevoirsCitoyensFrancais /></BlogSuspense>} />
            <Route path="/blog/parcours-integration-cir-2026" element={<BlogSuspense><ParcoursIntegrationCIR2026 /></BlogSuspense>} />
            {/* Silo pages */}
            <Route path="/histoire-france" element={<SiloSuspense><HistoireFrance /></SiloSuspense>} />
            <Route path="/valeurs-republique" element={<SiloSuspense><ValeursRepublique /></SiloSuspense>} />
            <Route path="/droits-devoirs" element={<SiloSuspense><DroitsDevoirs /></SiloSuspense>} />
            <Route path="/institutions-francaises" element={<SiloSuspense><InstitutionsFrancaises /></SiloSuspense>} />
            <Route path="/vivre-france" element={<SiloSuspense><VivreFrance /></SiloSuspense>} />
            {/* Admin routes */}
            <Route path="/gestion-qcmcivique-admin" element={<Generic><AdminDashboard /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/blog" element={<Generic><AdminBlog /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/blog/new" element={<Generic><AdminBlogEditor /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/blog/edit/:id" element={<Generic><AdminBlogEditor /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/blog/migrate" element={<Generic><AdminBlogMigrate /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/payments" element={<Generic><AdminPayments /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/users" element={<Generic><AdminUsers /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/messaging" element={<Generic><AdminMessaging /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/marketing" element={<Generic><AdminMarketing /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/payment-alerts" element={<Generic><AdminPaymentAlerts /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/indexnow" element={<Generic><AdminIndexNow /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/reconciliation" element={<Generic><AdminReconciliation /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/settings" element={<Generic><AdminSettings /></Generic>} />
<Route path="/gestion-qcmcivique-admin/data-export" element={<Generic><AdminDataExport /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/health" element={<Generic><AdminHealthCheck /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/quiz-stats" element={<Generic><AdminQuizStats /></Generic>} />
            <Route path="/gestion-qcmcivique-admin/revenue" element={<Generic><AdminRevenue /></Generic>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
            </AuthCallback>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
);

export default App;
