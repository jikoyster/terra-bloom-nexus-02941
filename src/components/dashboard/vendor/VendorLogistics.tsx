
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Clock, Phone } from 'lucide-react';

const VendorLogistics = () => {
  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'PO-2024-001',
      customer: 'Green Valley Co-op',
      destination: 'Bukidnon Farm Site A',
      eta: '2024-01-20 14:00',
      status: 'In Transit',
      driver: 'Miguel Santos',
      phone: '+63 912 345 6789',
      vehicle: 'Truck-001'
    },
    {
      id: 'DEL-002',
      orderId: 'PO-2024-003',
      customer: 'Mountain View Farm',
      destination: 'Cagayan de Oro Warehouse',
      eta: '2024-01-21 10:30',
      status: 'Scheduled',
      driver: 'Roberto Cruz',
      phone: '+63 923 456 7890',
      vehicle: 'Truck-002'
    },
    {
      id: 'DEL-003',
      orderId: 'PO-2024-005',
      customer: 'Northern Alliance',
      destination: 'Davao Distribution Center',
      eta: '2024-01-22 09:00',
      status: 'Loading',
      driver: 'Antonio Reyes',
      phone: '+63 934 567 8901',
      vehicle: 'Truck-003'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'Loading':
        return <Badge className="bg-amber-100 text-amber-800">Loading</Badge>;
      case 'In Transit':
        return <Badge className="bg-purple-100 text-purple-800">In Transit</Badge>;
      case 'Delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Logistics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Logistics & Fulfillment</h2>
          <p className="text-muted-foreground">Track deliveries and manage logistics operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Schedule Delivery</Button>
          <Button>Track All</Button>
        </div>
      </div>

      {/* Logistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Active Deliveries</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Delivery Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-amber-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Fleet Vehicles</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deliveries</CardTitle>
          <CardDescription>Scheduled deliveries and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{delivery.orderId}</div>
                    <div className="text-sm text-muted-foreground">{delivery.customer}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.destination}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">ETA: {delivery.eta}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.driver}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{delivery.vehicle}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(delivery.status)}
                  <Button variant="outline" size="sm">Track</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Map Section (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Route Map</CardTitle>
          <CardDescription>Real-time tracking of delivery vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive delivery map coming soon</p>
              <p className="text-sm">Track real-time vehicle locations and routes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorLogistics;
