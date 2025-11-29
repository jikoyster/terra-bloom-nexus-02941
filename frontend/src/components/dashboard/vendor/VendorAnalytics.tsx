
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';

const VendorAnalytics = () => {
  const topProducts = [
    { name: 'Premium Rice Seeds', sales: '₱145,600', units: '486 kg', growth: '+15%' },
    { name: 'NPK Fertilizer 14-14-14', sales: '₱98,200', units: '196 bags', growth: '+8%' },
    { name: 'Organic Fertilizer', sales: '₱76,800', units: '128 bags', growth: '+22%' },
    { name: 'Hybrid Corn Seeds', sales: '₱54,300', units: '181 kg', growth: '-3%' }
  ];

  const topCustomers = [
    { name: 'Green Valley Co-op', orders: 24, value: '₱186,500', region: 'Bukidnon' },
    { name: 'Mountain View Farm', orders: 18, value: '₱142,800', region: 'Cagayan de Oro' },
    { name: 'Northern Alliance', orders: 15, value: '₱98,600', region: 'Davao' },
    { name: 'Sunrise Cooperative', orders: 12, value: '₱76,200', region: 'Misamis Oriental' }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Last 30 Days</Badge>
          <Badge variant="outline">This Quarter</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">₱374,900</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">69</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">2.1</div>
                <div className="text-sm text-muted-foreground">Avg Delivery Days</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                  -0.3 days improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              <div>
                <div className="text-2xl font-bold">0.8%</div>
                <div className="text-sm text-muted-foreground">Return Rate</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                  -0.2% improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top-Selling Products</CardTitle>
            <CardDescription>Best performing items by revenue and volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.units} sold</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{product.sales}</div>
                    <div className={`text-sm ${
                      product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Repeat Customers by Region</CardTitle>
            <CardDescription>Most valuable customers and their order patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.orders} orders • {customer.region}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{customer.value}</div>
                    <Badge variant="outline" className="text-xs">
                      Regular Customer
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Revenue and order trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive charts coming soon</p>
              <p className="text-sm">Sales trends, seasonal patterns, and forecasting</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAnalytics;
