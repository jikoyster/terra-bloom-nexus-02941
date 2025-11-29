
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PendingVendorApplications = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Vendor Applications</CardTitle>
        <CardDescription>Review and approve new vendor registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">BioTech Farming Solutions</p>
              <p className="text-sm text-muted-foreground">Category: Organic Treatments | Location: Iligan</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Review</Button>
              <Button size="sm">Approve</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingVendorApplications;
