import { useEffect } from 'react';

/**
 * Hook to detect Service Worker updates and reload the page
 * This ensures users always get the latest version of the app
 */
export const useServiceWorkerUpdate = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Check for updates every 60 seconds
        const intervalId = setInterval(() => {
          registration.update();
        }, 60 * 1000);

        // Listen for new service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available, reload to activate
                console.log('New version available, reloading...');
                window.location.reload();
              }
            });
          }
        });

        return () => clearInterval(intervalId);
      });

      // Handle controller change (when skipWaiting is called)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  }, []);
};
