
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Users, ShoppingBag, Leaf, DollarSign, TrendingUp, AlertTriangle, Store } from 'lucide-react';
import KPISummary from '@/components/dashboard/KPISummary';
import FarmersPanel from '@/components/dashboard/FarmersPanel';
import VendorMarketplace from '@/components/dashboard/VendorMarketplace';
import ERPLayer from '@/components/dashboard/ERPLayer';
import CarbonDashboard from '@/components/dashboard/CarbonDashboard';
import FinanceDashboard from '@/components/dashboard/FinanceDashboard';
import AdminPanel from '@/components/dashboard/AdminPanel';
import TradingPlatform from '@/components/dashboard/TradingPlatform';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [notifications] = useState([
    { id: 1, type: 'alert', message: 'Pest outbreak detected in Sector 7', priority: 'high' },
    { id: 2, type: 'request', message: '3 loan applications pending approval', priority: 'medium' },
    { id: 3, type: 'vendor', message: 'New organic fertilizer vendor registered', priority: 'low' }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">TerraSync Co-op Manager</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-muted-foreground">Mindanao Valley Co-operative</span>
                <Badge variant="outline">Season: Wet 2024</Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.href = '/vendor-dashboard'}
                  className="ml-4"
                >
                  Switch to Vendor View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.href = '/farmer-dashboard'}
                >
                  Switch to Farmer View
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Manager: Ana Santos</p>
                <p className="text-xs text-muted-foreground">Region: Bukidnon</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-4">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="farmers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Farmers
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Vendors
            </TabsTrigger>
            <TabsTrigger value="erp" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              ERP
            </TabsTrigger>
            <TabsTrigger value="carbon" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Carbon
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Market
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <KPISummary />
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from farmers and vendors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            notification.priority === 'high' ? 'bg-destructive' :
                            notification.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`} />
                          <span className="text-sm">{notification.message}</span>
                        </div>
                        <Badge variant={notification.priority === 'high' ? 'destructive' : 'secondary'}>
                          {notification.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="farmers" className="mt-6">
            <FarmersPanel />
          </TabsContent>

          <TabsContent value="vendors" className="mt-6">
            <VendorMarketplace />
          </TabsContent>

          <TabsContent value="erp" className="mt-6">
            <ERPLayer />
          </TabsContent>

          <TabsContent value="carbon" className="mt-6">
            <CarbonDashboard />
          </TabsContent>

          <TabsContent value="finance" className="mt-6">
            <FinanceDashboard />
          </TabsContent>

          <TabsContent value="market" className="mt-6">
            <TradingPlatform />
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <AdminPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
