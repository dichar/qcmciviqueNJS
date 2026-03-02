import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExamCenter } from './types';

// Custom marker icon (French blue)
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="#0055A4"/>
        <circle cx="16" cy="16" r="8" fill="white"/>
      </svg>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
};

interface ExamCentersMapProps {
  centers: ExamCenter[];
  filteredCenters: ExamCenter[];
  selectedCenter: ExamCenter | null;
  onCenterSelect: (center: ExamCenter | null) => void;
}

const ExamCentersMap = ({ 
  centers, 
  filteredCenters, 
  selectedCenter, 
  onCenterSelect 
}: ExamCentersMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Create map centered on France
    mapRef.current = L.map(containerRef.current, {
      center: [46.603354, 2.5],
      zoom: 6,
      scrollWheelZoom: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when filtered centers change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const customIcon = createCustomIcon();

    // Add new markers
    filteredCenters.forEach((center) => {
      const marker = L.marker([center.latitude, center.longitude], {
        icon: customIcon,
      });

      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #0055A4;">
            ${center.nom}
          </h3>
          <p style="margin: 0 0 12px 0; font-size: 12px; color: #666; line-height: 1.4;">
            ${center.adresse}
          </p>
          <div style="display: flex; gap: 8px;">
            <a href="${center.url_contact}" target="_blank" rel="noopener noreferrer"
               style="flex: 1; padding: 8px 12px; background: #0055A4; color: white; text-decoration: none; 
                      border-radius: 6px; font-size: 12px; text-align: center; font-weight: 500;">
              Contacter
            </a>
            <a href="${center.url_inscription}" target="_blank" rel="noopener noreferrer"
               style="flex: 1; padding: 8px 12px; background: #EF4135; color: white; text-decoration: none; 
                      border-radius: 6px; font-size: 12px; text-align: center; font-weight: 500;">
              S'inscrire
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup',
      });

      marker.on('click', () => {
        onCenterSelect(center);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });

    // Fit bounds if there are filtered centers
    if (filteredCenters.length > 0 && filteredCenters.length < centers.length) {
      const bounds = L.latLngBounds(
        filteredCenters.map(c => [c.latitude, c.longitude] as L.LatLngTuple)
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [filteredCenters, centers.length, onCenterSelect]);

  // Pan to selected center
  useEffect(() => {
    if (!mapRef.current || !selectedCenter) return;

    mapRef.current.setView([selectedCenter.latitude, selectedCenter.longitude], 14, {
      animate: true,
    });

    // Open popup for the selected center
    const marker = markersRef.current.find((_, idx) => 
      filteredCenters[idx]?.nom === selectedCenter.nom && 
      filteredCenters[idx]?.adresse === selectedCenter.adresse
    );
    if (marker) {
      marker.openPopup();
    }
  }, [selectedCenter, filteredCenters]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden border border-border z-0"
      style={{ position: 'relative' }}
    />
  );
};

export default ExamCentersMap;
