import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Edit, Eye, MessageSquare, Calendar, MapPin, DollarSign, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TradeApprovalPanel = () => {
  const { toast } = useToast();
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState('');
  const [reviewNote, setReviewNote] = useState('');

  const pendingTrades = [
    {
      id: 1,
      trader: 'Maria Santos',
      traderType: 'farmer',
      title: 'Organic Corn - 2.5 tons',
      type: 'produce',
      price: '$1,250',
      location: 'Green Valley Farm',
      submitted: '2024-07-13 14:30',
      description: 'Fresh organic corn, harvested last week. Non-GMO certified.',
      quantity: '2.5 tons',
      availability: 'Next 2 weeks',
      images: 2,
      riskLevel: 'low'
    },
    {
      id: 2,
      trader: 'AgriSupply Pro',
      traderType: 'vendor',
      title: 'Premium Tomato Seeds - 50kg',
      type: 'seeds',
      price: '$125/kg',
      location: 'Central Warehouse',
      submitted: '2024-07-13 09:15',
      description: 'High-yield tomato seeds with organic certification.',
      quantity: '50 kg',
      availability: 'Immediate',
      images: 3,
      riskLevel: 'low'
    },
    {
      id: 3,
      trader: 'John Peterson',
      traderType: 'farmer',
      title: 'Fresh Lettuce - 800kg',
      type: 'produce',
      price: 'Trade for compost',
      location: 'Riverside Farm',
      submitted: '2024-07-12 16:45',
      description: 'Crisp organic lettuce, ready for immediate pickup.',
      quantity: '800 kg',
      availability: 'Must move in 3 days',
      images: 1,
      riskLevel: 'medium'
    }
  ];

  const recentlyApproved = [
    {
      id: 4,
      trader: 'Green Roots Farm',
      title: 'Organic Compost - 15 cubic meters',
      type: 'compost',
      price: '$45/cubic meter',
      approvedDate: '2024-07-12',
      status: 'active'
    },
    {
      id: 5,
      trader: 'EcoSeeds Ltd',
      title: 'Heirloom Bean Seeds - 25kg',
      type: 'seeds',
      price: '$85/kg',
      approvedDate: '2024-07-11',
      status: 'active'
    }
  ];

  const handleTradeAction = (tradeId: number, action: 'approve' | 'reject' | 'request-edit') => {
    setSelectedTrade(tradeId);
    setReviewAction(action);
    setReviewModal(true);
  };

  const confirmAction = () => {
    const actionText = {
      'approve': 'approved',
      'reject': 'rejected',
      'request-edit': 'marked for revision'
    }[reviewAction];

    toast({
      title: `Trade ${actionText}`,
      description: `The trade listing has been ${actionText} and the trader has been notified.`,
    });

    setReviewModal(false);
    setReviewNote('');
    setSelectedTrade(null);
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      'produce': '🌽 Produce',
      'seeds': '🌱 Seeds',
      'compost': '♻️ Compost',
      'organic-inputs': '🧪 Organic Inputs'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Trade Approval Center</h2>
        <p className="text-muted-foreground">Review and approve trade listings from farmers and vendors</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTrades.length}</div>
            <div className="text-xs text-yellow-600">Requires review</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-green-600">+3 from yesterday</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="text-xs text-muted-foreground">In marketplace</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trade Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23.4K</div>
            <div className="text-xs text-muted-foreground">This week</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Approval ({pendingTrades.length})</TabsTrigger>
          <TabsTrigger value="approved">Recently Approved</TabsTrigger>
          <TabsTrigger value="analytics">Trade Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {pendingTrades.map((trade) => (
              <Card key={trade.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{trade.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{trade.trader}</span>
                            <Badge variant="outline">{trade.traderType}</Badge>
                            {getRiskBadge(trade.riskLevel)}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="secondary">{getTypeBadge(trade.type)}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{trade.description}</p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{trade.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{trade.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{trade.availability}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{trade.images} images</span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Submitted: {trade.submitted}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-40">
                      <Button 
                        size="sm"
                        onClick={() => handleTradeAction(trade.id, 'approve')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTradeAction(trade.id, 'request-edit')}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Request Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleTradeAction(trade.id, 'reject')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Approved Trades</CardTitle>
              <CardDescription>Trades approved in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trader</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Approved</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentlyApproved.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">{trade.trader}</TableCell>
                      <TableCell>{trade.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getTypeBadge(trade.type)}</Badge>
                      </TableCell>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell>{trade.approvedDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade Categories</CardTitle>
                <CardDescription>Distribution of trade types this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>🌽 Produce</span>
                    <span className="font-medium">45% (23 trades)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🌱 Seeds</span>
                    <span className="font-medium">28% (14 trades)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>♻️ Compost</span>
                    <span className="font-medium">18% (9 trades)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🧪 Organic Inputs</span>
                    <span className="font-medium">9% (5 trades)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approval Metrics</CardTitle>
                <CardDescription>Review performance this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Review Time</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Approval Rate</span>
                    <span className="font-medium text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Edit Requests</span>
                    <span className="font-medium text-yellow-600">8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rejections</span>
                    <span className="font-medium text-red-600">3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <Dialog open={reviewModal} onOpenChange={setReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === 'approve' && '✅ Approve Trade'}
              {reviewAction === 'reject' && '❌ Reject Trade'}
              {reviewAction === 'request-edit' && '✏️ Request Edit'}
            </DialogTitle>
            <DialogDescription>
              {reviewAction === 'approve' && 'This trade will be published to the marketplace.'}
              {reviewAction === 'reject' && 'This trade will be rejected and removed.'}
              {reviewAction === 'request-edit' && 'Send feedback to the trader for improvements.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                {reviewAction === 'approve' && 'Approval Notes (Optional)'}
                {reviewAction === 'reject' && 'Rejection Reason *'}
                {reviewAction === 'request-edit' && 'Edit Request Details *'}
              </label>
              <Textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder={
                  reviewAction === 'approve' 
                    ? 'Any additional notes for the trader...'
                    : reviewAction === 'reject'
                    ? 'Please explain why this trade is being rejected...'
                    : 'Please specify what needs to be edited...'
                }
                rows={4}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setReviewModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>
              {reviewAction === 'approve' && 'Approve Trade'}
              {reviewAction === 'reject' && 'Reject Trade'}
              {reviewAction === 'request-edit' && 'Send Edit Request'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradeApprovalPanel;