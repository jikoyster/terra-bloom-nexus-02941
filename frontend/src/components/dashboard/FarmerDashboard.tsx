
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Leaf, BarChart3, Cog, MapPin, Bug, TrendingUp, TreePine, CreditCard, BookOpen, Wrench, ArrowLeftRight } from 'lucide-react';
import FarmerHeader from './farmer/FarmerHeader';
import FarmerKPISnapshot from './farmer/FarmerKPISnapshot';
import FarmerERPManagement from './farmer/FarmerERPManagement';
import FarmerVRTEngine from './farmer/FarmerVRTEngine';
import FarmerPestDetection from './farmer/FarmerPestDetection';
import FarmerYieldForecast from './farmer/FarmerYieldForecast';
import FarmerCarbonTracker from './farmer/FarmerCarbonTracker';
import FarmerFinancing from './farmer/FarmerFinancing';
import FarmerJournal from './farmer/FarmerJournal';
import FarmerWorkflowTools from './farmer/FarmerWorkflowTools';
import TradeModal from '../trade/TradeModal';
import TradingTab from '../trade/TradingTab';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <FarmerHeader />
        <Button
          onClick={() => setTradeModalOpen(true)}
          className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white shadow-lg"
          size="sm"
        >
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Trade
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs lg:text-sm">
              <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="erp" className="flex items-center gap-1 text-xs lg:text-sm">
              <Cog className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">ERP</span>
            </TabsTrigger>
            <TabsTrigger value="vrt" className="flex items-center gap-1 text-xs lg:text-sm">
              <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">VRT</span>
            </TabsTrigger>
            <TabsTrigger value="pest" className="flex items-center gap-1 text-xs lg:text-sm">
              <Bug className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Pest</span>
            </TabsTrigger>
            <TabsTrigger value="yield" className="flex items-center gap-1 text-xs lg:text-sm">
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Yield</span>
            </TabsTrigger>
            <TabsTrigger value="carbon" className="flex items-center gap-1 text-xs lg:text-sm">
              <TreePine className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Carbon</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-1 text-xs lg:text-sm">
              <CreditCard className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Finance</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-1 text-xs lg:text-sm">
              <BookOpen className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-1 text-xs lg:text-sm">
              <Wrench className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Tools</span>
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-1 text-xs lg:text-sm">
              <ArrowLeftRight className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">Trading</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <FarmerKPISnapshot />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FarmerWorkflowTools />
              <FarmerJournal preview={true} />
            </div>
          </TabsContent>

          <TabsContent value="erp">
            <FarmerERPManagement />
          </TabsContent>

          <TabsContent value="vrt">
            <FarmerVRTEngine />
          </TabsContent>

          <TabsContent value="pest">
            <FarmerPestDetection />
          </TabsContent>

          <TabsContent value="yield">
            <FarmerYieldForecast />
          </TabsContent>

          <TabsContent value="carbon">
            <FarmerCarbonTracker />
          </TabsContent>

          <TabsContent value="finance">
            <FarmerFinancing />
          </TabsContent>

          <TabsContent value="journal">
            <FarmerJournal preview={false} />
          </TabsContent>

          <TabsContent value="workflow">
            <FarmerWorkflowTools />
          </TabsContent>

          <TabsContent value="trading">
            <TradingTab userType="farmer" onOpenTradeModal={() => setTradeModalOpen(true)} />
          </TabsContent>
        </Tabs>
      </div>

      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        userType="farmer"
      />
    </div>
  );
};

export default FarmerDashboard;
