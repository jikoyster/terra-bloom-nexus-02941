
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, Camera, Mic, Download, Plus, Search } from 'lucide-react';

interface FarmerJournalProps {
  preview?: boolean;
}

const FarmerJournal = ({ preview = false }: FarmerJournalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const journalEntries = [
    {
      date: '2024-07-12',
      time: '06:30',
      type: 'task',
      activity: 'Compost Application',
      field: 'North Field',
      details: 'Applied 2 tons organic compost to Zone 1. Soil moisture 45%. Good earthworm activity observed.',
      resources: { compost: '2 tons', labor: '2 hours', water: '200L' },
      compliance: ['organic', 'regenerative'],
      attachments: ['photo1.jpg', 'soil_test.pdf']
    },
    {
      date: '2024-07-11',
      time: '14:00',
      type: 'observation',
      activity: 'Pest Monitoring',
      field: 'East Field',
      details: 'Aphid population stable. Beneficial insects (ladybugs) active. No intervention needed.',
      resources: {},
      compliance: ['ipm', 'organic'],
      attachments: ['pest_count.jpg']
    },
    {
      date: '2024-07-10',
      time: '08:00',
      type: 'input',
      activity: 'Irrigation Adjustment',
      field: 'South Field',
      details: 'Increased drip irrigation duration by 30 minutes due to rising temperatures.',
      resources: { water: '500L', electricity: '2kWh' },
      compliance: ['water-efficient'],
      attachments: []
    },
    {
      date: '2024-07-09',
      time: '16:00',
      type: 'planning',
      activity: 'Cover Crop Planning',
      field: 'West Field',
      details: 'Ordered legume seeds for post-harvest cover cropping. Estimated 50kg needed.',
      resources: { seeds: '50kg (ordered)' },
      compliance: ['soil-health', 'regenerative'],
      attachments: ['seed_order.pdf']
    }
  ];

  const upcomingTasks = [
    { date: '2024-07-13', task: 'pH testing in West Field', priority: 'high', source: 'VRT' },
    { date: '2024-07-14', task: 'Pest trap inspection', priority: 'medium', source: 'Pest System' },
    { date: '2024-07-15', task: 'Compost turning', priority: 'low', source: 'Manual' },
    { date: '2024-07-16', task: 'Harvest readiness check', priority: 'high', source: 'Yield Forecast' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'observation': return 'bg-green-100 text-green-800';
      case 'input': return 'bg-purple-100 text-purple-800';
      case 'planning': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const filteredEntries = journalEntries.filter(entry =>
    entry.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayEntries = preview ? filteredEntries.slice(0, 3) : filteredEntries;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {preview ? 'Recent Journal Entries' : 'Regenerative Digital Farm Journal'}
        </CardTitle>
        <CardDescription>
          {preview 
            ? 'Latest activity logs and compliance tracking'
            : 'Comprehensive logging of daily tasks, observations, and regenerative practices'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!preview && (
          <Tabs defaultValue="entries" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="entries">Journal Entries</TabsTrigger>
              <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
              <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="entries" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search journal entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Entry
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Photo
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Mic className="h-4 w-4" />
                    Voice
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-muted-foreground">
                          {task.date} | Source: {task.source}
                        </p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="summary">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">This Week's Activity</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 4 journal entries logged</p>
                    <p>• 3 regenerative practices completed</p>
                    <p>• 100% organic compliance maintained</p>
                    <p>• 2 tons compost applied</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Export to Co-op
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <div className="space-y-4 mt-4">
          {displayEntries.map((entry, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{entry.activity}</span>
                  <Badge className={getTypeColor(entry.type)} variant="secondary">
                    {entry.type}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {entry.date} at {entry.time}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Field:</span>
                  <Badge variant="outline">{entry.field}</Badge>
                </div>
                
                <p className="text-sm">{entry.details}</p>
                
                {Object.keys(entry.resources).length > 0 && (
                  <div className="text-sm">
                    <span className="font-medium">Resources used: </span>
                    {Object.entries(entry.resources).map(([key, value], idx) => (
                      <span key={idx} className="mr-2">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1">
                  {entry.compliance.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {entry.attachments.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Attachments: {entry.attachments.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {preview && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View Full Journal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FarmerJournal;
