import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Leaf,
  TrendingUp,
  MapPin,
  Zap,
  Download,
  RefreshCw,
} from "lucide-react";

interface Farm {
  farm_id: number;
  name: string;
  region: string;
  crops?: string;
  hectares?: number;
  yield?: number;
  address?: string;
  carbon_sequestered?: number;
  created_at: string;
  updated_at: string;
}

export function FarmManagementDashboard() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    crops: "",
    hectares: "",
    yield: "",
    address: "",
    carbon_sequestered: "",
  });

  // Fetch farms
  const fetchFarms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/farms");
      if (!response.ok) throw new Error("Failed to fetch farms");
      const data = await response.json();
      setFarms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching farms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      region: "",
      crops: "",
      hectares: "",
      yield: "",
      address: "",
      carbon_sequestered: "",
    });
    setEditingFarm(null);
  };

  // Handle create/edit
  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name || "",
      region: farm.region || "",
      crops: farm.crops || "",
      hectares: farm.hectares?.toString() || "",
      yield: farm.yield?.toString() || "",
      address: farm.address || "",
      carbon_sequestered: farm.carbon_sequestered?.toString() || "",
    });
    setIsDialogOpen(true);
  };

  // Handle save
  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        region: formData.region,
        crops: formData.crops || null,
        hectares: formData.hectares ? parseInt(formData.hectares) : null,
        yield: formData.yield ? parseInt(formData.yield) : null,
        address: formData.address || null,
        carbon_sequestered: formData.carbon_sequestered
          ? parseInt(formData.carbon_sequestered)
          : null,
      };

      if (editingFarm) {
        const response = await fetch(
          `http://localhost:5000/api/farms/${editingFarm.farm_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) throw new Error("Failed to update farm");
        const updatedFarm = await response.json();
        setFarms(
          farms.map((f) =>
            f.farm_id === editingFarm.farm_id ? updatedFarm : f
          )
        );
      } else {
        const response = await fetch("http://localhost:5000/api/farms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to create farm");
        const newFarm = await response.json();
        setFarms([...farms, newFarm]);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // Handle delete
  const handleDelete = async (farmId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/farms/${farmId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete farm");
      setFarms(farms.filter((f) => f.farm_id !== farmId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // Prepare chart data
  const yieldChartData = farms.map((f) => ({
    name: f.name,
    yield: f.yield || 0,
    hectares: f.hectares || 0,
  }));

  const regionData = (() => {
    const map = new Map<string, number>();
    farms.forEach((f) => {
      map.set(f.region, (map.get(f.region) || 0) + 1);
    });
    return Array.from(map).map(([region, count]) => ({
      name: region,
      value: count,
    }));
  })();

  const carbonData = farms
    .sort((a, b) => (b.carbon_sequestered || 0) - (a.carbon_sequestered || 0))
    .slice(0, 10)
    .map((f) => ({
      name: f.name,
      carbon: f.carbon_sequestered || 0,
    }));

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  // Stats
  const stats = {
    totalFarms: farms.length,
    totalHectares: farms.reduce((sum, f) => sum + (f.hectares || 0), 0),
    avgYield:
      farms.length > 0
        ? Math.round(farms.reduce((sum, f) => sum + (f.yield || 0), 0) / farms.length)
        : 0,
    totalCarbon: farms.reduce(
      (sum, f) => sum + (f.carbon_sequestered || 0),
      0
    ),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading farm data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            Farm Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage and monitor all farm operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchFarms}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                Add Farm
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingFarm ? "Edit Farm" : "Create New Farm"}
                </DialogTitle>
                <DialogDescription>
                  {editingFarm
                    ? "Update the farm details"
                    : "Add a new farm to the system"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Farm Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter farm name"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Region *</label>
                  <Input
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    placeholder="Enter region"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter address"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Crops</label>
                  <Input
                    value={formData.crops}
                    onChange={(e) =>
                      setFormData({ ...formData, crops: e.target.value })
                    }
                    placeholder="e.g., Maize, Beans, Wheat"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Hectares</label>
                    <Input
                      type="number"
                      value={formData.hectares}
                      onChange={(e) =>
                        setFormData({ ...formData, hectares: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Yield</label>
                    <Input
                      type="number"
                      value={formData.yield}
                      onChange={(e) =>
                        setFormData({ ...formData, yield: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Carbon Sequestered
                  </label>
                  <Input
                    type="number"
                    value={formData.carbon_sequestered}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        carbon_sequestered: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!formData.name || !formData.region}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingFarm ? "Update" : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
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

        <Card>
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

        <Card>
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
            <p className="text-xs text-gray-500 mt-1">kg/ha</p>
          </CardContent>
        </Card>

        <Card>
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
              {stats.totalCarbon}
            </div>
            <p className="text-xs text-gray-500 mt-1">tonnes</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Yield by Farm</CardTitle>
                <CardDescription>Production metrics</CardDescription>
              </CardHeader>
              <CardContent>
                {yieldChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={yieldChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="yield" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No data available
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Farms by Region</CardTitle>
                <CardDescription>Distribution</CardDescription>
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
                  <p className="text-center text-gray-500 py-8">
                    No data available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Sequestration Leaders</CardTitle>
              <CardDescription>Top performing farms</CardDescription>
            </CardHeader>
            <CardContent>
              {carbonData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={carbonData}
                    layout="vertical"
                    margin={{ left: 150 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={140} />
                    <Tooltip />
                    <Bar dataKey="carbon" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Farm Inventory</CardTitle>
              <CardDescription>All registered farms</CardDescription>
            </CardHeader>
            <CardContent>
              {farms.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Farm Name</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Crops</TableHead>
                        <TableHead>Hectares</TableHead>
                        <TableHead>Yield</TableHead>
                        <TableHead>CO₂</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {farms.map((farm) => (
                        <TableRow key={farm.farm_id}>
                          <TableCell className="font-medium">
                            {farm.name}
                          </TableCell>
                          <TableCell>{farm.region}</TableCell>
                          <TableCell>{farm.crops || "-"}</TableCell>
                          <TableCell>{farm.hectares || "-"}</TableCell>
                          <TableCell>{farm.yield || "-"} kg/ha</TableCell>
                          <TableCell>{farm.carbon_sequestered || "-"} t</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(farm)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Farm</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{farm.name}"?
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="flex justify-end gap-2">
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(farm.farm_id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No farms found. Create your first farm!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Farm Performance Summary</CardTitle>
              <CardDescription>Key metrics and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600">Highest Yield Farm</p>
                  <p className="text-lg font-bold">
                    {farms.length > 0
                      ? farms.reduce((max, f) =>
                          (f.yield || 0) > (max.yield || 0) ? f : max
                        ).name
                      : "-"}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600">Largest Farm</p>
                  <p className="text-lg font-bold">
                    {farms.length > 0
                      ? farms.reduce((max, f) =>
                          (f.hectares || 0) > (max.hectares || 0) ? f : max
                        ).name
                      : "-"}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Most Carbon Sequestered
                  </p>
                  <p className="text-lg font-bold">
                    {farms.length > 0
                      ? farms.reduce((max, f) =>
                          (f.carbon_sequestered || 0) >
                          (max.carbon_sequestered || 0)
                            ? f
                            : max
                        ).name
                      : "-"}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600">Most Common Region</p>
                  <p className="text-lg font-bold">
                    {regionData.length > 0
                      ? regionData.reduce((max, r) =>
                          r.value > max.value ? r : max
                        ).name
                      : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
