import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation2, Star } from "lucide-react";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface Attraction {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  image: string;
  description: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  source: Location | null;
  destination: Location | null;
  attractions: Attraction[];
  selectedAttraction: string | null;
}

const MapView = ({ source, destination, attractions, selectedAttraction }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  // Mock map implementation - in real app, use Google Maps JavaScript API
  useEffect(() => {
    if (source && destination) {
      // Center map between source and destination
      const centerLat = (source.lat + destination.lat) / 2;
      const centerLng = (source.lng + destination.lng) / 2;
      setMapCenter({ lat: centerLat, lng: centerLng });
    }
  }, [source, destination]);

  const getMarkerPosition = (lat: number, lng: number) => {
    // Simple projection for demo - in real app, use proper map projection
    const mapWidth = 800;
    const mapHeight = 600;
    const x = ((lng + 180) * mapWidth) / 360;
    const y = ((90 - lat) * mapHeight) / 180;
    return { x: x % mapWidth, y: y % mapHeight };
  };

  return (
    <div ref={mapRef} className="w-full h-full relative bg-gradient-to-br from-primary/5 to-secondary/10">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Grid pattern to simulate map */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Mock geographical features */}
        <div className="absolute top-1/4 left-1/3 w-32 h-24 bg-green-200/30 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-16 bg-blue-300/40 rounded-lg opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-amber-200/30 rounded-full opacity-50" />
      </div>

      {/* Route Line */}
      {source && destination && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d={`M 20% 30% Q 50% 50% 80% 70%`}
            stroke="url(#routeGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="0"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* Source Marker */}
      {source && (
        <div className="absolute top-[30%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-medium flex items-center justify-center animate-bounce">
              <Navigation2 className="h-3 w-3 text-white" />
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-soft whitespace-nowrap">
              {source.name}
            </div>
          </div>
        </div>
      )}

      {/* Destination Marker */}
      {destination && (
        <div className="absolute top-[70%] left-[80%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-destructive rounded-full border-2 border-white shadow-medium flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-soft whitespace-nowrap">
              {destination.name}
            </div>
          </div>
        </div>
      )}

      {/* Attraction Markers */}
      {attractions.map((attraction, index) => (
        <div 
          key={attraction.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-smooth cursor-pointer ${
            selectedAttraction === attraction.id ? 'scale-125 z-30' : 'scale-100 z-20'
          }`}
          style={{
            top: `${40 + index * 8}%`,
            left: `${30 + index * 12}%`
          }}
        >
          <div className="relative">
            <div className={`w-5 h-5 rounded-full border-2 border-white shadow-medium flex items-center justify-center ${
              selectedAttraction === attraction.id 
                ? 'bg-accent shadow-glow' 
                : 'bg-secondary hover:bg-accent'
            } transition-smooth`}>
              <Star className="h-2.5 w-2.5 text-white" />
            </div>
            {selectedAttraction === attraction.id && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm p-3 rounded-lg shadow-strong min-w-48 border border-border/50">
                <h4 className="font-semibold text-sm text-foreground">{attraction.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{attraction.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-accent fill-accent" />
                    <span className="text-xs font-medium">{attraction.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">• {attraction.distance}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 space-y-2">
        <button className="w-10 h-10 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-soft flex items-center justify-center hover:bg-card transition-smooth">
          <span className="text-lg font-bold text-foreground">+</span>
        </button>
        <button className="w-10 h-10 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-soft flex items-center justify-center hover:bg-card transition-smooth">
          <span className="text-lg font-bold text-foreground">−</span>
        </button>
      </div>

      {/* API Notice */}
      <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-soft border border-border/50">
        <p className="text-xs text-muted-foreground">
          🗺️ Demo map - Connect Google Maps API via Supabase for real mapping
        </p>
      </div>
    </div>
  );
};

export default MapView;