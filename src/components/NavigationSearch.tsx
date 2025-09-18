import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation, MapPin, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface NavigationSearchProps {
  onRouteSearch: (source: Location, destination: Location) => void;
}

const NavigationSearch = ({ onRouteSearch }: NavigationSearchProps) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const { toast } = useToast();

  // Mock locations for demonstration
  const mockLocations: Location[] = [
    { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
    { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
    { name: "New York, NY", lat: 40.7128, lng: -74.0060 },
    { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
  ];

  const handleSearch = () => {
    if (!source.trim() || !destination.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both source and destination locations.",
        variant: "destructive",
      });
      return;
    }

    // Mock location search - in real app, use Google Places API
    const sourceLocation = mockLocations.find(loc => 
      loc.name.toLowerCase().includes(source.toLowerCase())
    ) || { name: source, lat: 37.7749, lng: -122.4194 };

    const destinationLocation = mockLocations.find(loc => 
      loc.name.toLowerCase().includes(destination.toLowerCase())
    ) || { name: destination, lat: 37.8044, lng: -122.2711 };

    onRouteSearch(sourceLocation, destinationLocation);
    
    toast({
      title: "Route Found",
      description: `Navigation from ${source} to ${destination}`,
    });
  };

  const swapLocations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Enter starting location..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="pl-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary transition-smooth"
        />
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={swapLocations}
          className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary transition-smooth"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Enter destination..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="pl-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary transition-smooth"
        />
      </div>

      <Button 
        onClick={handleSearch} 
        className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
      >
        <Navigation className="h-4 w-4 mr-2" />
        Find Route & Attractions
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        * For demo purposes. Connect to Google Places API via Supabase for real autocomplete.
      </div>
    </div>
  );
};

export default NavigationSearch;