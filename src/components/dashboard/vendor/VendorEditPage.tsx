import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VendorEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: 0,
    stock_level: "",
    rating: 0,
    products: "",
    status: "Unverified", // ✅ new field
  });

  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_VENDORCAT_TABLE)
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error.message);
    } else {
      setCategories(data || []);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_VENDORS_TABLE)
      .select(`
        id,
        name,
        location,
        category: VendorCategory(id, name),
        products,
        stock_level,
        rating,
        status
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching vendor:", error.message);
      toast.error("Failed to fetch vendor details.");
    } else {
      setVendor(data);
      setFormData({
        name: data.name,
        location: data.location,
        category: data.category?.id || 0,
        stock_level: data.stock_level || 0,
        rating: data.rating,
        products: data.products,
        status: data.status || "Unverified", // ✅ keep current status
      });
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "category"
          ? parseInt(value)
          : name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from(import.meta.env.VITE_VENDORS_TABLE)
      .update({
        name: formData.name,
        location: formData.location,
        category: formData.category,
        stock_level: formData.stock_level,
        rating: formData.rating,
        products: formData.products,
        status: formData.status, // ✅ update status too
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating vendor:", error.message);
      toast.error("Failed to update vendor.");
    } else {
      toast.success("Vendor updated successfully!");
      navigate("/dashboard");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading vendor data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Edit Vendor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="name">Vendor Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="products">Products</Label>
              <Input
                id="products"
                name="products"
                value={formData.products}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="stock_level">Stock Level</Label>
              <Input
                id="stock_level"
                name="stock_level"
                type="number"
                value={formData.stock_level}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            {/* ✅ NEW: Status Dropdown */}
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="Verified">Verified</option>
                <option value="Unverified">Unverified</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button asChild variant="outline">
                <Link to="/dashboard">⬅ Back</Link>
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update Vendor"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorEditPage;
