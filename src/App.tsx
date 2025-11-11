import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./components/dashboard/VendorDashboard";
import FarmerDashboard from "./components/dashboard/FarmerDashboard";
import NotFound from "./pages/NotFound";
import ZonesView from "./views/ZonesView";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup_5cad9932e1a3b7955ef4073ff0b1f312fc8433a4";
import VendorRegisterPage from './components/dashboard/vendor/VendorRegisterPage';
import VendorDetailsPage from './components/dashboard/vendor/VendorDetailsPage';
import VendorEditPage from './components/dashboard/vendor/VendorEditPage';

const queryClient = new QueryClient();

/* ✅ ProtectedRoute component */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);

      // Listen for login/logout changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route
            path="/signup/5cad9932e1a3b7955ef4073ff0b1f312fc8433a4"
            element={
              <React.Suspense fallback={<p className='text-center'><br /><br /><br /> Loading signup page...</p>}>
                <SignupPage />
              </React.Suspense>
            }
          />
          <Route path="/login" element={<LoginPage />} />

          {/* ✅ Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor-register"
            element={
              <ProtectedRoute>
                <VendorRegisterPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendors/:id"
            element={
              <ProtectedRoute>
                <VendorDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/edit/:id"
            element={
              <ProtectedRoute>
                <VendorEditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer-dashboard"
            element={
              <ProtectedRoute>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/zones"
            element={
              <ProtectedRoute>
                <ZonesView />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
