import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { AlertCircle, Plus, Edit, Delete, Trash2Icon, ArchiveIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

interface Cooperative {
  coop_id: number;
  name: string;
  registration_no: string | null;
  status: string;
  address: string | null;
  region: string | null;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  established_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  members_count: number | null;
}

const CoopPanel: React.FC = () => {
  const [coops, setCoops] = useState<Cooperative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCoop, setEditingCoop] = useState<Cooperative | null>(null);
  const [deletingCoop, setDeletingCoop] = useState<Cooperative | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    registration_no: '',
    status: 'Active',
    address: '',
    region: '',
    contact_person: '',
    phone: '',
    email: '',
    established_at: ''
  });

  useEffect(() => {
    const fetchCoops = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cooperatives");
        if (!res.ok) throw new Error("Failed to fetch cooperatives");

        const data: Cooperative[] = await res.json();
        setCoops(data);
      } catch (err) {
        console.error("Error fetching cooperatives:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoops();
  }, []);

  const resetCreateForm = () => {
    setFormData({
      name: '',
      registration_no: '',
      status: 'Active',
      address: '',
      region: '',
      contact_person: '',
      phone: '',
      email: '',
      established_at: ''
    });
    setError(null);
  };

  const handleCreateCoop = async () => {
    try {
      if (!formData.name) {
        setError('Cooperative name is required');
        return;
      }

      const payload = {
        name: formData.name,
        registration_no: formData.registration_no || null,
        status: formData.status || 'Active',
        address: formData.address || null,
        region: formData.region || null,
        contact_person: formData.contact_person || null,
        phone: formData.phone || null,
        email: formData.email || null,
        established_at: formData.established_at || null
      };

      const response = await fetch('http://localhost:5000/api/cooperatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create cooperative');
      
      const newCoop = await response.json();
      setCoops([...coops, newCoop]);
      setIsCreateDialogOpen(false);
      resetCreateForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating cooperative:', err);
    }
  };

  const handleEditCoop = (coop: Cooperative) => {
    setEditingCoop(coop);
    setFormData({
      name: coop.name || '',
      registration_no: coop.registration_no || '',
      status: coop.status || 'Active',
      address: coop.address || '',
      region: coop.region || '',
      contact_person: coop.contact_person || '',
      phone: coop.phone || '',
      email: coop.email || '',
      established_at: coop.established_at || ''
    });
    setError(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCoop = async () => {
    try {
      if (!editingCoop) return;
      if (!formData.name) {
        setError('Cooperative name is required');
        return;
      }

      const payload = {
        name: formData.name,
        registration_no: formData.registration_no || null,
        status: formData.status || 'Active',
        address: formData.address || null,
        region: formData.region || null,
        contact_person: formData.contact_person || null,
        phone: formData.phone || null,
        email: formData.email || null,
        established_at: formData.established_at || null
      };

      const response = await fetch(`http://localhost:5000/api/cooperatives/${editingCoop.coop_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to update cooperative');
      
      const updatedCoop = await response.json();
      setCoops(coops.map(c => c.coop_id === editingCoop.coop_id ? updatedCoop : c));
      setIsEditDialogOpen(false);
      setEditingCoop(null);
      resetCreateForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating cooperative:', err);
    }
  };

  const handleDeleteClick = (coop: Cooperative) => {
    setDeletingCoop(coop);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCoop = async () => {
    try {
      if (!deletingCoop) return;

      const response = await fetch(`http://localhost:5000/api/cooperatives/${deletingCoop.coop_id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete cooperative');
      
      setCoops(coops.filter(c => c.coop_id !== deletingCoop.coop_id));
      setIsDeleteDialogOpen(false);
      setDeletingCoop(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting cooperative:', err);
    }
  };

  const activateCoops = coops.filter((c) => c.status === "Active").length;

  if (loading) return <p>Loading cooperatives...</p>;

  return (
    <div className="space-y-6">
      {/* DELETE COOPERATIVE CONFIRMATION DIALOG */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Cooperative</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingCoop?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteCoop}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* CREATE COOPERATIVE DIALOG */}
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
              Add Cooperative
            </Button>
          </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Cooperative</DialogTitle>
            <DialogDescription>Add a new cooperative to the system</DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Cooperative Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter cooperative name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Registration No.</label>
              <Input
                value={formData.registration_no}
                onChange={(e) => setFormData({ ...formData, registration_no: e.target.value })}
                placeholder="Enter registration number"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Region</label>
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
              <label className="text-sm font-medium">Contact Person</label>
              <Input
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                placeholder="Enter contact person name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="border rounded-md p-2 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Established At</label>
              <Input
                type="date"
                value={formData.established_at}
                onChange={(e) => setFormData({ ...formData, established_at: e.target.value })}
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
              onClick={handleCreateCoop}
              disabled={!formData.name}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Cooperative
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>

      {/* EDIT COOPERATIVE DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Cooperative</DialogTitle>
            <DialogDescription>Update cooperative details</DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Cooperative Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter cooperative name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Registration No.</label>
              <Input
                value={formData.registration_no}
                onChange={(e) => setFormData({ ...formData, registration_no: e.target.value })}
                placeholder="Enter registration number"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Region</label>
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
              <label className="text-sm font-medium">Contact Person</label>
              <Input
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                placeholder="Enter contact person name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="border rounded-md p-2 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Established At</label>
              <Input
                type="date"
                value={formData.established_at}
                onChange={(e) => setFormData({ ...formData, established_at: e.target.value })}
              />
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
              onClick={handleUpdateCoop}
              disabled={!formData.name}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Cooperative
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cooperatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coops.length}</div>
            <div className="text-xs text-muted-foreground">Registered</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Cooperatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activateCoops}</div>
            <div className="text-xs text-green-600">Status: Active</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Cooperatives Directory</CardTitle>
            <CardDescription>
              All registered cooperatives in the platform
            </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>
                  Contact Person/
                  Phone/
                  Email
                </TableHead>
                <TableHead>Established</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {coops.length > 0 ? (
                coops.map((coop) => (
                  <TableRow key={coop.coop_id}>
                    <TableCell className='text-[1em] w-[12%] font-medium text-green-700'>{coop.name}</TableCell>
                    <TableCell>{coop.registration_no || "-"}</TableCell>
                    <TableCell>{coop.address || "-"}</TableCell>
                    <TableCell>{coop.region || "-"}</TableCell>
                    <TableCell>
                      <div className="font-bold">{coop.contact_person || "-"}</div>
                      <div>{coop.phone || "-"}</div>
                      <div>{coop.email || "-"}</div>
                    </TableCell>
                    <TableCell>
                      {coop.established_at
                        ? new Date(coop.established_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{coop.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEditCoop(coop)}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-blue-600 cursor-pointer" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(coop)}
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
                  <TableCell colSpan={8} className="text-center py-8">
                    No cooperatives found. Click "Add Cooperative" to create one.
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

export default CoopPanel;
