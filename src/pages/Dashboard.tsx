import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Users, ShoppingBag, Leaf, DollarSign, TrendingUp, AlertTriangle, Store } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { AuthController } from '../controllers/authController';

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
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [notifications] = useState([
    { id: 1, type: 'alert', message: 'Pest outbreak detected in Sector 7', priority: 'high' },
    { id: 2, type: 'request', message: '3 loan applications pending approval', priority: 'medium' },
    { id: 3, type: 'vendor', message: 'New organic fertilizer vendor registered', priority: 'low' }
  ]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.warn("No user session found. Redirecting to login...");
        navigate("/login"); // 🔒 Redirect if not logged in
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await AuthController.logout()
    navigate('/login')
  };
  

  if (!user) return <p className="text-center mt-20">Loading user...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-6 py-3">
            <Link to="/" className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
              <Leaf className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-bold">
                Terra<span className="text-green-600">Sync</span>
              </h1>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {user.user_metadata.role} Dashboard
              </h2>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.user_metadata.name} ({user.email})
                </span>
                <Badge variant="outline">Region: {user.user_metadata.region}</Badge>
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
                <p className="text-sm font-medium">
                  {user.user_metadata.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Role: {user.user_metadata.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-6 py-4">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview"><TrendingUp className="h-4 w-4" /> Overview</TabsTrigger>
            <TabsTrigger value="farmers"><Users className="h-4 w-4" /> Farmers</TabsTrigger>
            <TabsTrigger value="vendors"><ShoppingBag className="h-4 w-4" /> Vendors</TabsTrigger>
            <TabsTrigger value="erp"><AlertTriangle className="h-4 w-4" /> ERP</TabsTrigger>
            <TabsTrigger value="carbon"><Leaf className="h-4 w-4" /> Carbon</TabsTrigger>
            <TabsTrigger value="finance"><DollarSign className="h-4 w-4" /> Finance</TabsTrigger>
            <TabsTrigger value="market"><Store className="h-4 w-4" /> Market</TabsTrigger>
            <TabsTrigger value="admin"><Users className="h-4 w-4" /> Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <KPISummary />
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
