import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, EyeOff } from "lucide-react";

interface Farmer {
  id: number;
  name: string;
  products: string;
  stock_level: number;
  status: string;
  location: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const FarmersPanel = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRevenue, setShowRevenue] = useState(false);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/farmers"); 
        if (!res.ok) throw new Error("Failed to fetch farmers");

        const data: Farmer[] = await res.json();
        setFarmers(data);
      } catch (err) {
        console.error("Error fetching farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  // Example calculations (you can replace these with real formulas later)
  const totalStock = farmers.reduce((sum, f) => sum + (f.stock_level || 0), 0);
  const activeFarmers = farmers.filter((f) => f.status === "Verified").length;

  const progressValue =
    farmers.length > 0
      ? Math.min((activeFarmers / farmers.length) * 100, 100)
      : 0;

  if (loading) return <p>Loading farmers...</p>;
  if (!farmers.length) return <p>No farmers found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">&nbsp;</h2>

        <Button
          variant="outline"
          onClick={() => setShowRevenue(!showRevenue)}
          className="flex items-center gap-2"
        >
          {showRevenue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showRevenue ? "Hide Revenue" : "Show Revenue"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmers.length}</div>
            <div className="text-xs text-muted-foreground">Registered</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFarmers}</div>
            <div className="text-xs text-green-600">Status: Verified</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
            <div className="text-xs text-muted-foreground">Units</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {showRevenue ? "Revenue (Demo)" : "Verification Progress"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {showRevenue ? (
              <div className="text-2xl font-bold text-green-600">
                ₱{(activeFarmers * 250).toLocaleString()}
              </div>
            ) : (
              <Progress value={progressValue} className="mt-2" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Farmers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Farmers</CardTitle>
          <CardDescription>List of all farmers in the system</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>

                {showRevenue && <TableHead>Revenue (Demo)</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="text-green-700 font-medium text-[1.1em]">
                    {farmer.name}
                  </TableCell>

                  <TableCell>{farmer.products || "-"}</TableCell>
                  <TableCell>{farmer.stock_level}</TableCell>
                  <TableCell>{farmer.status}</TableCell>
                  <TableCell>{farmer.location || "-"}</TableCell>
                  <TableCell>{farmer.email || "-"}</TableCell>
                  <TableCell>
                    {new Date(farmer.created_at).toLocaleDateString()}
                  </TableCell>

                  {showRevenue && (
                    <TableCell>
                      ₱{(farmer.stock_level * 100).toLocaleString()}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmersPanel;
