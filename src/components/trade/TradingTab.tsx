import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, MapPin, Calendar, DollarSign, Filter, Star } from 'lucide-react';

interface TradingTabProps {
  userType: 'farmer' | 'vendor';
  onOpenTradeModal: () => void;
}

const TradingTab = ({ userType, onOpenTradeModal }: TradingTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const myListings = [
    {
      id: 1,
      title: 'Organic Corn - 2.5 tons',
      type: 'produce',
      status: 'verified',
      price: '$1,250',
      location: 'Green Valley Farm',
      posted: '2 days ago',
      interested: 3,
      description: 'Fresh organic corn, harvested last week. Non-GMO certified.'
    },
    {
      id: 2,
      title: 'Premium Tomato Seeds - 5kg',
      type: 'seeds',
      status: 'pending',
      price: 'Trade for compost',
      location: 'Downtown Pickup',
      posted: '1 day ago',
      interested: 1,
      description: 'High-yield tomato seeds, perfect for organic farming.'
    }
  ];

  const availableListings = [
    {
      id: 3,
      owner: 'AgriSupply Pro',
      ownerType: 'vendor',
      title: 'Organic Fertilizer NPK - 50 bags',
      type: 'organic-inputs',
      status: 'verified',
      price: '$75/bag',
      location: 'Central Warehouse',
      posted: '3 hours ago',
      rating: 4.8,
      eoqMatch: true,
      bulkEligible: true,
      description: 'Premium organic NPK fertilizer, suitable for all crop types.'
    },
    {
      id: 4,
      owner: 'Maria Santos',
      ownerType: 'farmer',
      title: 'Fresh Lettuce - 500kg',
      type: 'produce',
      status: 'verified',
      price: '$3.50/kg',
      location: 'Riverside Farm',
      posted: '5 hours ago',
      rating: 4.9,
      harvestWindow: 'Available for 1 week',
      description: 'Crisp organic lettuce, perfect for restaurants and markets.'
    },
    {
      id: 5,
      owner: 'John Peterson',
      ownerType: 'farmer',
      title: 'Compost - 10 cubic meters',
      type: 'compost',
      status: 'verified',
      price: 'Trade for seeds',
      location: 'Mountain View Farm',
      posted: '1 day ago',
      rating: 4.7,
      description: 'Rich organic compost made from farm waste and cover crops.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">✅ Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">❌ Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      'produce': '🌽 Produce',
      'seeds': '🌱 Seeds',
      'compost': '♻️ Compost',
      'organic-inputs': '🧪 Organic Inputs',
      'packaging': '📦 Packaging'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  return (
    <div className="space-y-6">
      {/* Trading Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Trading Marketplace</h2>
          <p className="text-muted-foreground">Connect with farmers and vendors for sustainable trading</p>
        </div>
        <Button onClick={onOpenTradeModal} className="bg-green-600 hover:bg-green-700">
          ⇄ New Trade Offer
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search for items, locations, or traders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="produce">🌽 Produce</SelectItem>
                <SelectItem value="seeds">🌱 Seeds</SelectItem>
                <SelectItem value="compost">♻️ Compost</SelectItem>
                <SelectItem value="organic-inputs">🧪 Organic Inputs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Marketplace</TabsTrigger>
          <TabsTrigger value="mylistings">My Listings ({myListings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid gap-4">
            {availableListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{listing.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>by {listing.owner}</span>
                            <Badge variant="outline">{listing.ownerType}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{listing.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(listing.status)}
                          <Badge variant="secondary">{getTypeBadge(listing.type)}</Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{listing.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{listing.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{listing.posted}</span>
                        </div>
                      </div>

                      {/* Special badges */}
                      <div className="flex gap-2">
                        {listing.eoqMatch && (
                          <Badge className="bg-blue-100 text-blue-800">🎯 EOQ Match</Badge>
                        )}
                        {listing.bulkEligible && (
                          <Badge className="bg-purple-100 text-purple-800">📦 Bulk Eligible</Badge>
                        )}
                        {listing.harvestWindow && (
                          <Badge className="bg-orange-100 text-orange-800">⏰ {listing.harvestWindow}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-32">
                      <Button size="sm">Contact Trader</Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mylistings" className="space-y-4">
          <div className="grid gap-4">
            {myListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{listing.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{listing.interested} interested traders</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(listing.status)}
                          <Badge variant="secondary">{getTypeBadge(listing.type)}</Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{listing.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{listing.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Posted {listing.posted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-32">
                      <Button variant="outline" size="sm">Edit Listing</Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Messages ({listing.interested})
                      </Button>
                      {listing.status === 'pending' && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-center">
                          Awaiting Co-op Approval
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingTab;