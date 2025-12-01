import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, EyeOff, Leaf, TrendingUp, DollarSign } from 'lucide-react';

interface Farm {
  farm_id: number;
  name: string;
  region: string;
  yield?: number;
  crops?: string;
  hectares?: number;
  carbon?: number;       // optional, if you store CO₂ data
  creditValue?: number;   // optional, if you store revenue
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
  const totalCarbonSequestered = farms.reduce((sum, f) => sum + (f.carbon || 0), 0);
  const totalCreditValue = farms.reduce((sum, f) => sum + (f.creditValue || 0), 0);
  const avgSequestrationPerHa = farms.reduce((sum, f) => sum + (f.hectares || 0), 0)
    ? totalCarbonSequestered / farms.reduce((sum, f) => sum + (f.hectares || 0), 0)
    : 0;

  if (loading) return <p>Loading farms...</p>;
  if (!farms.length) return <p>No farms available.</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">&nbsp;</h2>
        <Button
          variant="outline"
          onClick={() => setShowRevenue(!showRevenue)}
          className="flex items-center gap-2"
        >
          {showRevenue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showRevenue ? 'Hide Revenue' : 'Show Revenue'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Sequestered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCarbonSequestered.toFixed(1)}t</div>
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {showRevenue ? 'Credit Value' : 'Monthly Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showRevenue ? (
              <div className="text-2xl font-bold text-green-600">₱{totalCreditValue.toLocaleString()}</div>
            ) : (
              <Progress value={Math.min((totalCarbonSequestered / 200) * 100, 100)} className="mt-2" />
            )}
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
                <TableHead>Created At</TableHead>
                {showRevenue && <TableHead>Credit Value</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {farms.map((farm) => (
                <TableRow key={farm.farm_id}>
                  <TableCell className='text-[1.1em] font-medium text-green-700'>{farm.name}</TableCell>
                  <TableCell>{farm.region}</TableCell>
                  <TableCell>{farm.crops || '-'}</TableCell>
                  <TableCell>{farm.yield + ' kg/ha'}</TableCell>
                  <TableCell className='w-[10%]'>{farm.hectares || '-'} hectares</TableCell>
                  <TableCell className='w-[10%]'>{farm.carbon_sequestered || '-'} tCO2</TableCell>
                  <TableCell>{new Date(farm.created_at).toLocaleDateString()}</TableCell>
                  {showRevenue && <TableCell>₱{(farm.creditValue || 0).toLocaleString()}</TableCell>}
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
