import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Shield,
  Settings,
  Plus,
} from "lucide-react";
import TradeApprovalPanel from "../trade/TradeApprovalPanel";

import CropsTable from "./admin/crops/cropsTable";

/* =======================
   Types
======================= */

interface Crop {
  crop_id: number;
  name: string;
  ph_min: number | null;
  ph_max: number | null;
  nitrogen_requirement_kg_per_ha: number | null;
  phosphorus_requirement_kg_per_ha: number | null;
  potassium_requirement_kg_per_ha: number | null;
  typical_yield_kg_per_ha: number | null;
}

/* =======================
   Component
======================= */

const AdminPanel: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(true);

  /* =======================
     Fetch Crops
  ======================= */

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/crops");
        if (!res.ok) throw new Error("Failed to fetch crops");
        const data = await res.json();
        setCrops(data);
      } catch (err) {
        console.error("Error loading crops:", err);
      } finally {
        setLoadingCrops(false);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div className="space-y-6">
      {/* =======================
          Admin Overview
      ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="text-xs text-muted-foreground">+12 this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <div className="text-xs text-green-600">Peak: 45 today</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-yellow-600">
              Requires attention
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-xs text-muted-foreground">
              Uptime this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =======================
          Tabs
      ======================= */}
      <Tabs defaultValue="crops" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
        </TabsList>

        {/* =======================
            CROPS TAB
        ======================= */}
        <TabsContent value="crops">
          <CropsTable/>
        </TabsContent>

        {/* =======================
            TRADES TAB
        ======================= */}
        <TabsContent value="trades">
          <TradeApprovalPanel />
        </TabsContent>

        {/* Placeholder Tabs */}
        <TabsContent value="users">
          <Card><CardContent>Users management coming soon</CardContent></Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card><CardContent>Permissions config coming soon</CardContent></Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card><CardContent>System logs coming soon</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
