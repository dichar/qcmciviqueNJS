import { useState, useEffect, useRef, RefObject } from "react";

interface UseLazyLoadMapOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Custom hook for lazy loading the Leaflet map component
 * Uses Intersection Observer to detect when map container enters viewport
 * Improves Core Web Vitals (LCP) on mobile by deferring heavy map loading
 */
export function useLazyLoadMap(
  options: UseLazyLoadMapOptions = {}
): [RefObject<HTMLDivElement>, boolean] {
  const { rootMargin = "200px", threshold = 0.1 } = options;
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver not supported, load immediately
    if (!("IntersectionObserver" in window)) {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadMap(true);
            // Once loaded, stop observing
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return [containerRef as RefObject<HTMLDivElement>, shouldLoadMap];
}

export default useLazyLoadMap;
