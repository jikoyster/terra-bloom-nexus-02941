import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

const VendorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDeleteVendor = async (vendorId: string) => {
        if (!confirm("Are you sure you want to delete this vendor?")) return;

        const { error } = await supabase
            .from(import.meta.env.VITE_VENDORS_TABLE)
            .delete()
            .eq('id', vendorId);

        if (error) {
            console.error("Error deleting vendor:", error.message);
            alert("Failed to delete vendor.");
        } else {
            alert("Vendor deleted successfully!");
            navigate('/dashboard'); // redirect back to list
        }
    };

  useEffect(() => {
    const fetchVendor = async () => {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_VENDORS_TABLE)
        .select(`id, vendor_name: name, vendor_email: email, category: ${import.meta.env.VITE_VENDORCAT_TABLE}(id, name), location, products, stock_level, rating`)
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching vendor:", error);
      else setVendor(data);
      setLoading(false);
    };

    

    fetchVendor();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading vendor details...</p>;
  if (!vendor) return <p className="text-center mt-10">Vendor not found.</p>;

  return (
    <>
      <Header />

      <div className="container mx-auto px-6 py-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{vendor.vendor_name}</CardTitle>
            <small className="text-sm text-muted-foreground italic">{vendor.vendor_email || "—"}</small>
          </CardHeader>

          <CardContent className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Category</h3>
      <p className="text-base font-medium text-foreground">{vendor.category?.name || "—"}</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Location</h3>
      <p className="text-base font-medium text-foreground">{vendor.location || "—"}</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Products</h3>
      <p className="text-base font-medium text-foreground">{vendor.products || "—"}</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Stock Level</h3>
      <p className="text-base font-medium text-foreground">{vendor.stock_level || "—"}</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Rating</h3>
      <p className="text-base font-medium text-foreground">{vendor.rating || "—"}</p>
    </div>
  </div>

  <div className="pt-4 border-t border-border">
    <Button asChild variant="outline">
      <Link to="/dashboard">⬅ Back to Vendors List</Link>
    </Button>

    <Button asChild variant="secondary">
      <Link to={`/vendor/edit/${vendor.id}`}>✏️ Edit</Link>
    </Button>

    <Button
      variant="destructive"
      onClick={() => handleDeleteVendor(vendor.id)}
    >
      🗑 Delete
    </Button>
  </div>
</CardContent>

        </Card>
      </div>
    </>
  );
};

export default VendorDetailsPage;
