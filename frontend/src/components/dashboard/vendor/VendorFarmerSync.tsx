
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Star, AlertTriangle, Package, Heart } from 'lucide-react';

const VendorFarmerSync = () => {
  const eoqMatches = [
    {
      farmer: 'Maria Santos',
      coop: 'Green Valley Co-op',
      product: 'Premium Rice Seeds',
      quantity: '50 kg',
      match: '95%',
      status: 'High Priority',
      lastOrder: '2 weeks ago'
    },
    {
      farmer: 'Carlos Rivera',
      coop: 'Mountain View Farm',
      product: 'NPK Fertilizer 14-14-14',
      quantity: '25 bags',
      match: '87%',
      status: 'Good Match',
      lastOrder: '1 month ago'
    },
    {
      farmer: 'Ana Delgado',
      coop: 'Northern Alliance',
      product: 'Organic Fertilizer',
      quantity: '15 bags',
      match: '78%',
      status: 'Potential',
      lastOrder: 'New customer'
    }
  ];

  const farmerFeedback = [
    {
      farmer: 'Maria Santos',
      rating: 5,
      comment: 'Excellent quality seeds, fast delivery. Very satisfied with the service.',
      product: 'Premium Rice Seeds',
      date: '2024-01-15'
    },
    {
      farmer: 'Roberto Cruz',
      rating: 4,
      comment: 'Good fertilizer quality, but delivery was slightly delayed.',
      product: 'NPK Fertilizer',
      date: '2024-01-12'
    },
    {
      farmer: 'Elena Ramirez',
      rating: 5,
      comment: 'Amazing organic fertilizer! My crops are healthier than ever.',
      product: 'Organic Fertilizer',
      date: '2024-01-10'
    }
  ];

  const getMatchBadge = (status: string) => {
    switch (status) {
      case 'High Priority':
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case 'Good Match':
        return <Badge className="bg-green-100 text-green-800">Good Match</Badge>;
      case 'Potential':
        return <Badge className="bg-blue-100 text-blue-800">Potential</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Farmer Sync Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Farmer Sync & EOQ Matching</h2>
          <p className="text-muted-foreground">Connect with farmers and optimize supply chain efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Suggest Bundles</Button>
          <Button>Create Promotion</Button>
        </div>
      </div>

      {/* EOQ Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Active EOQ Matches</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div>
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-muted-foreground">Overlapping Demand</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Registered Farmers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm text-muted-foreground">Avg Customer Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EOQ Matches */}
        <Card>
          <CardHeader>
            <CardTitle>EOQ Demand Matches</CardTitle>
            <CardDescription>Farmers whose needs align with your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eoqMatches.map((match, index) => (
                <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{match.farmer}</div>
                    <div className="text-sm text-muted-foreground">{match.coop}</div>
                    <div className="text-sm mt-1">
                      <span className="font-medium">{match.product}</span> • {match.quantity}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last order: {match.lastOrder}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600 mb-1">
                      {match.match} match
                    </div>
                    {getMatchBadge(match.status)}
                    <Button size="sm" className="mt-2 w-full">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farmer Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Feedback</CardTitle>
            <CardDescription>Recent reviews and ratings from farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmerFeedback.map((feedback, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{feedback.farmer}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(feedback.rating)}
                        <span className="text-sm text-muted-foreground ml-2">
                          {feedback.date}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feedback.product}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{feedback.comment}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bundle Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Product Bundles</CardTitle>
          <CardDescription>Optimize sales with complementary product combinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">Rice Farming Starter Kit</div>
              <div className="text-sm text-muted-foreground mb-3">
                • Premium Rice Seeds (25kg)<br/>
                • NPK Fertilizer (10 bags)<br/>
                • Organic Pesticide (2L)
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-green-600">₱8,500</span>
                  <span className="text-sm text-muted-foreground ml-2 line-through">₱9,200</span>
                </div>
                <Button size="sm">Create Bundle</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">Organic Growth Package</div>
              <div className="text-sm text-muted-foreground mb-3">
                • Organic Fertilizer (20 bags)<br/>
                • Bio-pesticide (3L)<br/>
                • Soil Conditioner (5 bags)
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-green-600">₱12,800</span>
                  <span className="text-sm text-muted-foreground ml-2 line-through">₱14,100</span>
                </div>
                <Button size="sm">Create Bundle</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorFarmerSync;
