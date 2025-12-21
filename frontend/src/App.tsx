import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter , Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";

import FarmsPanel from "@/components/dashboard/farms/FarmsPanel";
import FarmDetails from "@/components/dashboard/farms/FarmDetails";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

import CoopPanel from "@/components/dashboard/cooperatives/CoopPanel";
import Buy from "@/components/dashboard/farms/Buy";
import Sell from "@/components/dashboard/farms/Sell";

const queryClient = new QueryClient();

// Helper function to check login
const isLoggedIn = () => !!localStorage.getItem("user");

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />

          <Route path="/farms" element={<ProtectedRoute><FarmsPanel /></ProtectedRoute>} />
          <Route path="/farms/:id" element={<ProtectedRoute><FarmDetails /></ProtectedRoute>} />
          
          <Route path="/coops" element={<CoopPanel />} />
          <Route path="/buy/:coop_id" element={<Buy />} />

          <Route path="/sell" element={<Sell />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
