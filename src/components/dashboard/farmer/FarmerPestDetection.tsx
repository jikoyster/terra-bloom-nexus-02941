
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bug, TrendingUp, AlertTriangle, Shield, Camera } from 'lucide-react';

const FarmerPestDetection = () => {
  const pestDetections = [
    { 
      trap: 'T1-North', 
      zone: 'Z1', 
      species: 'Corn Borer', 
      count: 12, 
      severity: 'medium', 
      trend: 'increasing',
      lastCheck: '2024-07-12',
      recommendation: 'Apply neem oil treatment'
    },
    { 
      trap: 'T2-East', 
      zone: 'Z2', 
      species: 'Aphids', 
      count: 28, 
      severity: 'high', 
      trend: 'stable',
      lastCheck: '2024-07-12',
      recommendation: 'Release ladybugs, increase monitoring'
    },
    { 
      trap: 'T3-South', 
      zone: 'Z3', 
      species: 'Thrips', 
      count: 5, 
      severity: 'low', 
      trend: 'decreasing',
      lastCheck: '2024-07-11',
      recommendation: 'Continue current practices'
    },
    { 
      trap: 'T4-West', 
      zone: 'Z4', 
      species: 'Cutworm', 
      count: 18, 
      severity: 'high', 
      trend: 'increasing',
      lastCheck: '2024-07-12',
      recommendation: 'Apply biological control agents'
    }
  ];

  const organicTreatments = [
    { name: 'Neem Oil Spray', target: 'Corn Borer, Aphids', application: '2 weeks', cost: '₱150/L' },
    { name: 'Beneficial Insects', target: 'Aphids, Thrips', application: 'Monthly release', cost: '₱800/release' },
    { name: 'Diatomaceous Earth', target: 'Cutworm, General', application: '3 weeks', cost: '₱200/kg' },
    { name: 'Bacillus thuringiensis', target: 'Corn Borer, Cutworm', application: '2 weeks', cost: '₱300/pack' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      case 'stable': return <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Burlese-Tullgren Pest Detection System
          </CardTitle>
          <CardDescription>Real-time arthropod monitoring and organic pest management</CardDescription>
        </CardHeader>
      </Card>

      {/* Pest Detection Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Field Pest Heatmap</CardTitle>
          <CardDescription>Current pest pressure by zone and trap location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pestDetections.map((detection, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getSeverityColor(detection.severity)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{detection.trap}</h3>
                    <Badge variant="outline" className="text-xs">{detection.zone}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(detection.trend)}
                    <span className="text-xs capitalize">{detection.trend}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{detection.species}</span>
                    <span className="text-2xl font-bold">{detection.count}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <p>Last checked: {detection.lastCheck}</p>
                  </div>
                  
                  <div className="mt-3 p-2 bg-white/80 rounded text-xs">
                    <strong>Recommended Action:</strong>
                    <p>{detection.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Insurance Alert Triggered</span>
            </div>
            <p className="text-sm text-red-700">
              High pest pressure detected in 2 zones. Consider filing pest damage claim if threshold exceeded.
            </p>
            <Button size="sm" variant="outline" className="mt-2">
              File Insurance Claim
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Organic Treatment Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Organic Treatment Options
            </CardTitle>
            <CardDescription>Regenerative pest control solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {organicTreatments.map((treatment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{treatment.name}</h4>
                    <span className="text-sm font-semibold text-green-600">{treatment.cost}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Targets: {treatment.target}</p>
                  <p className="text-xs text-gray-500">Application: {treatment.application}</p>
                  <Button size="sm" className="mt-2 w-full">
                    Order Treatment
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pest Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pest Activity Timeline</CardTitle>
            <CardDescription>Historical trends and predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">This Week's Pattern</h4>
                <div className="text-sm text-blue-700">
                  <p>• Corn borer activity increased 40%</p>
                  <p>• Aphid population stabilizing</p>
                  <p>• Thrips declining due to treatments</p>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-2">Weather Impact</h4>
                <p className="text-sm text-amber-700">
                  Upcoming humid conditions may increase aphid reproduction. 
                  Consider preventive measures.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Success Metrics</h4>
                <div className="text-sm text-green-700">
                  <p>• 65% reduction in thrips vs. last month</p>
                  <p>• Beneficial insect population up 30%</p>
                  <p>• Zero chemical treatments this season</p>
                </div>
              </div>
              
              <Button className="w-full gap-2">
                <Camera className="h-4 w-4" />
                Upload Trap Photos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerPestDetection;
