
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CreditCard, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';

const FarmerFinancing = () => {
  const creditScore = {
    current: 0.82,
    trend: 'improving',
    eligibility: 'qualified',
    factors: [
      { factor: 'Yield Consistency', score: 0.85, weight: 30, status: 'good' },
      { factor: 'Repayment History', score: 0.95, weight: 25, status: 'excellent' },
      { factor: 'Pest Management', score: 0.70, weight: 20, status: 'fair' },
      { factor: 'Market Compliance', score: 0.88, weight: 15, status: 'good' },
      { factor: 'Climate Resilience', score: 0.78, weight: 10, status: 'good' }
    ]
  };

  const loanProducts = [
    {
      name: 'Seasonal Input Loan',
      amount: '₱50,000',
      rate: '8.5% p.a.',
      term: '6 months',
      eligibility: 'qualified',
      purpose: 'Seeds, fertilizers, pest control',
      nextPayment: '2024-08-15'
    },
    {
      name: 'Equipment Finance',
      amount: '₱150,000',
      rate: '12% p.a.',
      term: '24 months',
      eligibility: 'qualified',
      purpose: 'Farm machinery, tools',
      nextPayment: null
    },
    {
      name: 'Crop Insurance Premium',
      amount: '₱15,000',
      rate: '0% (subsidized)',
      term: '12 months',
      eligibility: 'qualified',
      purpose: 'Weather & pest coverage',
      nextPayment: null
    }
  ];

  const markovStates = [
    { 
      state: 'Low Risk', 
      probability: 0.65, 
      description: 'Stable yield, good payments',
      trend: 'stable',
      implications: 'Standard rates, full access'
    },
    { 
      state: 'Medium Risk', 
      probability: 0.28, 
      description: 'Seasonal variations, pest issues',
      trend: 'improving',
      implications: 'Slightly higher rates'
    },
    { 
      state: 'High Risk', 
      probability: 0.07, 
      description: 'Yield drops, payment delays',
      trend: 'decreasing',
      implications: 'Limited access, higher collateral'
    }
  ];

  const insuranceClaims = [
    { 
      date: '2024-06-15',
      type: 'Pest Damage',
      field: 'East Field',
      amount: '₱12,500',
      status: 'approved',
      payout: '₱10,000'
    },
    { 
      date: '2024-05-20',
      type: 'Weather Event',
      field: 'North Field',
      amount: '₱8,000',
      status: 'processing',
      payout: null
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Crop Financing & Insurance (Markov Chain Analysis)
          </CardTitle>
          <CardDescription>AI-powered credit scoring and risk assessment for agricultural finance</CardDescription>
        </CardHeader>
      </Card>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Credit Score</span>
            </div>
            <p className={`text-3xl font-bold ${getScoreColor(creditScore.current)}`}>
              {(creditScore.current * 100).toFixed(0)}/100
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="bg-green-100 text-green-800">Qualified</Badge>
              <Badge variant="outline" className="text-xs">Improving</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="font-medium">Available Credit</span>
            </div>
            <p className="text-2xl font-bold text-green-800">₱215,000</p>
            <p className="text-sm text-green-600">Across 3 products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Next Payment</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">Aug 15</p>
            <p className="text-sm text-purple-600">₱8,500 due</p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Credit Score Factors</CardTitle>
          <CardDescription>Detailed breakdown of factors affecting your agricultural credit rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditScore.factors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{factor.factor}</span>
                    <Badge className={getStatusColor(factor.status)} variant="secondary">
                      {factor.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getScoreColor(factor.score)}`}>
                      {(factor.score * 100).toFixed(0)}/100
                    </span>
                    <span className="text-sm text-gray-500">({factor.weight}%)</span>
                  </div>
                </div>
                <Progress value={factor.score * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Markov Chain Risk States */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk State Forecast</CardTitle>
          <CardDescription>Markov chain analysis of your financial risk profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {markovStates.map((state, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{state.state}</h4>
                  <Badge variant="outline">{(state.probability * 100).toFixed(0)}%</Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{state.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Trend:</span>
                    <Badge className={
                      state.trend === 'improving' ? 'bg-green-100 text-green-800' :
                      state.trend === 'stable' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    } variant="secondary">
                      {state.trend}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <strong>Impact:</strong> {state.implications}
                  </div>
                </div>
                
                <Progress value={state.probability * 100} className="h-2 mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loan Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Loan Products</CardTitle>
            <CardDescription>Financing options based on your credit profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loanProducts.map((loan, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{loan.name}</h4>
                    <Badge className="bg-green-100 text-green-800">Qualified</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <p className="font-medium">{loan.amount}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Rate:</span>
                      <p className="font-medium">{loan.rate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Term:</span>
                      <p className="font-medium">{loan.term}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Purpose:</span>
                      <p className="font-medium text-xs">{loan.purpose}</p>
                    </div>
                  </div>
                  
                  {loan.nextPayment && (
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs mb-2">
                      <strong>Next Payment:</strong> {loan.nextPayment}
                    </div>
                  )}
                  
                  <Button size="sm" className="w-full">
                    {loan.nextPayment ? 'Make Payment' : 'Apply Now'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Insurance Claims</CardTitle>
            <CardDescription>Crop insurance status and claim history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insuranceClaims.map((claim, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{claim.type}</h4>
                    <Badge className={
                      claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                      claim.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    } variant="secondary">
                      {claim.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">Date:</span> {claim.date}</p>
                    <p><span className="text-gray-500">Field:</span> {claim.field}</p>
                    <p><span className="text-gray-500">Claim Amount:</span> {claim.amount}</p>
                    {claim.payout && (
                      <p><span className="text-gray-500">Payout:</span> <span className="text-green-600 font-medium">{claim.payout}</span></p>
                    )}
                  </div>
                </div>
              ))}
              
              <Button className="w-full gap-2">
                <AlertCircle className="h-4 w-4" />
                File New Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerFinancing;
