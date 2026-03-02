/**
 * Optimized Image component with lazy loading and WebP support
 */
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // If true, load immediately (above-the-fold images)
  placeholder?: 'blur' | 'skeleton';
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'skeleton',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP source if the image is not already WebP
  const isWebP = src.endsWith('.webp');
  const webpSrc = isWebP ? src : src.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        !isLoaded && placeholder === 'skeleton' && 'img-skeleton',
        className
      )}
      style={{ width, height }}
    >
      {isInView && (
        <picture>
          {/* WebP format for modern browsers */}
          {!isWebP && <source srcSet={webpSrc} type="image/webp" />}
          
          {/* Fallback */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={() => setIsLoaded(true)}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </picture>
      )}
      
      {/* Placeholder while loading */}
      {!isLoaded && placeholder === 'skeleton' && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
