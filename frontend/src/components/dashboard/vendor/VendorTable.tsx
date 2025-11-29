
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, Package, Truck } from 'lucide-react';

interface Vendor {
  id: number;
  name: string;
  category: string;
  products: string[];
  stock: string;
  rating: number;
  eoqMatches: number;
  location: string;
  verified: boolean;
}

interface VendorTableProps {
  vendors: Vendor[];
}

const VendorTable = ({ vendors }: VendorTableProps) => {
  const getStockBadge = (stock: string) => {
    const colors = {
      'High': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-red-100 text-red-800'
    };
    return colors[stock as keyof typeof colors];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Directory</CardTitle>
        <CardDescription>Manage your supply chain partners and their capabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>EOQ Matches</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {vendor.name}
                      {vendor.verified && (
                        <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{vendor.location}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{vendor.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {vendor.products.slice(0, 2).map((product, idx) => (
                      <div key={idx} className="text-sm">{product}</div>
                    ))}
                    {vendor.products.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{vendor.products.length - 2} more
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStockBadge(vendor.stock)}>
                    {vendor.stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{vendor.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{vendor.eoqMatches}</span>
                    <span className="text-xs text-muted-foreground">this week</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={vendor.verified ? 'default' : 'secondary'}>
                    {vendor.verified ? 'Active' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">
                      <Truck className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VendorTable;
