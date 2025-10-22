
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface VendorSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const VendorSearch = ({ searchTerm, onSearchChange }: VendorSearchProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search vendors by name, category, or product..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter by Category</Button>
          <Button variant="outline">Sort by Rating</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorSearch;
