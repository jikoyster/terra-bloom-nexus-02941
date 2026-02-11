import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../ui/alert-dialog';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface Farm {
  farm_id: number;
  name: string;
  region: string;
  crops?: string;
  hectares?: number;
  yield?: number;
  address?: string;
  carbon_sequestered?: number;
  created_at: string;
  updated_at: string;
}

export function FarmsList() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    crops: '',
    hectares: '',
    yield: '',
    address: '',
    carbon_sequestered: ''
  });

  // Fetch all farms
  const fetchFarms = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/farms');
      if (!response.ok) throw new Error('Failed to fetch farms');
      const data = await response.json();
      setFarms(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching farms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      region: '',
      crops: '',
      hectares: '',
      yield: '',
      address: '',
      carbon_sequestered: ''
    });
    setEditingFarm(null);
  };

  // Open dialog for creating new farm
  const handleCreateNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  // Open dialog for editing farm
  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name || '',
      region: farm.region || '',
      crops: farm.crops || '',
      hectares: farm.hectares?.toString() || '',
      yield: farm.yield?.toString() || '',
      address: farm.address || '',
      carbon_sequestered: farm.carbon_sequestered?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  // Save farm (create or update)
  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        region: formData.region,
        crops: formData.crops || null,
        hectares: formData.hectares ? parseInt(formData.hectares) : null,
        yield: formData.yield ? parseInt(formData.yield) : null,
        address: formData.address || null,
        carbon_sequestered: formData.carbon_sequestered ? parseInt(formData.carbon_sequestered) : null
      };

      if (editingFarm) {
        // Update existing farm
        const response = await fetch(`http://localhost:5000/api/farms/${editingFarm.farm_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to update farm');
        const updatedFarm = await response.json();
        setFarms(farms.map(f => f.farm_id === editingFarm.farm_id ? updatedFarm : f));
      } else {
        // Create new farm
        const response = await fetch('http://localhost:5000/api/farms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to create farm');
        const newFarm = await response.json();
        setFarms([...farms, newFarm]);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error saving farm:', err);
    }
  };

  // Delete farm
  const handleDelete = async (farmId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/farms/${farmId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete farm');
      setFarms(farms.filter(f => f.farm_id !== farmId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting farm:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading farms...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Farms Management</h2>
          <p className="text-gray-600">Manage your farm inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Farm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFarm ? 'Edit Farm' : 'Create New Farm'}</DialogTitle>
              <DialogDescription>
                {editingFarm ? 'Update the farm details' : 'Add a new farm to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Farm Name *</label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter farm name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="region">Region *</label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="Enter region"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="address">Address</label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter address"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="crops">Crops</label>
                <Input
                  id="crops"
                  value={formData.crops}
                  onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                  placeholder="e.g., Maize, Beans, Wheat"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="hectares">Hectares</label>
                  <Input
                    id="hectares"
                    type="number"
                    value={formData.hectares}
                    onChange={(e) => setFormData({ ...formData, hectares: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="yield">Yield</label>
                  <Input
                    id="yield"
                    type="number"
                    value={formData.yield}
                    onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="carbon">Carbon Sequestered</label>
                <Input
                  id="carbon"
                  type="number"
                  value={formData.carbon_sequestered}
                  onChange={(e) => setFormData({ ...formData, carbon_sequestered: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.region}>
                {editingFarm ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {farms.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              No farms found. Create your first farm!
            </CardContent>
          </Card>
        ) : (
          farms.map(farm => (
            <Card key={farm.farm_id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{farm.name}</CardTitle>
                    <CardDescription>{farm.region}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(farm)}
                      className="gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Farm</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{farm.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex justify-end gap-2">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(farm.farm_id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {farm.address && (
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-semibold">{farm.address}</p>
                    </div>
                  )}
                  {farm.crops && (
                    <div>
                      <p className="text-sm text-gray-600">Crops</p>
                      <p className="font-semibold">{farm.crops}</p>
                    </div>
                  )}
                  {farm.hectares && (
                    <div>
                      <p className="text-sm text-gray-600">Hectares</p>
                      <p className="font-semibold">{farm.hectares}</p>
                    </div>
                  )}
                  {farm.yield && (
                    <div>
                      <p className="text-sm text-gray-600">Yield</p>
                      <p className="font-semibold">{farm.yield}</p>
                    </div>
                  )}
                  {farm.carbon_sequestered && (
                    <div>
                      <p className="text-sm text-gray-600">Carbon Sequestered</p>
                      <p className="font-semibold">{farm.carbon_sequestered}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
