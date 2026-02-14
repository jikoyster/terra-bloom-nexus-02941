import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Plus, Edit, ArchiveIcon, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Farmer {
  id: number;
  name: string;
  products: string;
  status: string;
  address: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const FarmersPanel = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRevenue, setShowRevenue] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [deletingFarmer, setDeletingFarmer] = useState<Farmer | null>(null);
  const [togglingFarmerId, setTogglingFarmerId] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Farmer | null>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState({
    name: '',
    products: '',
    status: 'Verified',
    address: '',
    email: ''
  });

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/farmers"); 
        if (!res.ok) throw new Error("Failed to fetch farmers");

        const data: Farmer[] = await res.json();
        // Sort by name in ascending order
        const sortedData = data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setFarmers(sortedData);
      } catch (err) {
        console.error("Error fetching farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const resetCreateForm = () => {
    setFormData({
      name: '',
      products: '',
      status: 'Verified',
      address: '',
      email: ''
    });
    setError(null);
  };

  const handleCreateFarmer = async () => {
    try {
      if (!formData.name || !formData.email) {
        setError('Farmer name and email are required');
        return;
      }

      const payload = {
        name: formData.name,
        products: formData.products || null,
        status: formData.status || 'Verified',
        address: formData.address || null,
        email: formData.email
      };

      const response = await fetch('http://localhost:5000/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create farmer');
      
      const newFarmer = await response.json();
      setFarmers([...farmers, newFarmer].sort((a, b) => {
        return a.name.localeCompare(b.name);
      }));
      setIsCreateDialogOpen(false);
      resetCreateForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating farmer:', err);
    }
  };

  const handleEditFarmer = (farmer: Farmer) => {
    setEditingFarmer(farmer);
    setFormData({
      name: farmer.name || '',
      products: farmer.products || '',
      status: farmer.status || 'Verified',
      address: farmer.address || '',
      email: farmer.email || ''
    });
    setError(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateFarmer = async () => {
    try {
      if (!editingFarmer) return;
      if (!formData.name || !formData.email) {
        setError('Farmer name and email are required');
        return;
      }

      const payload = {
        name: formData.name,
        products: formData.products || null,
        status: formData.status || 'Verified',
        address: formData.address || null,
        email: formData.email
      };

      const response = await fetch(`http://localhost:5000/api/farmers/${editingFarmer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to update farmer');
      
      const updatedFarmer = await response.json();
      setFarmers(farmers.map(f => f.id === editingFarmer.id ? updatedFarmer : f).sort((a, b) => {
        return a.name.localeCompare(b.name);
      }));
      setIsEditDialogOpen(false);
      setEditingFarmer(null);
      resetCreateForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating farmer:', err);
    }
  };

  const handleDeleteClick = (farmer: Farmer) => {
    setDeletingFarmer(farmer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteFarmer = async () => {
    try {
      if (!deletingFarmer) return;

      const response = await fetch(`http://localhost:5000/api/farmers/${deletingFarmer.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete farmer');
      
      setFarmers(farmers.filter(f => f.id !== deletingFarmer.id));
      setIsDeleteDialogOpen(false);
      setDeletingFarmer(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting farmer:', err);
    }
  };

  const handleToggleStatus = async (farmer: Farmer) => {
    try {
      // Check if farmer has valid ID
      if (!farmer || !farmer.id) {
        setError('Invalid farmer data. Please refresh and try again.');
        return;
      }
      
      // Prevent multiple rapid clicks
      if (togglingFarmerId === farmer.id) return;
      
      setTogglingFarmerId(farmer.id);
      const newStatus = farmer.status === 'Verified' ? 'Unverified' : 'Verified';
      console.log(`Toggling farmer ${farmer.id} status to ${newStatus}`);
      
      const response = await fetch(`http://localhost:5000/api/farmers/${farmer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: farmer.name,
          products: farmer.products || null,
          status: newStatus,
          address: farmer.address || null,
          email: farmer.email
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update farmer status: ${errorText}`);
      }
      
      const updatedFarmer = await response.json();
      console.log('Farmer updated:', updatedFarmer);
      setFarmers(farmers.map(f => f.id === farmer.id ? updatedFarmer : f).sort((a, b) => {
        return a.name.localeCompare(b.name);
      }));
    } catch (err) {
      console.error('Error toggling farmer status:', err);
      setError(err instanceof Error ? err.message : 'Failed to toggle status');
    } finally {
      setTogglingFarmerId(null);
    }
  };

  // Example calculations (you can replace these with real formulas later)
  const activeFarmers = farmers.filter((f) => f.status === "Verified").length;

  const progressValue =
    farmers.length > 0
      ? Math.min((activeFarmers / farmers.length) * 100, 100)
      : 0;

  const handleSort = (column: keyof Farmer) => {
    if (sortColumn === column) {
      // Toggle direction if clicking same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedFarmers = () => {
    if (!sortColumn) return farmers;

    return [...farmers].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      // Handle null/undefined values
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDirection === 'asc' ? 1 : -1;
      if (bVal == null) return sortDirection === 'asc' ? -1 : 1;

      // Handle date columns
      if (sortColumn === 'created_at' || sortColumn === 'updated_at') {
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

  const SortIcon = ({ column }: { column: keyof Farmer }) => {
    if (sortColumn !== column) return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const SortableHeader = ({ column, label }: { column: keyof Farmer; label: string }) => (
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

  if (loading) return <p>Loading farmers...</p>;

  return (
    <div className="space-y-6">
      {/* DELETE FARMER CONFIRMATION DIALOG */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Farmer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingFarmer?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteFarmer}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* CREATE FARMER DIALOG */}
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
              Add Farmer
            </Button>
          </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Farmer</DialogTitle>
            <DialogDescription>Add a new farmer to the system</DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Farmer Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter farmer name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Products</label>
              <Input
                value={formData.products}
                onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                placeholder="e.g., Rice, Corn, Vegetables"
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
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="border rounded-md p-2 text-sm"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
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
              onClick={handleCreateFarmer}
              disabled={!formData.name || !formData.email}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Farmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>

      {/* EDIT FARMER DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Farmer</DialogTitle>
            <DialogDescription>Update farmer details</DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Farmer Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter farmer name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Products</label>
              <Input
                value={formData.products}
                onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                placeholder="e.g., Rice, Corn, Vegetables"
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
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="border rounded-md p-2 text-sm"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateFarmer}
              disabled={!formData.name || !formData.email}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Farmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFarmers}</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFarmers}</div>
            <div className="text-xs text-green-600">Status: Verified</div>
          </CardContent>
        </Card>

       
       
      </div>

      {/* Farmers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Farmers</CardTitle>
          <CardDescription>List of all farmers in the system</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader column="name" label="Name" />
                <SortableHeader column="products" label="Products" />
                <SortableHeader column="address" label="Address" />
                <SortableHeader column="email" label="Email" />
                <SortableHeader column="created_at" label="Created At" />
                <SortableHeader column="status" label="Status" />
                <TableHead className="text-right cursor-default">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {farmers.length > 0 ? (
                getSortedFarmers().map((farmer) => (
                  <TableRow key={farmer.id ? `farmer-${farmer.id}` : `temp-${Math.random()}`}>
                    <TableCell className="text-green-700 font-medium text-[1.1em]">
                      {farmer.name}
                    </TableCell>

                    <TableCell>{farmer.products || "-"}</TableCell>
                    
                    <TableCell>{farmer.address || "-"}</TableCell>
                    <TableCell>{farmer.email || "-"}</TableCell>
                    <TableCell>
                      {new Date(farmer.created_at).toLocaleDateString()}
                    </TableCell>
                    
                    <TableCell>
                      <div 
                        className="flex items-center gap-2 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                        onClick={() => handleToggleStatus(farmer)}
                      >
                        <div className={`w-10 h-6 rounded-full transition-colors ${farmer.status === 'Verified' ? 'bg-green-600' : 'bg-gray-300'} ${togglingFarmerId === farmer.id ? 'opacity-50' : ''}`}>
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${farmer.status === 'Verified' ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                        </div>
                        <span className="text-sm font-medium">
                          {togglingFarmerId === farmer.id ? 'Updating...' : (farmer.status === 'Verified' ? 'Verified' : 'Unverified')}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEditFarmer(farmer)}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-blue-600 cursor-pointer" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(farmer)}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                          title="Archive"
                        >
                          <ArchiveIcon className="h-4 w-4 text-amber-600 cursor-pointer" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No farmers found. Click "Add Farmer" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmersPanel;
