import React, { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, Leaf, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CarbonDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /** Fetch Carbon_credits + related Users + Farms */
  const fetchData = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("Carbon_credits")
      .select(`
        id,
        farmer_id,
        co2_sequestered,
        practices,
        trend,
        performance,
        Users (
          id,
          name,
          email,
          status,
          last_login,
          Roles (*),
          Farms (*)
        )
      `);

    if (error) {
      setError(error.message);
      console.error("Fetch error:", error);
      setLoading(false);
      return;
    }

    setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /** -----------------------------
   *   SUMMARY COMPUTATIONS
   * -----------------------------*/

  const totalCarbonSequestered = data.reduce(
    (sum, row) => sum + Number(row.co2_sequestered || 0),
    0
  );

  const totalCreditValue = data.reduce(
    (sum, row) => sum + Number(row.performance || 0),
    0
  );

  const totalHectares = data.reduce(
    (sum, row) => sum + Number(row.Users?.Farms?.hectares || 0),
    0
  );

  const avgSequestrationPerHa =
    totalHectares > 0 ? totalCarbonSequestered / totalHectares : 0;

  /** -----------------------------
   *   RENDER
   * -----------------------------*/

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Carbon Credit Dashboard</CardTitle>
      </CardHeader>

      <CardContent>
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && data.length === 0 && (
          <p>No records found in Carbon_credits.</p>
        )}

        {!loading && data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Farm Size</TableHead>
                <TableHead>CO₂ Sequestered</TableHead>
                <TableHead>Practices</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row) => {
                const hectares = Number(row.Users?.Farms?.hectares || 0);
                const co2 = Number(row.co2_sequestered || 0);

                const performanceValue =
                  hectares > 0 && avgSequestrationPerHa > 0
                    ? Math.min(
                        (co2 / hectares / avgSequestrationPerHa) * 100,
                        100
                      )
                    : 0;

                return (
                  <TableRow key={row.id}>
                    {/* Farmer */}
                    <TableCell>
                      <h3 className="font-medium">{row.Users?.name ?? "N/A"}</h3>
                      <div className="text-gray-500">{row.Users?.Farms?.name ??  "No Farm"}</div>
                    </TableCell>

                    {/* Farm Size */}
                    <TableCell>
                        {row.Users?.Farms?.hectares ?? "N/A"} ha
                    </TableCell>

                    {/* CO₂ */}
                    <TableCell>
                      <div className="flex text-green-600 items-center">
                        <Leaf className="h-4 w-4 text-green-500" />
                        {row.co2_sequestered} kg CO₂
                      </div>
                    </TableCell>

                    {/* Practices */}
                    <TableCell className="w-[40%]">
                      <div className="flex flex-wrap gap-1">
                        {row.practices
                          ?.split(",")                     // split the string
                          .map((s: string) => s.trim())    // trim spaces
                          .map((practice: string, idx: number) => (
                            <div key={idx} className="text-xs pill font-semibold text-black-800 bg-gray-100 px-2 py-1 rounded-full">
                              {practice}
                            </div>
                          ))}
                      </div>

                    </TableCell>

                    {/* Trend */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        {row.trend}%
                      </div>
                    </TableCell>

                    {/* Performance Progress */}
                    <TableCell> 
                      <div className="flex items-center gap-2">
                        <Progress
                          value={performanceValue}
                          className="w-[100px] h-2 mt-1"
                        /> {Math.round(performanceValue)}%
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonDashboard;
