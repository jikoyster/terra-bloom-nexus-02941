import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

import FarmDetails from './FarmDetails';
import { AlertCircle, Plus, Edit, ArchiveIcon, SquareArrowOutUpRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingFarm, setDeleteFarm] = useState<Farm | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Farm | null>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    crops: '',
    hectares: '',
    yield: '',
    address: '',
    carbon_sequestered: ''
  });

  const openFarmModal = (farmId: number) => {
    setSelectedFarmId(farmId);
    setOpenModal(true);
  };

  const resetCreateForm = () => {
    setFormData({
      name: '',
      region: '',
      crops: '',
      hectares: '',
      yield: '',
      address: '',
      carbon_sequestered: ''
    });
    setError(null);
  };

  const handleCreateFarm = async () => {
    try {
      if (!formData.name || !formData.region) {
        setError('Farm name and region are required');
        return;
      }

      const payload = {
        name: formData.name,
        region: formData.region,
        crops: formData.crops || null,
        hectares: formData.hectares ? parseInt(formData.hectares) : null,
        yield: formData.yield ? parseInt(formData.yield) : null,
        address: formData.address || null,
        carbon_sequestered: formData.carbon_sequestered ? parseInt(formData.carbon_sequestered) : null
      };

      const response = await fetch('http://localhost:5000/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create farm');
      
      const newFarm = await response.json();
      setFarms([...farms, newFarm].sort((a, b) => {
        return a.name.localeCompare(b.name);
      }));
      setIsCreateDialogOpen(false);
      resetCreateForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating farm:', err);
    }
  };

  const handleEditFarm = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name || '',
      region: farm.region || '',
      crops: farm.crops || '',
      hectares: farm.hectares?.toString() || '',
      yield: farm.yield?.toString() || '',
      address: '',
      carbon_sequestered: farm.carbon_sequestered?.toString() || ''
    });
    setError(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateFarm = async () => {
    try {
      if (!editingFarm) return;
      if (!formData.name || !formData.region) {
        setError('Farm name and region are required');
        return;
      }

      const payload = {
        name: formData.name,
        region: formData.region,
        crops: formData.crops || null,
        hectares: formData.hectares ? parseInt(formData.hectares) : null,
        yield: formData.yield ? parseInt(formData.yield) : null,
        address: formData.address || null,
        carbon_sequestered: formData.carbon_sequestered ? parseInt(formData.carbon_sequestered) : null
      };

      const response = await fetch(`http://localhost:5000/api/farms/${editingFarm.farm_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to update farm');
      
      const updatedFarm = await response.json();
      setFarms(farms.map(f => f.farm_id === editingFarm.farm_id ? updatedFarm : f).sort((a, b) => {
        return a.name.localeCompare(b.name);
      }));
      setIsEditDialogOpen(false);
      setEditingFarm(null);
      resetCreateForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating farm:', err);
    }
  };

  const handleDeleteClick = (farm: Farm) => {
    setDeleteFarm(farm);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteFarm = async () => {
    try {
      if (!deletingFarm) return;

      const response = await fetch(`http://localhost:5000/api/farms/${deletingFarm.farm_id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete farm');
      
      setFarms(farms.filter(f => f.farm_id !== deletingFarm.farm_id));
      setIsDeleteDialogOpen(false);
      setDeleteFarm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting farm:', err);
    }
  };

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/farms');
        if (!res.ok) throw new Error('Failed to fetch farms');
        const data: Farm[] = await res.json();
        // Sort by name in ascending order by default
        const sortedData = data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setFarms(sortedData);
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

  const handleSort = (column: keyof Farm) => {
    if (sortColumn === column) {
      // Toggle direction if clicking same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedFarms = () => {
    if (!sortColumn) return farms;

    return [...farms].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      // Handle null/undefined values
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDirection === 'asc' ? 1 : -1;
      if (bVal == null) return sortDirection === 'asc' ? -1 : 1;

      // Handle date columns
      if (sortColumn === 'created_at') {
        const dateA = new Date(aVal as string).getTime();
        const dateB = new Date(bVal as string).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Handle string columns
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      // Handle numeric columns
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  };

  const SortIcon = ({ column }: { column: keyof Farm }) => {
    if (sortColumn !== column) return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const SortableHeader = ({ column, label }: { column: keyof Farm; label: string }) => (
    <TableHead 
      onClick={() => handleSort(column)}
      className="cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon column={column} />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">

      {/* DELETE FARM CONFIRMATION DIALOG */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Farm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingFarm?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteFarm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* CREATE FARM DIALOG */}
      <div className="flex justify-end mb-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetCreateForm();
                setIsCreateDialogOpen(true);
              }}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add Farm
            </Button>
          </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Farm</DialogTitle>
            <DialogDescription>Add a new farm to the system</DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Farm Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter farm name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Region *</label>
              <Input
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="Enter region"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Crops</label>
              <Input
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                placeholder="e.g., Maize, Beans, Wheat"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Hectares</label>
                <Input
                  type="number"
                  value={formData.hectares}
                  onChange={(e) => setFormData({ ...formData, hectares: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Yield (kg/ha)</label>
                <Input
                  type="number"
                  value={formData.yield}
                  onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Carbon Sequestered (tonnes)</label>
              <Input
                type="number"
                value={formData.carbon_sequestered}
                onChange={(e) => setFormData({ ...formData, carbon_sequestered: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFarm}
              disabled={!formData.name || !formData.region}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Farm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>

      {/* FARM DETAILS MODAL */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Farm Details</DialogTitle>
          </DialogHeader>
          {selectedFarmId && <FarmDetails farmId={selectedFarmId} />}
        </DialogContent>
      </Dialog>

      {/* EDIT FARM DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Farm</DialogTitle>
            <DialogDescription>Update the farm details</DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Farm Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter farm name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Region *</label>
              <Input
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="Enter region"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Crops</label>
              <Input
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                placeholder="e.g., Maize, Beans, Wheat"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Hectares</label>
                <Input
                  type="number"
                  value={formData.hectares}
                  onChange={(e) => setFormData({ ...formData, hectares: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Yield (kg/ha)</label>
                <Input
                  type="number"
                  value={formData.yield}
                  onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Carbon Sequestered (tonnes)</label>
              <Input
                type="number"
                value={formData.carbon_sequestered}
                onChange={(e) => setFormData({ ...formData, carbon_sequestered: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingFarm(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateFarm}
              disabled={!formData.name || !formData.region}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Farm
            </Button>
          </div>
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
                <SortableHeader column="name" label="Farm Name" />
                <SortableHeader column="region" label="Region" />
                <SortableHeader column="crops" label="Crops" />
                <SortableHeader column="yield" label="Yield" />
                <SortableHeader column="hectares" label="Size (ha)" />
                <TableHead className='w-[10%] text-center cursor-default'>Farm Transactions</TableHead> 
                <TableHead className='w-[10%] text-center cursor-default'> </TableHead> 
              </TableRow>
            </TableHeader>

            <TableBody>
              {getSortedFarms().map((farm) => (
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
                    <div title="Edit Farm" onClick={() => handleEditFarm(farm)} className="cursor-pointer"><Edit className="h-5 w-5 text-gray-600 hover:text-gray-800" /></div>
                    <div title="Archive Farm" onClick={() => handleDeleteClick(farm)} className="cursor-pointer"><ArchiveIcon className="h-5 w-5 text-amber-600 hover:text-amber-800 ml-4" /></div>
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
