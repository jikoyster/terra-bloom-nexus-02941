
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, TrendingDown, AlertTriangle, Plus, Search, ShoppingCart, CheckCircle } from 'lucide-react';

const FarmerERPManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const inventory = [
    { sku: 'SEED-MAIZE-001', name: 'Hybrid Maize Seeds', category: 'Seeds', quantity: 25, unit: 'kg', threshold: 10, status: 'good', expiry: '2024-12-15' },
    { sku: 'FERT-ORG-002', name: 'Organic Compost', category: 'Fertilizer', quantity: 8, unit: 'bags', threshold: 15, status: 'low', expiry: null },
    { sku: 'PEST-BIO-003', name: 'Neem Oil Extract', category: 'Pest Control', quantity: 3, unit: 'liters', threshold: 5, status: 'critical', expiry: '2024-10-30' },
    { sku: 'TOOL-HOE-004', name: 'Hand Hoe', category: 'Tools', quantity: 2, unit: 'pieces', threshold: 1, status: 'good', expiry: null }
  ];

  const recentPurchases = [
    { date: '2024-07-10', item: 'Organic Compost', quantity: '20 bags', cost: '₱3,200', vendor: 'GreenGrow Co-op' },
    { date: '2024-07-05', item: 'Hybrid Maize Seeds', quantity: '50 kg', cost: '₱8,500', vendor: 'SeedTech Mindanao' },
    { date: '2024-06-28', item: 'Bio Pesticide', quantity: '5 liters', cost: '₱1,800', vendor: 'EcoFarm Supplies' }
  ];

  const getStatusBadge = (status: string, quantity: number, threshold: number) => {
    if (status === 'critical' || quantity < threshold * 0.5) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (status === 'low' || quantity < threshold) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">In Stock</Badge>;
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            ERP & EOQ Management
          </CardTitle>
          <CardDescription>Track inputs, manage inventory, and sync with co-op vendors</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="purchases">Purchase History</TabsTrigger>
          <TabsTrigger value="orders">Auto Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredInventory.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        {getStatusBadge(item.status, item.quantity, item.threshold)}
                      </div>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku} | Category: {item.category}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>Stock: {item.quantity} {item.unit}</span>
                        <span>Threshold: {item.threshold} {item.unit}</span>
                        {item.expiry && (
                          <span className="text-amber-600">Expires: {item.expiry}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Update</Button>
                      {item.quantity < item.threshold && (
                        <Button size="sm" className="gap-1">
                          <ShoppingCart className="h-3 w-3" />
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Purchases</CardTitle>
              <CardDescription>Track your input procurement history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPurchases.map((purchase, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{purchase.item}</p>
                      <p className="text-sm text-muted-foreground">
                        {purchase.date} | {purchase.quantity} | {purchase.vendor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{purchase.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">EOQ Auto-Orders</CardTitle>
              <CardDescription>Automated ordering based on Economic Order Quantity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Pending Auto-Order</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Organic Compost order will be triggered in 3 days when stock reaches EOQ threshold
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Order Synced</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Maize seeds order synchronized with SeedTech Mindanao - Delivery scheduled for July 20
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerERPManagement;
