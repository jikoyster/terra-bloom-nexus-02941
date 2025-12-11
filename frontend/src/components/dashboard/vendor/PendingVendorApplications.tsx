import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PendingVendorApplications = () => {
  const [vendors, setVendors] = useState<any[]>([]);

  const fetchUnverified = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/vendors/unverified");
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching unverified vendors:", error);
    }
  };

  useEffect(() => {
    fetchUnverified();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/vendors/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      // Refresh the unverified list
      fetchUnverified();
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Vendor Applications</CardTitle>
        <CardDescription>
          Review and approve new vendor registrations
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {vendors.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No pending vendor applications.
            </p>
          ) : (
            vendors.map((vendor: any) => (
              <div
                key={vendor.vendor_id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{vendor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Category: {vendor.category_name || "Unknown"} | Location:{" "}
                    {vendor.address}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                  <Button size="sm" onClick={() => handleApprove(vendor.vendor_id)}>
                    Approve
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingVendorApplications;
