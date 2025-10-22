
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Shield, Eye, EyeOff, Target, Users } from 'lucide-react';

const FinanceDashboard = () => {
  const [showCarbonView, setShowCarbonView] = useState(false);

  const loanApplications = [
    {
      id: 'L-2024-008',
      farmer: 'Maria Santos',
      amount: '₱15,000',
      purpose: 'Seed Purchase',
      creditScore: 85,
      markovScore: 0.92, // Markov chain probability
      status: 'Approved',
      riskLevel: 'Low',
      riskColor: 'bg-green-100 text-green-800 border-green-200',
      term: '6 months',
      carbonOffset: 42.8,
      climateRisk: 'Low'
    },
    {
      id: 'L-2024-009',
      farmer: 'Juan dela Cruz',
      amount: '₱22,000',
      purpose: 'Equipment Upgrade',
      creditScore: 72,
      markovScore: 0.68,
      status: 'Under Review',
      riskLevel: 'Medium',
      riskColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      term: '12 months',
      carbonOffset: 28.6,
      climateRisk: 'Medium'
    },
    {
      id: 'L-2024-010',
      farmer: 'Rosa Mendoza',
      amount: '₱8,500',
      purpose: 'Fertilizer Purchase',
      creditScore: 91,
      markovScore: 0.96,
      status: 'Pending',
      riskLevel: 'Low',
      riskColor: 'bg-green-100 text-green-800 border-green-200',
      term: '4 months',
      carbonOffset: 67.3,
      climateRisk: 'Low'
    },
    {
      id: 'L-2024-011',
      farmer: 'Carlos Bautista',
      amount: '₱35,000',
      purpose: 'Land Expansion',
      creditScore: 45,
      markovScore: 0.31,
      status: 'High Risk',
      riskLevel: 'High',
      riskColor: 'bg-red-100 text-red-800 border-red-200',
      term: '18 months',
      carbonOffset: 12.1,
      climateRisk: 'High'
    }
  ];

  const insuranceClaims = [
    {
      id: 'INS-2024-015',
      farmer: 'Pedro Reyes',
      type: 'Crop Damage',
      cause: 'Typhoon Rita',
      amount: '₱18,500',
      status: 'Validated',
      satelliteConfirmed: true,
      carbonImpact: -15.2
    },
    {
      id: 'INS-2024-016',
      farmer: 'Lisa Garcia',
      type: 'Pest Damage',
      cause: 'Rice Bug Infestation',
      amount: '₱12,300',
      status: 'Under Investigation',
      satelliteConfirmed: false,
      carbonImpact: -8.7
    }
  ];

  const getMarkovBadge = (score: number) => {
    if (score >= 0.8) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 0.6) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 0.4) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Under Review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'High Risk':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Validated':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const avgMarkovScore = loanApplications.reduce((sum, loan) => sum + loan.markovScore, 0) / loanApplications.length;
  const highRiskCount = loanApplications.filter(loan => loan.riskLevel === 'High').length;
  const totalCarbonOffset = loanApplications.reduce((sum, loan) => sum + loan.carbonOffset, 0);

  return (
    <div className="space-y-6">
      {/* Toggle and Overview Cards */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Finance Dashboard</h2>
        <Button
          variant="outline"
          onClick={() => setShowCarbonView(!showCarbonView)}
          className="flex items-center gap-2"
        >
          {showCarbonView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showCarbonView ? 'Hide Carbon Data' : 'Show Carbon Integration'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Loans Disbursed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱832,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15% this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Markov Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(avgMarkovScore * 100).toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Credit eligibility probability</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {showCarbonView ? 'Carbon Financed' : 'High Risk Loans'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showCarbonView ? (
              <>
                <div className="text-2xl font-bold text-green-600">{totalCarbonOffset.toFixed(1)}t</div>
                <div className="text-xs text-green-600">CO₂ from financed farms</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-red-600">{highRiskCount}</div>
                <div className="text-xs text-red-600">Require attention</div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Repayment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <div className="text-xs text-green-600">Above target (90%)</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loans">Loan Applications</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Markov Chain Credit Scoring</CardTitle>
              <CardDescription>Advanced eligibility assessment with climate risk integration</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Markov Score</TableHead>
                    {showCarbonView && <TableHead>Carbon Offset</TableHead>}
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loanApplications.map((loan) => {
                    const markovBadge = getMarkovBadge(loan.markovScore);
                    return (
                      <TableRow key={loan.id} className={loan.riskLevel === 'High' ? 'border-l-4 border-l-red-500' : ''}>
                        <TableCell className="font-medium">{loan.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{loan.farmer}</div>
                            <div className="text-sm text-muted-foreground">{loan.purpose}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{loan.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={loan.creditScore} 
                              className="w-12 h-2" 
                            />
                            <span className="text-sm font-medium">{loan.creditScore}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={markovBadge.color}>
                              {(loan.markovScore * 100).toFixed(0)}%
                            </Badge>
                            <div className="text-xs text-muted-foreground">{markovBadge.label}</div>
                          </div>
                        </TableCell>
                        {showCarbonView && (
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3 text-green-500" />
                              <span className="text-sm font-medium">{loan.carbonOffset}t CO₂</span>
                            </div>
                          </TableCell>
                        )}
                        <TableCell>
                          <Badge className={`border ${loan.riskColor}`}>
                            {loan.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(loan.status)}
                            <Badge variant={
                              loan.status === 'Approved' ? 'default' : 
                              loan.status === 'High Risk' ? 'destructive' : 'secondary'
                            }>
                              {loan.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {(loan.status === 'Under Review' || loan.status === 'Pending') && (
                              <Button variant="outline" size="sm">
                                {loan.riskLevel === 'High' ? 'Review' : 'Approve'}
                              </Button>
                            )}
                            <Button variant="outline" size="sm">Details</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Risk Analysis Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-700">High Risk Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {loanApplications.filter(loan => loan.riskLevel === 'High').map(loan => (
                    <div key={loan.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">{loan.farmer}</span>
                      <Badge className="bg-red-100 text-red-800">
                        {(loan.markovScore * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Credit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Excellent (80%+)</span>
                    <span>{loanApplications.filter(l => l.markovScore >= 0.8).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good (60-79%)</span>
                    <span>{loanApplications.filter(l => l.markovScore >= 0.6 && l.markovScore < 0.8).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fair (40-59%)</span>
                    <span>{loanApplications.filter(l => l.markovScore >= 0.4 && l.markovScore < 0.6).length}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Poor (&lt;40%)</span>
                    <span>{loanApplications.filter(l => l.markovScore < 0.4).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showCarbonView && (
              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Carbon-Finance Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">{totalCarbonOffset.toFixed(1)}t</div>
                    <div className="text-sm text-muted-foreground">CO₂ from financed operations</div>
                    <div className="text-xs text-green-600">
                      ₱{(totalCarbonOffset * 40).toLocaleString()} credit value
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims & Satellite Validation</CardTitle>
              <CardDescription>Process claims with automated damage assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cause</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Satellite Validation</TableHead>
                    {showCarbonView && <TableHead>Carbon Impact</TableHead>}
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insuranceClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.farmer}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>{claim.cause}</TableCell>
                      <TableCell className="font-medium">{claim.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className={`h-4 w-4 ${claim.satelliteConfirmed ? 'text-green-500' : 'text-yellow-500'}`} />
                          <Badge variant={claim.satelliteConfirmed ? 'default' : 'secondary'}>
                            {claim.satelliteConfirmed ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </div>
                      </TableCell>
                      {showCarbonView && (
                        <TableCell>
                          <span className="text-red-600">{claim.carbonImpact}t CO₂</span>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(claim.status)}
                          <Badge variant={claim.status === 'Validated' ? 'default' : 'secondary'}>
                            {claim.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {claim.status === 'Under Investigation' && (
                            <Button variant="outline" size="sm">Validate</Button>
                          )}
                          <Button variant="outline" size="sm">Details</Button>
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

export default FinanceDashboard;
