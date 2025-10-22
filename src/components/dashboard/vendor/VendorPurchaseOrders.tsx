
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, MapPin, FileText } from 'lucide-react';

const VendorPurchaseOrders = () => {
  const orders = [
    {
      id: 'PO-2024-001',
      customer: 'Green Valley Co-op',
      contact: 'Maria Santos',
      items: ['Premium Rice Seeds (50kg)', 'NPK Fertilizer (10 bags)'],
      totalValue: '₱15,750',
      deliveryDate: '2024-01-20',
      location: 'Bukidnon',
      status: 'New',
      notes: 'Urgent delivery required for planting season'
    },
    {
      id: 'PO-2024-002',
      customer: 'Mountain View Farm',
      contact: 'Carlos Rivera',
      items: ['Organic Fertilizer (25 bags)', 'Hybrid Corn Seeds (30kg)'],
      totalValue: '₱28,400',
      deliveryDate: '2024-01-25',
      location: 'Cagayan de Oro',
      status: 'Processing',
      notes: 'Split delivery acceptable'
    },
    {
      id: 'PO-2024-003',
      customer: 'Northern Farmers Alliance',
      contact: 'Ana Delgado',
      items: ['Premium Rice Seeds (100kg)', 'Pesticide Spray (5L)'],
      totalValue: '₱32,150',
      deliveryDate: '2024-01-30',
      location: 'Davao',
      status: 'Ready to Ship',
      notes: 'COD payment preferred'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <Badge variant="default">New</Badge>;
      case 'Processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'Ready to Ship':
        return <Badge className="bg-green-100 text-green-800">Ready to Ship</Badge>;
      case 'Shipped':
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case 'Delivered':
        return <Badge className="bg-emerald-100 text-emerald-800">Delivered</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Orders Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Purchase Orders</h2>
          <p className="text-muted-foreground">Manage incoming orders from cooperatives and farms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Orders</Button>
          <Button variant="outline">Generate Invoice</Button>
        </div>
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-muted-foreground">Active Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">₱125,400</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">5</div>
            <div className="text-sm text-muted-foreground">Pending Delivery</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-muted-foreground">Ready to Ship</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Orders</CardTitle>
          <CardDescription>All purchase orders requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-sm">{item}</div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">{order.totalValue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{order.deliveryDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{order.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Process</Button>
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

export default VendorPurchaseOrders;
