import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';

import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Users, ShoppingBag, Leaf, DollarSign, TrendingUp, AlertTriangle, Store, X, Blocks } from 'lucide-react';
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
  const [notifications, setNotifications] = useState<any[]>([]);
  const navigate = useNavigate();

  // ✅ Notification Toast State
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.warn("No user session found. Redirecting to login...");
        navigate("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);

      // ✅ Add sample notification
      setNotifications([
        { id: 1, type: 'alert', message: 'Pest outbreak detected in Sector 7', priority: 'high' },
        { id: 2, type: 'request', message: '3 loan applications pending approval', priority: 'medium' },
        { id: 3, type: 'vendor', message: 'New organic fertilizer vendor registered', priority: 'low' }
      ]);

    };

    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await AuthController.logout();
    showToast('You have been logged out successfully.', 'info');
    setTimeout(() => navigate('/login'), 1000);
  };

  // ✅ Toast function
  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide after 3 seconds
  };

  if (!user) return <p className="text-center mt-20">Loading user...</p>;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <Header />

      {/* Tabs */}
      <div className="container mx-auto px-6 py-4">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview"><TrendingUp className="h-4 w-4" /> Overview</TabsTrigger>
            <TabsTrigger value="carbon"><Leaf className="h-4 w-4" /> Farm</TabsTrigger>
            <TabsTrigger value="farmers"><Users className="h-4 w-4" /> Farmers</TabsTrigger>
            <TabsTrigger value="vendors"><ShoppingBag className="h-4 w-4" /> Vendors</TabsTrigger>
            <TabsTrigger value="coop"><Blocks className="h-4 w-4" /> Co-op</TabsTrigger>
            
            <TabsTrigger value="erp"><AlertTriangle className="h-4 w-4" /> ERP</TabsTrigger>
            
            
            <TabsTrigger value="market"><Store className="h-4 w-4" /> Market</TabsTrigger>
            <TabsTrigger value="admin"><Users className="h-4 w-4" /> Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6"><KPISummary /></TabsContent>
          <TabsContent value="farmers" className="mt-6"><FarmersPanel /></TabsContent>
          <TabsContent value="vendors" className="mt-6"><VendorMarketplace /></TabsContent>
          <TabsContent value="erp" className="mt-6"><ERPLayer /></TabsContent>
          <TabsContent value="carbon" className="mt-6"><CarbonDashboard /></TabsContent>
          <TabsContent value="coop" className="mt-6"><FinanceDashboard /></TabsContent>
          <TabsContent value="market" className="mt-6"><TradingPlatform /></TabsContent>
          <TabsContent value="admin" className="mt-6"><AdminPanel /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
