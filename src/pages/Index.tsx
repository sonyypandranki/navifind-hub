import { useState } from "react";
import NavigationSearch from "@/components/NavigationSearch";
import MapView from "@/components/MapView";
import AttractionsSidebar from "@/components/AttractionsSidebar";
import { MapPin } from "lucide-react";

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

const Index = () => {
  const [source, setSource] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock attractions data
  const attractions: Attraction[] = [
    {
      id: "1",
      name: "Golden Gate Bridge",
      category: "landmark",
      rating: 4.8,
      distance: "0.5 km",
      image: "/api/placeholder/300/200",
      description: "Iconic suspension bridge and symbol of San Francisco",
      lat: 37.8199,
      lng: -122.4783
    },
    {
      id: "2", 
      name: "Alcatraz Island",
      category: "museum",
      rating: 4.7,
      distance: "1.2 km",
      image: "/api/placeholder/300/200", 
      description: "Former federal prison on a historic island",
      lat: 37.8267,
      lng: -122.4230
    },
    {
      id: "3",
      name: "Fisherman's Wharf",
      category: "restaurant",
      rating: 4.3,
      distance: "2.1 km",
      image: "/api/placeholder/300/200",
      description: "Famous waterfront area with dining and entertainment",
      lat: 37.8080,
      lng: -122.4177
    },
    {
      id: "4",
      name: "Lombard Street", 
      category: "landmark",
      rating: 4.5,
      distance: "3.0 km",
      image: "/api/placeholder/300/200",
      description: "The most crooked street in the world",
      lat: 37.8021,
      lng: -122.4187
    }
  ];

  const handleRouteSearch = (sourceLocation: Location, destinationLocation: Location) => {
    setSource(sourceLocation);
    setDestination(destinationLocation);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Search Panel */}
      <div className="absolute top-4 left-4 right-4 z-20 md:left-6 md:right-auto md:w-96">
        <div className="bg-card/95 backdrop-blur-sm rounded-xl shadow-strong border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Plan Your Route</h1>
          </div>
          <NavigationSearch onRouteSearch={handleRouteSearch} />
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative">
        <MapView 
          source={source}
          destination={destination}
          attractions={attractions}
          selectedAttraction={selectedAttraction}
        />
      </div>

      {/* Attractions Sidebar */}
      <AttractionsSidebar
        attractions={attractions}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedAttraction={selectedAttraction}
        onSelectAttraction={setSelectedAttraction}
      />
    </div>
  );
};

export default Index;