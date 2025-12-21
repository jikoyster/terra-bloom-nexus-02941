import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* =======================
   Interfaces
======================= */

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

interface SoilAssessment {
  assessment_id: number;
  farm_id: number;
  ph_level: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organic_matter: number;
  assessment_date: string;
  notes: string;
}

interface PurchaseOrder {
  po_id: string;
  coop_id: number | null;
  farm_id: number
  details: any; // jsonb
  status: string;
  created_at: string;
  updated_at: string;
}

interface FarmDetailsProps {
  farmId: number;
}

/* =======================
   Component
======================= */

const FarmDetails: React.FC<FarmDetailsProps> = ({ farmId }) => {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [assessments, setAssessments] = useState<SoilAssessment[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/farms/${farmId}`
        );
        if (!res.ok) throw new Error("Failed to fetch farm");
        const data: Farm = await res.json();
        setFarm(data);
      } catch (err) {
        console.error(err);
        setFarm(null);
      }
    };

    const fetchSoil = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/soil_assessment/farm/${farmId}`
        );
        if (!res.ok) throw new Error("Failed to fetch soil assessments");
        const data: SoilAssessment[] = await res.json();
        setAssessments(data);
      } catch (err) {
        console.error(err);
        setAssessments([]);
      }
    };

    const fetchPurchaseOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/purchaseOrders/farm/${farmId}`
        );
        if (!res.ok) throw new Error("Failed to fetch purchase orders");
        const data: PurchaseOrder[] = await res.json();
        setPurchaseOrders(data);
      } catch (err) {
        console.error(err);
        setPurchaseOrders([]);
      }
    };

    Promise.all([
      fetchFarm(),
      fetchSoil(),
      fetchPurchaseOrders(),
    ]).finally(() => setLoading(false));
  }, [farmId]);

  if (loading) return <p>Loading farm details...</p>;
  if (!farm) return <p>Farm not found.</p>;

  return (
    <div className="space-y-6 overflow-y-auto max-h-screen p-4">
      {/* =======================
          Farm Info
      ======================= */}
      <Card>
        <CardHeader>
          <CardTitle>{farm.name}</CardTitle>
          <CardDescription>
            Farm details and operational data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <p><strong>Region:</strong> {farm.region}</p>
          <p><strong>Crops:</strong> {farm.crops || "-"}</p>
          <p><strong>Yield:</strong> {farm.yield || "-"} kg/ha</p>
          <p><strong>Hectares:</strong> {farm.hectares || "-"} ha</p>
          <p>
            <strong>CO₂ Sequestered:</strong>{" "}
            {farm.carbon_sequestered ?? "-"} t
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(farm.created_at).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* =======================
          Soil Assessments
      ======================= */}
      <Card>
        <CardHeader>
          <CardTitle>Soil Assessments</CardTitle>
          <CardDescription>
            Agronomic indicators for decision-making
          </CardDescription>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <p>No soil assessments available.</p>
          ) : (
            <div className="space-y-6">
              {assessments.map((a) => (
                <div
                  key={a.assessment_id}
                  className="grid grid-cols-2 gap-x-4 gap-y-2 border rounded-lg p-4"
                >
                  <div className="font-semibold">Date</div>
                  <div>
                    {new Date(a.assessment_date).toLocaleDateString()}
                  </div>

                  <div className="font-semibold">pH Level</div>
                  <div>{a.ph_level}</div>

                  <div className="font-semibold">Nitrogen</div>
                  <div>{a.nitrogen}</div>

                  <div className="font-semibold">Phosphorus</div>
                  <div>{a.phosphorus}</div>

                  <div className="font-semibold">Potassium</div>
                  <div>{a.potassium}</div>

                  <div className="font-semibold">Organic Matter</div>
                  <div>{a.organic_matter}</div>

                  <div className="font-semibold">Notes</div>
                  <div>{a.notes || "-"}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* =======================
          Purchase Orders
      ======================= */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>
            Farm procurement (Buy operations)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchaseOrders.length === 0 ? (
            <p>No purchase orders found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO #</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.po_id}>
                    <TableCell>{po.po_id}</TableCell>
                    <TableCell>{po.notes}</TableCell>
                    
                    <TableCell>
                      {new Date(po.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{po.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmDetails;
