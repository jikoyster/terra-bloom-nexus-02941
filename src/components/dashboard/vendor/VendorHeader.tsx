
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, DollarSign } from 'lucide-react';

const VendorHeader = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AgriSupplysd Pro</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-muted-foreground">Vendor ID: VS-001</span>
              <Badge variant="outline">Mindanao Valley Co-op</Badge>
              <Badge variant="outline">Northern Farmers Alliance</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div className="text-right">
                <p className="text-sm font-medium text-green-700">₱45,280.50</p>
                <p className="text-xs text-green-600">Available Balance</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium">Contact: Juan Martinez</p>
              <p className="text-xs text-muted-foreground">+63 912 345 6789</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
