
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

const FarmersPanel = () => {
  const farmers = [
    {
      id: 1,
      name: 'Maria Santos',
      location: 'Plot A-12',
      crop: 'Rice',
      yield: '4.2 tons/ha',
      profitability: 85,
      financing: 'Eligible',
      carbonContrib: '120 kg CO₂',
      insurance: 'Active',
      riskLevel: 'Low'
    },
    {
      id: 2,
      name: 'Juan dela Cruz',
      location: 'Plot B-08',
      crop: 'Corn',
      yield: '3.8 tons/ha',
      profitability: 72,
      financing: 'Pending',
      carbonContrib: '95 kg CO₂',
      insurance: 'Claim Filed',
      riskLevel: 'Medium'
    },
    {
      id: 3,
      name: 'Rosa Mendoza',
      location: 'Plot C-15',
      crop: 'Vegetables',
      yield: '8.5 tons/ha',
      profitability: 92,
      financing: 'Approved',
      carbonContrib: '180 kg CO₂',
      insurance: 'Active',
      riskLevel: 'Low'
    }
  ];

  const getRiskBadge = (risk: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Yield This Season</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.5 tons/ha</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% vs last season
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Profitability Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +5% improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Carbon Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245 kg CO₂</div>
            <div className="text-xs text-muted-foreground">Total offset this quarter</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">Pending validation</div>
          </CardContent>
        </Card>
      </div>

      {/* Farmers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Farmer Performance Overview</CardTitle>
          <CardDescription>Track yield, profitability, and risk metrics for all farmers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Profitability</TableHead>
                <TableHead>Financing</TableHead>
                <TableHead>Carbon</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {farmer.location}
                    </div>
                  </TableCell>
                  <TableCell>{farmer.crop}</TableCell>
                  <TableCell>{farmer.yield}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-12 h-2 bg-gray-200 rounded mr-2">
                        <div 
                          className="h-2 bg-green-500 rounded" 
                          style={{ width: `${farmer.profitability}%` }}
                        />
                      </div>
                      {farmer.profitability}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={farmer.financing === 'Approved' ? 'default' : 'secondary'}>
                      {farmer.financing}
                    </Badge>
                  </TableCell>
                  <TableCell>{farmer.carbonContrib}</TableCell>
                  <TableCell>
                    <Badge variant={farmer.insurance === 'Active' ? 'default' : 'destructive'}>
                      {farmer.insurance}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskBadge(farmer.riskLevel)}>
                      {farmer.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ERP Integration Preview */}
      <Card>
        <CardHeader>
          <CardTitle>ERP Integration - Field Activity Logs</CardTitle>
          <CardDescription>Real-time tracking of farming activities and costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Fertilizer Application - Plot A-12</p>
                  <p className="text-sm text-muted-foreground">Cost: ₱2,400 | Applied: 50kg organic compost</p>
                </div>
              </div>
              <Badge>Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Pest Control - Plot B-08</p>
                  <p className="text-sm text-muted-foreground">Cost: ₱1,200 | Scheduled for tomorrow</p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmersPanel;
