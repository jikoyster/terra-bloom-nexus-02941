import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FarmDetails from './FarmDetails'; // <-- make sure this path is correct
import { Link,  SquareArrowOutUpRight } from 'lucide-react';

interface Farm {
  created_at: string | number | Date;
  farm_id: number;
  name: string;
  region: string;
  yield?: number;
  crops?: string;
  hectares?: number;
  carbon_sequestered: number;
}

const FarmsPanel = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);

  const openFarmModal = (farmId: number) => {
    setSelectedFarmId(farmId);
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/farms');
        if (!res.ok) throw new Error('Failed to fetch farms');
        const data: Farm[] = await res.json();
        setFarms(data);
      } catch (err) {
        console.error('Error fetching farms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) return <p>Loading farms...</p>;
  if (!farms.length) return <p>No farms available.</p>;

  return (
    <div className="space-y-6">

      {/* FARM DETAILS MODAL */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Farm Details</DialogTitle>
          </DialogHeader>
          {selectedFarmId && (
            <FarmDetails farmId={selectedFarmId} />
          )}
        </DialogContent>
      </Dialog>

      {/* Summary cards ... keep your existing content */}


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
                <TableHead>CO₂ Sequestered</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {farms.map((farm) => (
                <TableRow key={farm.farm_id}>
                  <TableCell
                    className="text-[1.1em] font-medium text-green-700 cursor-pointer hover:underline"
                    onClick={() => openFarmModal(farm.farm_id)}
                  >
                    {farm.name} <SquareArrowOutUpRight  className="inline-block ml-1 h-4 w-4" />  
                  </TableCell>

                  <TableCell>{farm.region}</TableCell>
                  <TableCell>{farm.crops || '-'}</TableCell>
                  <TableCell>{farm.yield + ' kg/ha'}</TableCell>
                  <TableCell>{farm.hectares || '-'} ha</TableCell>
                  <TableCell>{farm.carbon_sequestered || '-'} tCO2</TableCell>

                  <TableCell>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openFarmModal(farm.farm_id)}
                    >
                      View Details
                    </button>
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
