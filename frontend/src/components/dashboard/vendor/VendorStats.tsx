
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const VendorStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <div className="text-xs text-muted-foreground">+2 this month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Verified Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <div className="text-xs text-green-600">71% verification rate</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">EOQ Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">11</div>
          <div className="text-xs text-muted-foreground">Active this week</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.5</div>
          <div className="flex items-center text-xs text-yellow-600">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Based on farmer reviews
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorStats;
