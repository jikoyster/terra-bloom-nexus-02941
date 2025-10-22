
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TreePine, Leaf, Download, TrendingUp, Calendar, Award } from 'lucide-react';

const FarmerCarbonTracker = () => {
  const carbonActivities = [
    { 
      date: '2024-07-10',
      activity: 'Compost Application',
      field: 'North Field',
      area: '2.5 ha',
      carbonOffset: 45,
      method: 'Organic compost (5 tons)',
      status: 'verified'
    },
    { 
      date: '2024-07-05',
      activity: 'Cover Crop Planting',
      field: 'East Field',
      area: '1.8 ha',
      carbonOffset: 32,
      method: 'Legume cover crops',
      status: 'pending'
    },
    { 
      date: '2024-06-28',
      activity: 'No-Till Practice',
      field: 'South Field',
      area: '3.1 ha',
      carbonOffset: 28,
      method: 'Zero tillage maintenance',
      status: 'verified'
    },
    { 
      date: '2024-06-20',
      activity: 'Biochar Application',
      field: 'West Field',
      area: '2.2 ha',
      carbonOffset: 38,
      method: 'Rice husk biochar (2 tons)',
      status: 'verified'
    }
  ];

  const carbonMetrics = {
    totalSequestered: 143,
    monthlyRate: 118,
    yearlyProjection: 1416,
    creditValue: 2832,
    lastCreditSale: '2024-06-15',
    nextAudit: '2024-08-15'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-5 w-5" />
            Carbon Sequestration Tracker
          </CardTitle>
          <CardDescription>Monitor CO₂ offset activities and carbon credit opportunities</CardDescription>
        </CardHeader>
      </Card>

      {/* Carbon Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="font-medium">Total Sequestered</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{carbonMetrics.totalSequestered} kg</p>
            <p className="text-sm text-green-600">This season</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Monthly Rate</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{carbonMetrics.monthlyRate} kg</p>
            <p className="text-sm text-blue-600">July average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Yearly Projection</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">{carbonMetrics.yearlyProjection} kg</p>
            <p className="text-sm text-purple-600">2024 forecast</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-amber-600" />
              <span className="font-medium">Credit Value</span>
            </div>
            <p className="text-2xl font-bold text-amber-800">₱{carbonMetrics.creditValue}</p>
            <p className="text-sm text-amber-600">Potential earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Carbon Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Carbon Sequestration Activities</CardTitle>
          <CardDescription>Detailed log of regenerative practices and their CO₂ impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {carbonActivities.map((activity, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{activity.activity}</h4>
                    <Badge className={getStatusColor(activity.status)} variant="secondary">
                      {activity.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">+{activity.carbonOffset} kg CO₂</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium">{activity.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Field:</span>
                    <p className="font-medium">{activity.field}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Area:</span>
                    <p className="font-medium">{activity.area}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Method:</span>
                    <p className="font-medium">{activity.method}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Carbon Timeline Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Carbon Timeline</CardTitle>
            <CardDescription>CO₂ sequestration trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">July 2024</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">118 kg CO₂ sequestered</span>
                  <Badge className="bg-green-100 text-green-800">+15% vs June</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">June 2024</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">103 kg CO₂ sequestered</span>
                  <Badge className="bg-blue-100 text-blue-800">Peak season</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">May 2024</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-700">89 kg CO₂ sequestered</span>
                  <Badge className="bg-purple-100 text-purple-800">Cover crop</Badge>
                </div>
              </div>
              
              <div className="text-center pt-2">
                <Button variant="outline" size="sm">View Full Timeline</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Carbon Credit Registry</CardTitle>
            <CardDescription>Export data and manage carbon credit sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-800">Credit Status</span>
                </div>
                <div className="text-sm text-amber-700 space-y-1">
                  <p>• Verified credits: 143 kg CO₂</p>
                  <p>• Pending verification: 32 kg CO₂</p>
                  <p>• Next audit: {carbonMetrics.nextAudit}</p>
                  <p>• Last sale: {carbonMetrics.lastCreditSale}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export Registry Data
                </Button>
                <Button variant="outline" className="w-full">
                  Apply for Carbon Credit Certification
                </Button>
                <Button variant="outline" className="w-full">
                  View Marketplace Prices
                </Button>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium mb-1">Regenerative Compliance</p>
                <div className="text-xs text-green-700">
                  <p>✅ No-till practices maintained</p>
                  <p>✅ Cover crops planted seasonally</p>
                  <p>✅ Organic inputs only</p>
                  <p>✅ Biodiversity enhancement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerCarbonTracker;
