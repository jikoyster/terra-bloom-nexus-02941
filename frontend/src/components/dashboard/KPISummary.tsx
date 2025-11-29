
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, ShoppingBag, Leaf, DollarSign, Package } from 'lucide-react';

const KPISummary = () => {
  const kpis = [
    {
      title: 'Active Farmers',
      value: '52',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Vendors Onboarded',
      value: '7',
      change: '+2',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-green-600'
    },
    {
      title: 'Carbon Credits (Q2)',
      value: '1,870 kg CO₂',
      change: '+12%',
      trend: 'up',
      icon: Leaf,
      color: 'text-emerald-600'
    },
    {
      title: 'Financing Disbursed',
      value: '₱232,000',
      change: '+5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-amber-600'
    },
    {
      title: 'EOQ Fulfilled via Vendors',
      value: '83%',
      change: '+7%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon className={`mr-1 h-3 w-3 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                {kpi.change} from last month
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPISummary;
