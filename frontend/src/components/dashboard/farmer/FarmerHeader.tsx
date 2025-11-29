
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, MapPin, Sprout } from 'lucide-react';

const FarmerHeader = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-foreground">TerraSync Farmer Portal</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Juan Dela Cruz</span>
                  <MapPin className="h-4 w-4 ml-2" />
                  <span>Bukidnon, Mindanao</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Current: Wet Season 2024
              </Badge>
              <Badge variant="secondary">Maize Crop</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  5
                </Badge>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/dashboard'}
              >
                Switch to Co-op View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FarmerHeader;
