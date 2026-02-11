import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FarmsList } from "@/components/dashboard/farms/FarmsList";
import FarmDetails from "@/components/dashboard/farms/FarmDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, TrendingUp, Zap, MapPin } from "lucide-react";

export default function FarmsPage() {
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [stats, setStats] = useState({
    totalFarms: 0,
    totalHectares: 0,
    avgYield: 0,
    totalCarbonSequestered: 0,
  });

  // Fetch stats from API
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/farms");
        if (!response.ok) throw new Error("Failed to fetch farms");
        const farms = await response.json();

        const totalHectares = farms.reduce(
          (sum: number, f: any) => sum + (f.hectares || 0),
          0
        );
        const avgYield =
          farms.length > 0
            ? farms.reduce((sum: number, f: any) => sum + (f.yield || 0), 0) /
              farms.length
            : 0;
        const totalCarbon = farms.reduce(
          (sum: number, f: any) => sum + (f.carbon_sequestered || 0),
          0
        );

        setStats({
          totalFarms: farms.length,
          totalHectares,
          avgYield: Math.round(avgYield),
          totalCarbonSequestered: totalCarbon,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Leaf className="w-10 h-10 text-green-600" />
            Farm Management
          </h1>
          <p className="text-gray-600">
            Manage, monitor, and optimize your farm operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Farms
                </CardTitle>
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalFarms}
              </div>
              <p className="text-xs text-gray-500 mt-1">Active farms</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Land
                </CardTitle>
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalHectares}
              </div>
              <p className="text-xs text-gray-500 mt-1">hectares</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg Yield
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.avgYield}
              </div>
              <p className="text-xs text-gray-500 mt-1">kg/ha average</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  CO₂ Sequestered
                </CardTitle>
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalCarbonSequestered}
              </div>
              <p className="text-xs text-gray-500 mt-1">tonnes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="farms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border">
            <TabsTrigger value="farms">All Farms (CRUD)</TabsTrigger>
            <TabsTrigger value="details" disabled={selectedFarmId === null}>
              Farm Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farms" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <FarmsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {selectedFarmId ? (
              <div className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Farm Details & Analytics</CardTitle>
                    <CardDescription>
                      View comprehensive farm information and related data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FarmDetails farmId={selectedFarmId} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6 text-center text-gray-500">
                  <p>Select a farm from the All Farms tab to view details</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle>Farm Management Guide</CardTitle>
            <CardDescription>Quick reference for farm operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-900">Create a Farm</h4>
                <p className="text-sm text-gray-700">
                  Click "Add Farm" button to create a new farm entry. Fill in
                  farm name, region, and optional details like crops and yield.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-900">Update Farm Info</h4>
                <p className="text-sm text-gray-700">
                  Click the "Edit" button on any farm card to update its
                  information including crops, hectares, and carbon metrics.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-green-900">View Analytics</h4>
                <p className="text-sm text-gray-700">
                  Use the Farm Details tab to view soil assessments, purchase
                  orders, and other farm-related analytics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
