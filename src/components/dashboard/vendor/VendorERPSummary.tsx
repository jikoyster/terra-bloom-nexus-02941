
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Truck, AlertTriangle } from 'lucide-react';

const VendorERPSummary = () => {
  const metrics = [
    {
      title: 'Inventory SKUs',
      value: '23',
      icon: Package,
      trend: '+2 this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active POs',
      value: '8',
      icon: ShoppingCart,
      trend: '₱125,400 total',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'On-Time Deliveries',
      value: '95%',
      icon: Truck,
      trend: 'This quarter',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Stockouts This Week',
      value: '2',
      icon: AlertTriangle,
      trend: 'Need restocking',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`w-10 h-10 ${metric.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric.trend}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VendorERPSummary;
