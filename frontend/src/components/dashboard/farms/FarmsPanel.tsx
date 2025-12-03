import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, EyeOff, Leaf, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from "react-router-dom";

interface Farm {
  created_at: string | number | Date;
  farm_id: number;
  name: string;
  region: string;
  yield?: number;
  crops?: string;
  hectares?: number;
  carbon_sequestered: number;       // optional, if you store CO₂ data
}

const FarmsPanel = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRevenue, setShowRevenue] = useState(false);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/farms'); // your backend route
        if (!res.ok) throw new Error('Failed to fetch farms');
        const data: Farm[] = await res.json();
        setFarms(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching farms:', err);
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  // Calculations for totals & averages
  const totalCarbonSequestered = farms.reduce((sum, f) => sum + Number(f.carbon_sequestered || 0), 0);
  const avgSequestrationPerHa = farms.reduce((sum, f) => sum + (f.hectares || 0), 0)
    ? totalCarbonSequestered / farms.reduce((sum, f) => sum + (f.hectares || 0), 0)
    : 0;

  if (loading) return <p>Loading farms...</p>;
  if (!farms.length) return <p>No farms available.</p>;

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Sequestered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCarbonSequestered.toFixed(2)} t</div>
            <div className="text-xs text-green-600">CO₂ this season</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farms.length}</div>
            <div className="text-xs text-muted-foreground">Participating in program</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg per Hectare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSequestrationPerHa.toFixed(1)}t</div>
            <div className="text-xs text-muted-foreground">CO₂/ha sequestered</div>
          </CardContent>
        </Card>
      </div>

      {/* Farms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Farms</CardTitle>
          <CardDescription>All validated and officially recorded farms</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farm Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Crops</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Size (ha)</TableHead>
                <TableHead>CO2 Sequestered</TableHead>
                <TableHead>{/*view deatils*/}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farms.map((farm) => (
                <TableRow key={farm.farm_id}>
                  <TableCell className='text-[1.1em] font-medium text-green-700'>
  <Link to={`/farms/${farm.farm_id}`}>{farm.name}</Link>
</TableCell>
                  <TableCell>{farm.region}</TableCell>
                  <TableCell>{farm.crops || '-'}</TableCell>
                  <TableCell>{farm.yield + ' kg/ha'}</TableCell>
                  <TableCell className='w-[10%]'>{farm.hectares || '-'} hectares</TableCell>
                  <TableCell className='w-[10%]'>{farm.carbon_sequestered || '-'} tCO2</TableCell>
                  <TableCell>
                    <Link
                      to={`/farms/${farm.farm_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
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

export default FarmsPanel;
