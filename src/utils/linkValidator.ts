/**
 * Link Validator Utility
 * Validates all internal links in the application against defined routes
 */

// All valid routes extracted from App.tsx
export const VALID_ROUTES = [
  "/",
  "/qcm-citoyennete-francaise",
  // Redirects to canonical URL (301)
  // "/test-civique-naturalisation", // redirects to /qcm-citoyennete-francaise
  // "/quiz", // redirects to /qcm-citoyennete-francaise
  "/eligibility",
  "/eligibility",
  "/centres",
  "/auth",
  "/account",
  "/dashboard",
  "/results",
  "/livret-citoyen",
  "/support",
  "/notifications",
  "/objectives",
  "/privacy",
  "/terms",
  "/about",
  "/contact",
  "/packs",
  "/quiz-valeurs-republique",
  "/quiz-droits-devoirs-citoyen",
  "/quiz-histoire-geographie-france",
  "/revision-intelligente",
  "/erreurs-frequentes",
  "/blog",
  "/blog/reussir-examen-civique-2026",
  "/blog/10-erreurs-a-eviter",
  "/blog/valeurs-republique-expliquees",
  "/blog/examen-civique-obligatoire-2026",
  "/blog/algeriens-france-examen-civique",
  "/blog/5-themes-cles-examen-civique",
  "/blog/examen-civique-decret-20251345",
  "/blog/examen-civique-guide-complet-2026",
  "/blog/entretien-naturalisation-100-questions",
  "/blog/niveau-b2-naturalisation-2026",
  "/blog/carte-pluriannuelle-vs-resident",
  "/blog/naturalisation-mariage-vs-decret",
  "/blog/motifs-refus-ajournement",
  "/blog/tuto-anef-naturalisation",
  "/blog/resume-livret-citoyen-2026",
  "/blog/contrat-integration-republicaine",
  "/blog/carte-resident-longue-duree-ue",
  "/blog/entretien-naturalisation-100-questions-complet",
  "/blog/comprendre-livret-citoyen-2026",
  "/blog/naturalisation-vs-carte-resident-vs-pluriannuelle",
  "/blog/naturalisation-par-mariage-conditions-2026",
  "/blog/examen-civique-40-questions-80-pourcent",
  "/blog/carte-resident-france-droits-2026",
  "/blog/carte-sejour-pluriannuelle-conditions-2026",
  "/blog/symboles-france-drapeau-marseillaise",
  "/blog/droits-devoirs-citoyens-francais",
  "/blog/parcours-integration-cir-2026",
  // Silo pages
  "/histoire-france",
  "/valeurs-republique", 
  "/droits-devoirs",
  "/institutions-francaises",
  "/vivre-france",
  // Training pages (exam levels)
  "/entrainement-csp",
  "/entrainement-cr",
  "/entrainement-naturalisation",
  // Admin routes (hidden)
  "/gestion-qcmcivique-admin",
  "/gestion-qcmcivique-admin/payments",
  "/gestion-qcmcivique-admin/users",
  "/gestion-qcmcivique-admin/messaging",
  "/gestion-qcmcivique-admin/reconciliation",
  "/gestion-qcmcivique-admin/settings",
  "/gestion-qcmcivique-admin/data-export",
] as const;

export type ValidRoute = typeof VALID_ROUTES[number];

/**
 * Check if a path is a valid internal route
 */
export function isValidRoute(path: string): boolean {
  // Normalize path (remove trailing slash, handle hash/query)
  const normalizedPath = path.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  return VALID_ROUTES.includes(normalizedPath as ValidRoute);
}

/**
 * Check if a link is an external link
 */
export function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || 
         href.startsWith('https://') || 
         href.startsWith('mailto:') ||
         href.startsWith('tel:');
}

/**
 * Validate a link and return validation result
 */
export function validateLink(href: string): { valid: boolean; reason?: string } {
  if (!href) {
    return { valid: false, reason: "Empty href" };
  }

  if (isExternalLink(href)) {
    return { valid: true }; // External links are valid
  }

  if (!href.startsWith('/')) {
    return { valid: false, reason: "Internal link should start with /" };
  }

  if (!isValidRoute(href)) {
    return { valid: false, reason: `Route "${href}" not found in VALID_ROUTES` };
  }

  return { valid: true };
}

/**
 * Validate all links in HTML content (useful for index.html skeleton)
 */
export function validateHtmlLinks(html: string): Array<{ href: string; valid: boolean; reason?: string }> {
  const linkRegex = /href=["']([^"']+)["']/g;
  const results: Array<{ href: string; valid: boolean; reason?: string }> = [];
  
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const validation = validateLink(href);
    results.push({ href, ...validation });
  }

  return results;
}

/**
 * Get all invalid links from HTML content
 */
export function getInvalidLinks(html: string): string[] {
  return validateHtmlLinks(html)
    .filter(result => !result.valid)
    .map(result => result.href);
}

/**
 * Development-only: Log link validation warnings
 */
export function logLinkValidation(): void {
  if (process.env.NODE_ENV === "development") {
    // Get all anchor elements on the page
    const links = document.querySelectorAll('a[href]');
    const invalidLinks: string[] = [];

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const validation = validateLink(href);
        if (!validation.valid) {
          invalidLinks.push(`${href} - ${validation.reason}`);
        }
      }
    });

    if (invalidLinks.length > 0) {
      console.warn(
        '%c🔗 Invalid links detected:',
        'color: orange; font-weight: bold;',
        '\n' + invalidLinks.join('\n')
      );
    } else {
      console.log(
        '%c✅ All links are valid',
        'color: green; font-weight: bold;'
      );
    }
  }
}
