// frontend/components/VendorsPanel.tsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, EyeOff } from "lucide-react";

interface Vendor {
  vendor_id: number;
  name: string;
  category_name?: string; // now includes category from vendor_categories
  address?: string;
  phone: string;
  email?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const VendorsPanel = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/vendors");
        if (!res.ok) throw new Error("Failed to fetch vendors");

        const data: Vendor[] = await res.json();
        setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const verifiedVendors = vendors.filter(v => v.status === "Verified").length;

  if (loading) return <p>Loading vendors...</p>;
  if (!vendors.length) return <p>No vendors found.</p>;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <div className="text-xs text-muted-foreground">Registered</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedVendors}</div>
            <div className="text-xs text-green-600">Status: Verified</div>
          </CardContent>
        </Card>
      </div>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Vendors</CardTitle>
          <CardDescription>All vendors in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-2">
            <Button
              variant="outline"
              onClick={() => setShowPhone(!showPhone)}
              className="flex items-center gap-2"
            >
              {showPhone ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPhone ? "Hide Phone" : "Show Phone"}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Address</TableHead>
                {showPhone && <TableHead>Phone</TableHead>}
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map(vendor => (
                <TableRow key={vendor.vendor_id}>
                  <TableCell className="text-green-700 font-medium text-[1.1em]">{vendor.name}</TableCell>
                  <TableCell>{vendor.category_name || "-"}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                  <TableCell>{vendor.address || "-"}</TableCell>
                  {showPhone && <TableCell>{vendor.phone}</TableCell>}
                  <TableCell>{vendor.email || "-"}</TableCell>
                  <TableCell>{new Date(vendor.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorsPanel;
