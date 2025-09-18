import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  MapPin,
  Star,
  Clock,
  Camera
} from "lucide-react";

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

interface AttractionsSidebarProps {
  attractions: Attraction[];
  isOpen: boolean;
  onToggle: () => void;
  selectedAttraction: string | null;
  onSelectAttraction: (id: string | null) => void;
}

const AttractionsSidebar = ({ 
  attractions, 
  isOpen, 
  onToggle, 
  selectedAttraction, 
  onSelectAttraction 
}: AttractionsSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const categories = [
    { id: "landmark", label: "Landmarks", icon: MapPin },
    { id: "museum", label: "Museums", icon: Camera },
    { id: "restaurant", label: "Restaurants", icon: Clock },
    { id: "park", label: "Parks", icon: MapPin },
  ];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(attraction.category);
    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (categoryId: string) => {
    setSelectedFilters(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className={`fixed right-0 top-0 h-full bg-card/95 backdrop-blur-sm border-l border-border/50 transition-smooth z-30 ${
      isOpen ? 'w-80' : 'w-12'
    }`}>
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className="absolute left-2 top-4 z-40 w-8 h-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary"
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Nearby Attractions</h2>
            <p className="text-sm text-muted-foreground">Discover amazing places along your route</p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary transition-smooth"
            />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const isSelected = selectedFilters.includes(category.id);
                return (
                  <Badge
                    key={category.id}
                    variant={isSelected ? "default" : "secondary"}
                    className={`cursor-pointer transition-smooth ${
                      isSelected 
                        ? 'bg-gradient-primary hover:shadow-glow' 
                        : 'hover:bg-secondary/80'
                    }`}
                    onClick={() => toggleFilter(category.id)}
                  >
                    <category.icon className="h-3 w-3 mr-1" />
                    {category.label}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Attractions List */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {filteredAttractions.map(attraction => (
              <Card 
                key={attraction.id}
                className={`cursor-pointer transition-smooth hover:shadow-medium ${
                  selectedAttraction === attraction.id 
                    ? 'border-primary shadow-glow bg-gradient-card' 
                    : 'border-border/50 hover:border-primary/50'
                }`}
                onClick={() => onSelectAttraction(
                  selectedAttraction === attraction.id ? null : attraction.id
                )}
              >
                <CardContent className="p-4">
                  <div className="relative mb-3 rounded-lg overflow-hidden">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJoc2woMjAwLCA4NSUsIDQ1JSkkIiBvcGFjaXR5PSIwLjEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iaHNsKDIxNSwgMjUlLCAyNyUpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkF0dHJhY3Rpb24gSW1hZ2U8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    <Badge className="absolute top-2 right-2 bg-card/90 text-foreground border border-border/50">
                      {attraction.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2">{attraction.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {attraction.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="text-sm font-medium">{attraction.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">• {attraction.distance}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-primary hover:bg-primary/10"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredAttractions.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No attractions found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionsSidebar;