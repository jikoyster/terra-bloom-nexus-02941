
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Leaf, TrendingUp, DollarSign, Users, BarChart3, Eye, EyeOff } from 'lucide-react';

const FarmDashboard = () => {
  const [showRevenue, setShowRevenue] = useState(false);

  const farmerCarbonData = [
    {
      id: 1,
      name: 'Maria Santos',
      farm: 'Green Valley Farm',
      hectares: 12.5,
      carbonSequestered: 42.8, // tonnes CO2
      creditValue: 1712, // PHP
      practices: ['Cover Cropping', 'Composting', 'No-Till'],
      trend: '+15%',
      lastUpdated: '2024-07-13'
    },
    {
      id: 2,
      name: 'Juan dela Cruz',
      farm: 'Sunrise Organics',
      hectares: 8.3,
      carbonSequestered: 28.6,
      creditValue: 1144,
      practices: ['Agroforestry', 'Biochar', 'Rotational Grazing'],
      trend: '+22%',
      lastUpdated: '2024-07-12'
    },
    {
      id: 3,
      name: 'Rosa Mendoza',
      farm: 'EcoHarvest Co.',
      hectares: 15.2,
      carbonSequestered: 67.3,
      creditValue: 2692,
      practices: ['Permaculture', 'Water Conservation', 'Indigenous Seeds'],
      trend: '+8%',
      lastUpdated: '2024-07-13'
    },
    {
      id: 4,
      name: 'Pedro Reyes',
      farm: 'Sustainable Fields',
      hectares: 6.7,
      carbonSequestered: 19.4,
      creditValue: 776,
      practices: ['Integrated Pest Mgmt', 'Mulching'],
      trend: '+31%',
      lastUpdated: '2024-07-11'
    }
  ];

  const totalCarbonSequestered = farmerCarbonData.reduce((sum, farmer) => sum + farmer.carbonSequestered, 0);
  const totalCreditValue = farmerCarbonData.reduce((sum, farmer) => sum + farmer.creditValue, 0);
  const avgSequestrationPerHa = totalCarbonSequestered / farmerCarbonData.reduce((sum, farmer) => sum + farmer.hectares, 0);

  const carbonOffsetSummary = {
    monthlyTarget: 200,
    actualSequestered: totalCarbonSequestered,
    projectedAnnual: totalCarbonSequestered * 8.5,
    marketPrice: 40, // PHP per tonne CO2
    potentialRevenue: totalCreditValue * 12
  };

  return (
    <div className="space-y-6">
      {/* Toggle and Overview Cards */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">&nbsp;</h2>
        <Button
          variant="outline"
          onClick={() => setShowRevenue(!showRevenue)}
          className="flex items-center gap-2"
        >
          {showRevenue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showRevenue ? 'Hide Revenue' : 'Show Revenue'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Sequestered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCarbonSequestered.toFixed(1)}t</div>
            <div className="text-xs text-green-600">CO₂ this season</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerCarbonData.length}</div>
            <div className="text-xs text-muted-foreground">Participating in program</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg per Hectare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSequestrationPerHa.toFixed(1)}t</div>
            <div className="text-xs text-muted-foreground">CO₂/ha sequestered</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {showRevenue ? 'Credit Value' : 'Monthly Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showRevenue ? (
              <>
                <div className="text-2xl font-bold text-green-600">₱{totalCreditValue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">This season's credits</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{((totalCarbonSequestered / carbonOffsetSummary.monthlyTarget) * 100).toFixed(0)}%</div>
                <Progress value={(totalCarbonSequestered / carbonOffsetSummary.monthlyTarget) * 100} className="mt-2" />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="farmers" className="w-full">
        

        <TabsContent value="farmers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Farms</CardTitle>
              <CardDescription>All validated and officially recorded farms</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Farm Size</TableHead>
                    <TableHead>CO₂ Sequestered</TableHead>
                    {showRevenue && <TableHead>Credit Value</TableHead>}
                    <TableHead>Practices</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmerCarbonData.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{farmer.name}</div>
                          <div className="text-sm text-muted-foreground">{farmer.farm}</div>
                        </div>
                      </TableCell>
                      <TableCell>{farmer.hectares} ha</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{farmer.carbonSequestered}t</span>
                        </div>
                      </TableCell>
                      {showRevenue && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-600">₱{farmer.creditValue.toLocaleString()}</span>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {farmer.practices.slice(0, 2).map((practice, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {practice}
                            </Badge>
                          ))}
                          {farmer.practices.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{farmer.practices.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-sm font-medium">{farmer.trend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={Math.min((farmer.carbonSequestered / farmer.hectares) / avgSequestrationPerHa * 100, 100)} 
                            className="w-16" 
                          />
                          <span className="text-xs text-muted-foreground">
                            {((farmer.carbonSequestered / farmer.hectares) / avgSequestrationPerHa * 100).toFixed(0)}%
                          </span>
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

export default FarmDashboard;
