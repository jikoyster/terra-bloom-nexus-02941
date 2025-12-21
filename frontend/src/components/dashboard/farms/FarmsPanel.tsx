import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";

import FarmDetails from './FarmDetails';
import { Bell, Delete, Edit, SquareArrowOutUpRight } from 'lucide-react';

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
  const navigate = useNavigate();

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
          {selectedFarmId && <FarmDetails farmId={selectedFarmId} />}
        </DialogContent>
      </Dialog>

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
                <TableHead className='w-[10%] text-center'>Farm Transactions</TableHead> 
                <TableHead className='w-[10%] text-center'>Notifs</TableHead> 
              </TableRow>
            </TableHeader>

            <TableBody>
              {farms.map((farm) => (
                <TableRow key={farm.farm_id}>
                  
                  {/* Farm name – clickable */}
                  <TableCell
                    className="text-[1.1em] font-medium text-green-700 cursor-pointer hover:underline"
                    onClick={() => openFarmModal(farm.farm_id)}
                  >
                    {farm.name}
                    <SquareArrowOutUpRight className="inline-block ml-1 h-4 w-4" />
                  </TableCell>

                  <TableCell>{farm.region}</TableCell>
                  <TableCell>{farm.crops || '-'}</TableCell>
                  <TableCell>{farm.yield ? `${farm.yield} kg/ha` : '-'}</TableCell>
                  <TableCell>{farm.hectares ? `${farm.hectares} ha` : '-'}</TableCell>

                  {/* BUY / SELL */}
                  <TableCell>
                    <div className="flex items-center gap-4">

                      {/* Buy button */}
                      <Button
                        className="px-6 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700"
                        onClick={() => navigate(`/buy/${farm.farm_id}`)}
                      >
                        BUY
                      </Button>

                      {/* Sell button */}
                      <Button
                        className="px-6 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700"
                        onClick={() => navigate(`/sell`)}
                        //onClick={() => navigate(`/sell/${farm.farm_id}`)}
                      >
                        SELL
                      </Button>

                    </div>
                  </TableCell>
                  <TableCell className='flex justify-center'>
                    <Edit className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    <Delete className="h-5 w-5 text-red-600 hover:text-red-800 cursor-pointer ml-4" />
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
