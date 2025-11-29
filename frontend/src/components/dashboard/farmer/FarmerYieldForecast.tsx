
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, Target, BarChart, Calendar } from 'lucide-react';

const FarmerYieldForecast = () => {
  const yieldForecasts = [
    { 
      field: 'North Field (Z1)', 
      crop: 'Maize', 
      area: '2.5 ha', 
      predicted: 4.2, 
      target: 4.0, 
      confidence: 85,
      harvestDate: '2024-10-15',
      status: 'on-track'
    },
    { 
      field: 'East Field (Z2)', 
      crop: 'Maize', 
      area: '1.8 ha', 
      predicted: 2.8, 
      target: 3.2, 
      confidence: 78,
      harvestDate: '2024-10-20',
      status: 'below-target'
    },
    { 
      field: 'South Field (Z3)', 
      crop: 'Maize', 
      area: '3.1 ha', 
      predicted: 5.1, 
      target: 4.8, 
      confidence: 92,
      harvestDate: '2024-10-10',
      status: 'above-target'
    },
    { 
      field: 'West Field (Z4)', 
      crop: 'Maize', 
      area: '2.2 ha', 
      predicted: 3.6, 
      target: 3.5, 
      confidence: 80,
      harvestDate: '2024-10-18',
      status: 'on-track'
    }
  ];

  const marketDemand = [
    { 
      buyer: 'Mindanao Rice Mill Co-op', 
      product: 'Premium Maize', 
      quantity: '8 tons', 
      price: '₱18,500/ton',
      deadline: '2024-10-25',
      match: 'good'
    },
    { 
      buyer: 'Local Feed Mill', 
      product: 'Feed Grade Maize', 
      quantity: '12 tons', 
      price: '₱16,200/ton',
      deadline: '2024-11-05',
      match: 'excellent'
    },
    { 
      buyer: 'Organic Food Processor', 
      product: 'Organic Maize', 
      quantity: '5 tons', 
      price: '₱22,000/ton',
      deadline: '2024-10-30',
      match: 'partial'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above-target': return 'bg-green-100 text-green-800 border-green-300';
      case 'on-track': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'below-target': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getMatchColor = (match: string) => {
    switch (match) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPredicted = yieldForecasts.reduce((sum, field) => sum + field.predicted, 0);
  const totalTarget = yieldForecasts.reduce((sum, field) => sum + field.target, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Yield & Demand Forecast Engine
          </CardTitle>
          <CardDescription>Predict harvests and match with market opportunities</CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Total Forecast</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{totalPredicted.toFixed(1)} tons</p>
            <p className="text-sm text-blue-600">vs {totalTarget.toFixed(1)} tons target</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="h-5 w-5 text-green-600" />
              <span className="font-medium">Market Value</span>
            </div>
            <p className="text-2xl font-bold text-green-800">₱246,400</p>
            <p className="text-sm text-green-600">Estimated revenue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Harvest Window</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">Oct 10-20</p>
            <p className="text-sm text-purple-600">Peak harvest period</p>
          </CardContent>
        </Card>
      </div>

      {/* Field-by-Field Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Field Yield Predictions</CardTitle>
          <CardDescription>Individual field performance and harvest timing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yieldForecasts.map((forecast, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getStatusColor(forecast.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{forecast.field}</h3>
                  <Badge className={getStatusColor(forecast.status)} variant="secondary">
                    {forecast.status.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Predicted:</span>
                    <span className="font-bold">{forecast.predicted} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target:</span>
                    <span>{forecast.target} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span>{forecast.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harvest:</span>
                    <span>{forecast.harvestDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Area:</span>
                    <span>{forecast.area}</span>
                  </div>
                </div>
                
                {forecast.status === 'below-target' && (
                  <div className="mt-3 p-2 bg-white/80 rounded text-xs">
                    <strong>EOQ Alert:</strong> Input forecast may be misaligned. Consider adjusting fertilizer application.
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Demand Matching */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Market Demand Matching</CardTitle>
          <CardDescription>Current buyer requests matched to your predicted harvest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketDemand.map((demand, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{demand.buyer}</h4>
                  <Badge className={getMatchColor(demand.match)} variant="secondary">
                    {demand.match} match
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Product:</span>
                    <p className="font-medium">{demand.product}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <p className="font-medium">{demand.quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <p className="font-medium text-green-600">{demand.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <p className="font-medium">{demand.deadline}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm">Express Interest</Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Production Alert</span>
            </div>
            <p className="text-sm text-amber-700">
              Current forecast shows 15.7 tons total vs 20 tons total market demand. 
              Consider expanding next season or adjusting buyer commitments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerYieldForecast;
