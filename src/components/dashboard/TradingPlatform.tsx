import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Truck, 
  FileText,
  Filter,
  Search,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Plus
} from 'lucide-react';

const TradingPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for inventory marketplace
  const inventoryItems = [
    {
      id: 1,
      name: 'Organic Corn Seeds',
      category: 'Seeds',
      vendor: 'Green Valley Farms',
      pricePerKg: 125,
      stock: 500,
      rating: 4.8,
      leadTime: '3-5 days',
      location: 'Bukidnon',
      eqoMatched: true,
      bulkEligible: true,
      sustainable: true
    },
    {
      id: 2,
      name: 'Compost Fertilizer',
      category: 'Fertilizer',
      vendor: 'EcoNutrients Co.',
      pricePerKg: 85,
      stock: 200,
      rating: 4.6,
      leadTime: '2-3 days',
      location: 'Cagayan de Oro',
      eqoMatched: false,
      bulkEligible: true,
      sustainable: true
    },
    {
      id: 3,
      name: 'Organic Pest Spray',
      category: 'Pesticide',
      vendor: 'Natural Solutions',
      pricePerKg: 95,
      stock: 50,
      rating: 4.9,
      leadTime: '1-2 days',
      location: 'Malaybalay',
      eqoMatched: true,
      bulkEligible: false,
      sustainable: true
    }
  ];

  // Mock data for farmer produce
  const farmerProduce = [
    {
      id: 1,
      farmer: 'Maria Santos',
      crop: 'Organic Lettuce',
      weight: 150,
      harvestWindow: '2-3 weeks',
      location: 'Valencia',
      quality: 'Premium',
      pricePerKg: 45,
      buyers: 2,
      matchScore: 95
    },
    {
      id: 2,
      farmer: 'Juan Dela Cruz',
      crop: 'Sweet Corn',
      weight: 800,
      harvestWindow: '1 week',
      location: 'Manolo Fortich',
      quality: 'Grade A',
      pricePerKg: 38,
      buyers: 4,
      matchScore: 87
    },
    {
      id: 3,
      farmer: 'Rosa Garcia',
      crop: 'Organic Tomatoes',
      weight: 300,
      harvestWindow: '5-7 days',
      location: 'Impasugong',
      quality: 'Premium',
      pricePerKg: 52,
      buyers: 1,
      matchScore: 92
    }
  ];

  // Mock data for recent orders
  const recentOrders = [
    {
      id: 1,
      type: 'input',
      item: 'Organic Seeds',
      buyer: 'Maria Santos',
      seller: 'Green Valley Farms',
      amount: '₱12,500',
      status: 'in_transit',
      eta: '2 days'
    },
    {
      id: 2,
      type: 'produce',
      item: 'Sweet Corn',
      buyer: 'City Market Co.',
      seller: 'Juan Dela Cruz',
      amount: '₱30,400',
      status: 'delivered',
      eta: 'Completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_transit':
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'ordered':
        return <Badge className="bg-yellow-100 text-yellow-800">Ordered</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trading Platform</h2>
          <p className="text-muted-foreground">Connect vendors and farmers in the TerraSync marketplace</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Listing
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="seeds">Seeds</SelectItem>
            <SelectItem value="fertilizer">Fertilizer</SelectItem>
            <SelectItem value="pesticide">Pesticides</SelectItem>
            <SelectItem value="produce">Produce</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="marketplace">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="produce">
            <Package className="h-4 w-4 mr-2" />
            Farmer Produce
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Truck className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="finance">
            <DollarSign className="h-4 w-4 mr-2" />
            Finance
          </TabsTrigger>
        </TabsList>

        {/* Inventory Marketplace */}
        <TabsContent value="marketplace">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inventoryItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {item.vendor} • {item.location}
                      </CardDescription>
                    </div>
                    {item.sustainable && <Leaf className="h-4 w-4 text-green-500" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price/kg:</span>
                      <span className="font-semibold">₱{item.pricePerKg}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className={item.stock < 100 ? 'text-orange-600' : 'text-green-600'}>
                        {item.stock} kg
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span>{item.leadTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {item.eqoMatched && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">EOQ Matched</Badge>
                      )}
                      {item.bulkEligible && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">Bulk Eligible</Badge>
                      )}
                      {item.stock < 100 && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">Stock Low</Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Order
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Farmer Produce Market */}
        <TabsContent value="produce">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {farmerProduce.map((produce) => (
              <Card key={produce.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{produce.crop}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    {produce.farmer} • {produce.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price/kg:</span>
                      <span className="font-semibold">₱{produce.pricePerKg}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="text-green-600">{produce.weight} kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Harvest:</span>
                      <span>{produce.harvestWindow}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quality:</span>
                      <Badge variant="outline">{produce.quality}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Match:</span>
                        <span className="text-sm font-medium text-green-600">{produce.matchScore}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{produce.buyers} buyers</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Buy
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Orders & Logistics */}
        <TabsContent value="orders">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track your purchases and sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {order.type === 'input' ? (
                            <Package className="h-5 w-5 text-primary" />
                          ) : (
                            <Leaf className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{order.item}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.buyer} ← {order.seller}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{order.amount}</p>
                          <p className="text-sm text-muted-foreground">{order.eta}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Most Ordered Input</span>
                    <span className="font-semibold">Organic Seeds</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Top Selling Produce</span>
                    <span className="font-semibold">Sweet Corn</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Active Traders</span>
                    <span className="font-semibold">127</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Avg. Delivery Time</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Corn Seeds</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">+5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organic Fertilizer</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                      <span className="text-sm font-medium">-2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sweet Corn</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">+8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Finance */}
        <TabsContent value="finance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Financing Options</CardTitle>
                <CardDescription>Buy now, pay later options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Input Financing</h4>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Purchase seeds and fertilizers with flexible payment terms
                    </p>
                    <Button size="sm" className="w-full">Apply Now</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Harvest Advance</h4>
                      <Badge className="bg-blue-100 text-blue-800">Pre-order</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get advance payment for future harvest commitments
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Learn More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium">Seeds Purchase</p>
                      <p className="text-sm text-muted-foreground">Green Valley Farms</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱12,500</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium">Corn Sale</p>
                      <p className="text-sm text-muted-foreground">City Market Co.</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱30,400</p>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingPlatform;