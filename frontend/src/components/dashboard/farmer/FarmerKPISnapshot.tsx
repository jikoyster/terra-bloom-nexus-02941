
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, TrendingUp, Bug, Leaf, CreditCard } from 'lucide-react';

const FarmerKPISnapshot = () => {
  const kpis = [
    {
      label: 'Active Crop',
      value: 'Maize',
      icon: <Leaf className="h-4 w-4" />,
      status: 'success'
    },
    {
      label: 'EOQ Synced',
      value: '✅ Yes',
      icon: <CheckCircle className="h-4 w-4" />,
      status: 'success'
    },
    {
      label: 'Forecasted Yield',
      value: '4.2 tons',
      icon: <TrendingUp className="h-4 w-4" />,
      status: 'success'
    },
    {
      label: 'Pest Alerts',
      value: '3 Zones',
      icon: <Bug className="h-4 w-4" />,
      status: 'warning'
    },
    {
      label: 'Carbon Sequestered',
      value: '118 kg/month',
      icon: <Leaf className="h-4 w-4" />,
      status: 'success'
    },
    {
      label: 'Credit Score',
      value: '0.82 (Eligible)',
      icon: <CreditCard className="h-4 w-4" />,
      status: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Farm KPI Snapshot
        </CardTitle>
        <CardDescription>Real-time metrics for your regenerative farm operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getStatusColor(kpi.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{kpi.label}</span>
                {kpi.icon}
              </div>
              <div className="text-lg font-bold">{kpi.value}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">Regenerative Compliant</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">Insurance Active</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">Carbon Registry Ready</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmerKPISnapshot;
