
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, AlertTriangle, CheckCircle, Clock, Search, Filter, Plus } from 'lucide-react';

const ERPLayer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const purchaseOrders = [
    {
      id: 'PO-001',
      farmer: 'Maria Santos',
      vendor: 'AgriSupply Pro',
      items: ['Rice Seeds - 50kg', 'Fertilizer - 25kg'],
      total: '₱3,500',
      status: 'pending',
      dueDate: '2024-01-20',
      priority: 'high'
    },
    {
      id: 'PO-002',
      farmer: 'Juan Dela Cruz',
      vendor: 'Organic Solutions Inc',
      items: ['Bio-fertilizer - 40kg'],
      total: '₱2,200',
      status: 'approved',
      dueDate: '2024-01-18',
      priority: 'medium'
    },
    {
      id: 'PO-003',
      farmer: 'Rosa Miguel',
      vendor: 'GreenPack Materials',
      items: ['Sacks - 100pcs', 'Labels - 500pcs'],
      total: '₱1,800',
      status: 'delivered',
      dueDate: '2024-01-15',
      priority: 'low'
    }
  ];

  const inventoryItems = [
    {
      id: 'INV-001',
      product: 'Rice Seeds Premium',
      vendor: 'AgriSupply Pro',
      stock: 150,
      threshold: 50,
      unit: 'kg',
      lastUpdated: '2024-01-16',
      status: 'good'
    },
    {
      id: 'INV-002',
      product: 'Organic Compost',
      vendor: 'Organic Solutions Inc',
      stock: 25,
      threshold: 30,
      unit: 'bags',
      lastUpdated: '2024-01-16',
      status: 'low'
    },
    {
      id: 'INV-003',
      product: 'Irrigation Pipes',
      vendor: 'Farm Tech Supply',
      stock: 5,
      threshold: 20,
      unit: 'pcs',
      lastUpdated: '2024-01-15',
      status: 'critical'
    }
  ];

  const deliveryTasks = [
    {
      id: 'DEL-001',
      order: 'PO-001',
      farmer: 'Maria Santos',
      items: 'Rice Seeds + Fertilizer',
      driver: 'Pedro Gonzales',
      eta: '2024-01-20 10:00 AM',
      status: 'in_transit'
    },
    {
      id: 'DEL-002',
      order: 'PO-004',
      farmer: 'Carlos Reyes',
      items: 'Organic Pesticide',
      driver: 'Ana Lopez',
      eta: '2024-01-19 2:00 PM',
      status: 'scheduled'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'outline' as const, color: 'text-yellow-600', text: 'Pending' },
      approved: { variant: 'default' as const, color: 'text-blue-600', text: 'Approved' },
      delivered: { variant: 'secondary' as const, color: 'text-green-600', text: 'Delivered' },
      in_transit: { variant: 'default' as const, color: 'text-blue-600', text: 'In Transit' },
      scheduled: { variant: 'outline' as const, color: 'text-orange-600', text: 'Scheduled' },
      good: { variant: 'secondary' as const, color: 'text-green-600', text: 'Good' },
      low: { variant: 'outline' as const, color: 'text-yellow-600', text: 'Low Stock' },
      critical: { variant: 'destructive' as const, color: 'text-red-600', text: 'Critical' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { variant: 'destructive' as const, text: 'High' },
      medium: { variant: 'outline' as const, text: 'Medium' },
      low: { variant: 'secondary' as const, text: 'Low' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ERP Integration Layer</h2>
          <p className="text-muted-foreground">Manage purchase orders, inventory, and logistics</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Purchase Order
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">₱24,500 total value</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-600" />
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">ETA within 24hrs</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-red-600">Requires reordering</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-green-600">On schedule</div>
          </CardContent>
        </Card>
      </div>

      {/* Main ERP Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Purchase Orders</CardTitle>
                  <CardDescription>Manage farmer-vendor purchase orders and approvals</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.farmer}</TableCell>
                      <TableCell>{order.vendor}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm">{item}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{order.total}</TableCell>
                      <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          {order.status === 'pending' && (
                            <Button size="sm">Approve</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track vendor inventory levels and reorder thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.vendor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{item.stock} {item.unit}</span>
                          {item.stock <= item.threshold && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.threshold} {item.unit}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Update</Button>
                          {item.status === 'low' || item.status === 'critical' ? (
                            <Button size="sm">Reorder</Button>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Management</CardTitle>
              <CardDescription>Track deliveries and logistics coordination</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryTasks.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.order}</TableCell>
                      <TableCell>{delivery.farmer}</TableCell>
                      <TableCell>{delivery.items}</TableCell>
                      <TableCell>{delivery.driver}</TableCell>
                      <TableCell>{delivery.eta}</TableCell>
                      <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">Track</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ERPLayer;
