import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

const VendorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_VENDORS_TABLE)
        .select("*")
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
            <CardTitle>{vendor.name}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Category</h3>
      <p className="text-base font-medium text-foreground">{vendor.category || "—"}</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Region</h3>
      <p className="text-base font-medium text-foreground">{vendor.region || "—"}</p>
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
  </div>
</CardContent>

        </Card>
      </div>
    </>
  );
};

export default VendorDetailsPage;
