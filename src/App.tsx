import React, { useState } from 'react';
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
import ZonesView from "./views/ZonesView";

//login page
import LoginPage from "./pages/Login";
import { AlignCenter } from 'lucide-react';
const queryClient = new QueryClient();

import SignupPage from "./pages/Signup_5cad9932e1a3b7955ef4073ff0b1f312fc8433a4";


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/signup/5cad9932e1a3b7955ef4073ff0b1f312fc8433a4"
            element={
              <React.Suspense fallback={<p className='text-center'><br /><br /><br /> Loading signup page...</p>}>
                <SignupPage />
              </React.Suspense>
            }
          />

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
