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
  status: string;
  address: string;
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

        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                <TableHead>Status</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="text-green-700 font-medium text-[1.1em]">
                    {farmer.name}
                  </TableCell>

                  <TableCell>{farmer.products || "-"}</TableCell>
                  
                  <TableCell>{farmer.status}</TableCell>
                  <TableCell>{farmer.address || "-"}</TableCell>
                  <TableCell>{farmer.email || "-"}</TableCell>
                  <TableCell>
                    {new Date(farmer.created_at).toLocaleDateString()}
                  </TableCell>

                  
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
