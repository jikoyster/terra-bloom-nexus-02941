
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Upload, AlertTriangle } from 'lucide-react';

const VendorInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const inventory = [
    {
      sku: 'RS-001',
      name: 'Premium Rice Seeds',
      category: 'Seeds',
      quantity: 150,
      threshold: 20,
      unit: 'kg',
      expiry: '2024-12-15',
      status: 'In Stock'
    },
    {
      sku: 'NPK-025',
      name: 'NPK Fertilizer 14-14-14',
      category: 'Fertilizer',
      quantity: 8,
      threshold: 15,
      unit: 'bags',
      expiry: '2025-06-30',
      status: 'Low Stock'
    },
    {
      sku: 'CS-002',
      name: 'Hybrid Corn Seeds',
      category: 'Seeds',
      quantity: 75,
      threshold: 25,
      unit: 'kg',
      expiry: '2024-08-20',
      status: 'Expiring Soon'
    },
    {
      sku: 'OF-001',
      name: 'Organic Fertilizer',
      category: 'Fertilizer',
      quantity: 0,
      threshold: 10,
      unit: 'bags',
      expiry: '2025-01-15',
      status: 'Out of Stock'
    }
  ];

  const getStatusBadge = (status: string, quantity: number, threshold: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (quantity <= threshold) {
      return <Badge className="bg-amber-100 text-amber-800">Low Stock</Badge>;
    } else if (status === 'Expiring Soon') {
      return <Badge className="bg-orange-100 text-orange-800">Expiring Soon</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Inventory Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-muted-foreground">Manage your product inventory and stock levels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Batch Upload
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by SKU, name, or category..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter by Category</Button>
            <Button variant="outline">Low Stock Only</Button>
            <Button variant="outline">Expiring Soon</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Current stock levels and product information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-medium">{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={item.quantity <= item.threshold && item.quantity > 0 ? 'text-amber-600 font-medium' : item.quantity === 0 ? 'text-red-600 font-medium' : ''}>
                        {item.quantity} {item.unit}
                      </span>
                      {item.quantity <= item.threshold && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.threshold} {item.unit}</TableCell>
                  <TableCell className={new Date(item.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-orange-600' : ''}>
                    {item.expiry}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status, item.quantity, item.threshold)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Restock</Button>
                    </div>
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

export default VendorInventory;
