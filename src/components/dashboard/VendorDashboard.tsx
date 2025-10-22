
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Package, ShoppingCart, Truck, DollarSign, BarChart3, Users, Settings, ArrowLeftRight } from 'lucide-react';
import VendorHeader from './vendor/VendorHeader';
import VendorERPSummary from './vendor/VendorERPSummary';
import VendorInventory from './vendor/VendorInventory';
import VendorPurchaseOrders from './vendor/VendorPurchaseOrders';
import VendorLogistics from './vendor/VendorLogistics';
import VendorPayments from './vendor/VendorPayments';
import VendorAnalytics from './vendor/VendorAnalytics';
import VendorFarmerSync from './vendor/VendorFarmerSync';
import TradeModal from '../trade/TradeModal';
import TradingTab from '../trade/TradingTab';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <VendorHeader />
        <Button
          onClick={() => setTradeModalOpen(true)}
          className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white shadow-lg"
          size="sm"
        >
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Trade
        </Button>
      </div>
      
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Logistics
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="sync" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Farmer Sync
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              Trading
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <VendorERPSummary />
              
              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest purchase orders from cooperatives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">PO-2024-001</p>
                          <p className="text-sm text-muted-foreground">Green Valley Co-op • Rice Seeds</p>
                        </div>
                        <Badge variant="default">New</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">PO-2024-002</p>
                          <p className="text-sm text-muted-foreground">Mountain View Farm • Fertilizer NPK</p>
                        </div>
                        <Badge variant="secondary">Processing</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Low Stock Alerts</CardTitle>
                    <CardDescription>Items requiring immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Organic Fertilizer 25kg</p>
                          <p className="text-sm text-muted-foreground">Only 5 bags remaining</p>
                        </div>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Corn Seeds Premium</p>
                          <p className="text-sm text-muted-foreground">12 kg left</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800">Low</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <VendorInventory />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <VendorPurchaseOrders />
          </TabsContent>

          <TabsContent value="logistics" className="mt-6">
            <VendorLogistics />
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <VendorPayments />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <VendorAnalytics />
          </TabsContent>

          <TabsContent value="sync" className="mt-6">
            <VendorFarmerSync />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your vendor account and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" size="sm">Edit Profile</Button>
                  <Button variant="outline" size="sm">User Management</Button>
                  <Button variant="outline" size="sm">Activity Logs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="mt-6">
            <TradingTab userType="vendor" onOpenTradeModal={() => setTradeModalOpen(true)} />
          </TabsContent>
        </Tabs>
      </div>

      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        userType="vendor"
      />
    </div>
  );
};

export default VendorDashboard;
