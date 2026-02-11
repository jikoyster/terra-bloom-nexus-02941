import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Leaf, TrendingUp, Zap, MapPin } from "lucide-react";

interface Farm {
  farm_id: number;
  name: string;
  region: string;
  crops?: string;
  hectares?: number;
  yield?: number;
  carbon_sequestered?: number;
  created_at: string;
}

export default function FarmsDashboard() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [regionData, setRegionData] = useState<any[]>([]);

  useEffect(() => {
    fetchFarmsData();
  }, []);

  const fetchFarmsData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/farms");
      if (!response.ok) throw new Error("Failed to fetch farms");
      const data = await response.json();
      setFarms(data);

      // Prepare chart data
      const yieldChartData = data.map((farm: Farm) => ({
        name: farm.name,
        yield: farm.yield || 0,
        hectares: farm.hectares || 0,
      }));
      setChartData(yieldChartData);

      // Prepare region distribution
      const regionMap = new Map<string, number>();
      data.forEach((farm: Farm) => {
        const count = regionMap.get(farm.region) || 0;
        regionMap.set(farm.region, count + 1);
      });
      const regionChartData = Array.from(regionMap).map(([region, count]) => ({
        name: region,
        value: count,
      }));
      setRegionData(regionChartData);
    } catch (err) {
      console.error("Error fetching farms:", err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  if (loading) {
    return <div className="text-center py-8">Loading farm data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farms.length}</div>
            <p className="text-xs text-gray-500">Active farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Land</CardTitle>
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farms.reduce((sum, f) => sum + (f.hectares || 0), 0)}
            </div>
            <p className="text-xs text-gray-500">hectares</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Avg Yield</CardTitle>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farms.length > 0
                ? Math.round(
                    farms.reduce((sum, f) => sum + (f.yield || 0), 0) /
                      farms.length
                  )
                : 0}
            </div>
            <p className="text-xs text-gray-500">kg/ha</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">CO₂ Stored</CardTitle>
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farms.reduce((sum, f) => sum + (f.carbon_sequestered || 0), 0)}
            </div>
            <p className="text-xs text-gray-500">tonnes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Yield by Farm</CardTitle>
            <CardDescription>Production metrics across farms</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yield" fill="#10b981" name="Yield (kg/ha)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No farm data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Farms by Region</CardTitle>
            <CardDescription>Distribution across regions</CardDescription>
          </CardHeader>
          <CardContent>
            {regionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No farm data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Farms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Inventory</CardTitle>
          <CardDescription>
            All registered farms and their metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {farms.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Crops</TableHead>
                  <TableHead>Hectares</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead>CO₂ Sequestered</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farms.map((farm) => (
                  <TableRow key={farm.farm_id}>
                    <TableCell className="font-medium">{farm.name}</TableCell>
                    <TableCell>{farm.region}</TableCell>
                    <TableCell>{farm.crops || "-"}</TableCell>
                    <TableCell>{farm.hectares || "-"}</TableCell>
                    <TableCell>{farm.yield || "-"} kg/ha</TableCell>
                    <TableCell>{farm.carbon_sequestered || "-"} t</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 py-8">No farms found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
