
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Droplets, Sprout, Calendar, AlertCircle } from 'lucide-react';

const FarmerVRTEngine = () => {
  const fieldZones = [
    { id: 'Z1', name: 'North Field', area: '2.5 ha', status: 'fertilize', priority: 'high', soilPh: 6.2, moisture: 45, task: 'Apply organic compost' },
    { id: 'Z2', name: 'East Field', area: '1.8 ha', status: 'water', priority: 'medium', soilPh: 6.8, moisture: 32, task: 'Increase irrigation' },
    { id: 'Z3', name: 'South Field', area: '3.1 ha', status: 'rest', priority: 'low', soilPh: 7.1, moisture: 68, task: 'Monitor growth' },
    { id: 'Z4', name: 'West Field', area: '2.2 ha', status: 'fertilize', priority: 'high', soilPh: 5.8, moisture: 41, task: 'pH adjustment needed' }
  ];

  const dailyTasks = [
    { time: '06:00', zone: 'Z1', task: 'Apply organic compost to North Field', priority: 'high', estimated: '2 hours' },
    { time: '09:00', zone: 'Z4', task: 'Test and adjust soil pH in West Field', priority: 'high', estimated: '1.5 hours' },
    { time: '14:00', zone: 'Z2', task: 'Increase irrigation in East Field', priority: 'medium', estimated: '45 minutes' },
    { time: '16:00', zone: 'Z3', task: 'Monitor crop growth in South Field', priority: 'low', estimated: '30 minutes' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fertilize': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'water': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rest': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Variable Rate Technology (VRT) Engine
          </CardTitle>
          <CardDescription>Zone-based field management with AI recommendations</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field Zones Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Field Zone Status</CardTitle>
            <CardDescription>Color-coded recommendations by soil analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {fieldZones.map((zone) => (
                <div key={zone.id} className={`p-4 rounded-lg border-2 ${getStatusColor(zone.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{zone.name}</h3>
                    <Badge className={getPriorityColor(zone.priority)} variant="secondary">
                      {zone.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Area:</span> {zone.area}</p>
                    <p><span className="font-medium">pH:</span> {zone.soilPh}</p>
                    <p><span className="font-medium">Moisture:</span> {zone.moisture}%</p>
                  </div>
                  
                  <div className="mt-3 p-2 bg-white/80 rounded text-xs">
                    <strong>Action:</strong> {zone.task}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-amber-300 rounded"></div>
                <span>Fertilize</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-blue-300 rounded"></div>
                <span>Water</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-green-300 rounded"></div>
                <span>Rest/Monitor</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's VRT Tasks
            </CardTitle>
            <CardDescription>Auto-generated actions based on field analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="text-sm font-mono text-muted-foreground min-w-[50px]">
                    {task.time}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{task.zone}</Badge>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`} variant="secondary">
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm font-medium mb-1">{task.task}</p>
                    <p className="text-xs text-muted-foreground">Est. time: {task.estimated}</p>
                  </div>
                  
                  <Button size="sm" variant="outline">Start</Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Weather Alert</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Rain expected tomorrow afternoon. Consider adjusting irrigation schedule.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Soil Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Field Analytics Summary</CardTitle>
          <CardDescription>Aggregated insights from soil sensors and field data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Average Moisture</span>
              </div>
              <p className="text-2xl font-bold text-blue-800">46.5%</p>
              <p className="text-sm text-blue-600">Optimal for current growth stage</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="h-5 w-5 text-green-600" />
                <span className="font-medium">Soil Health Score</span>
              </div>
              <p className="text-2xl font-bold text-green-800">8.2/10</p>
              <p className="text-sm text-green-600">Excellent regenerative practices</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span className="font-medium">Action Items</span>
              </div>
              <p className="text-2xl font-bold text-amber-800">3</p>
              <p className="text-sm text-amber-600">High priority tasks pending</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerVRTEngine;
