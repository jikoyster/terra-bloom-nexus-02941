// frontend/src/pages/farms/FarmDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

const FarmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [assessments, setAssessments] = useState<SoilAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/farms/${id}`);
        if (!res.ok) throw new Error("Failed to fetch farm");
        const data: Farm = await res.json();
        setFarm(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSoil = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/soil_assessment/farm/${id}`);
        if (!res.ok) throw new Error("Failed to fetch soil assessments");
        const data: SoilAssessment[] = await res.json();
        setAssessments(data);
      } catch (err) {
        console.error(err);
      }
    };

    Promise.all([fetchFarm(), fetchSoil()]).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading farm details...</p>;
  if (!farm) return <p>Farm not found.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{farm.name}</CardTitle>
          <CardDescription>Farm details and soil assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Region:</strong> {farm.region}</p>
          <p><strong>Crops:</strong> {farm.crops || "-"}</p>
          <p><strong>Yield:</strong> {farm.yield || "-"} kg/ha</p>
          <p><strong>Hectares:</strong> {farm.hectares || "-"} ha</p>
          <p><strong>CO₂ Sequestered:</strong> {farm.carbon_sequestered || "-"} t</p>
          <p><strong>Created At:</strong> {new Date(farm.created_at).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Soil Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <p>No soil assessments available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>pH Level</TableHead>
                  <TableHead>Nitrogen</TableHead>
                  <TableHead>Phosphorus</TableHead>
                  <TableHead>Potassium</TableHead>
                  <TableHead>Organic Matter</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((a) => (
                  <TableRow key={a.assessment_id}>
                    <TableCell>{new Date(a.assessment_date).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}</TableCell>
                    <TableCell>{a.ph_level}</TableCell>
                    <TableCell>{a.nitrogen}</TableCell>
                    <TableCell>{a.phosphorus}</TableCell>
                    <TableCell>{a.potassium}</TableCell>
                    <TableCell>{a.organic_matter}</TableCell>
                    <TableCell>{a.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Link to="/dashboard?tab=farmsPanel">
        <button className="mt-4 px-4 py-2 bg-gray-200 rounded">Back to Farms</button>
      </Link>
    </div>
  );
};

export default FarmDetails;
