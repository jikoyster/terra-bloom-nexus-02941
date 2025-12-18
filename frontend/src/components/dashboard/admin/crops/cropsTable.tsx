import React, { useEffect, useState } from "react";
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
import { Plus } from "lucide-react";

/* =======================
   Types
======================= */

interface Crop {
  crop_id: number;
  name: string;
  ph_min: number | null;
  ph_max: number | null;
  nitrogen_requirement_kg_per_ha: number | null;
  phosphorus_requirement_kg_per_ha: number | null;
  potassium_requirement_kg_per_ha: number | null;
  typical_yield_kg_per_ha: number | null;
}

/* =======================
   Component
======================= */

const CropsTable: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/crops");
        if (!res.ok) throw new Error("Failed to fetch crops");
        const data = await res.json();
        setCrops(data);
      } catch (err) {
        console.error("Error loading crops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crops Management</CardTitle>
        <CardDescription>
          Crop soil compatibility and nutrient profiling
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-sm text-muted-foreground">
            Loading crops...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>pH Range</TableHead>
                <TableHead>N (kg/ha)</TableHead>
                <TableHead>P (kg/ha)</TableHead>
                <TableHead>K (kg/ha)</TableHead>
                <TableHead>Yield (kg/ha)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No crops found
                  </TableCell>
                </TableRow>
              ) : (
                crops.map((crop) => (
                  <TableRow key={crop.crop_id}>
                    <TableCell className="font-medium">
                      {crop.name}
                    </TableCell>
                    <TableCell>
                      {crop.ph_min ?? "–"} – {crop.ph_max ?? "–"}
                    </TableCell>
                    <TableCell>
                      {crop.nitrogen_requirement_kg_per_ha ?? "–"}
                    </TableCell>
                    <TableCell>
                      {crop.phosphorus_requirement_kg_per_ha ?? "–"}
                    </TableCell>
                    <TableCell>
                      {crop.potassium_requirement_kg_per_ha ?? "–"}
                    </TableCell>
                    <TableCell>
                      {crop.typical_yield_kg_per_ha ?? "–"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <div className="mt-4 flex justify-end">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Crop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropsTable;
