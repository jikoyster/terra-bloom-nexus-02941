import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./components/dashboard/VendorDashboard";
import FarmerDashboard from "./components/dashboard/FarmerDashboard";
import NotFound from "./pages/NotFound";

//zonesView
import ZonesView from "./views/zonesView";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/*login page*/}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

          {/*Zones*/}
          <Route path="/zones" element={<ZonesView />} />
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
