
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import VendorStats from './vendor/VendorStats';
import VendorSearch from './vendor/VendorSearch';
import VendorTable from './vendor/VendorsPanel';
import PendingVendorApplications from './vendor/PendingVendorApplications';

const VendorMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const vendors = [
    {
      id: 1,
      name: 'AgriSupply Pro',
      category: 'Seeds',
      products: ['Rice Seeds', 'Corn Seeds', 'Vegetable Seeds'],
      stock: 'High',
      rating: 4.8,
      eoqMatches: 6,
      location: 'Cagayan de Oro',
      verified: true
    },
    {
      id: 2,
      name: 'Organic Solutions Inc',
      category: 'Fertilizer',
      products: ['Organic Compost', 'Bio-fertilizer', 'Liquid Nutrients'],
      stock: 'Medium',
      rating: 4.6,
      eoqMatches: 3,
      location: 'Bukidnon',
      verified: true
    },
    {
      id: 3,
      name: 'GreenPack Materials',
      category: 'Packaging',
      products: ['Sacks', 'Containers', 'Labels'],
      stock: 'Low',
      rating: 4.2,
      eoqMatches: 2,
      location: 'Davao',
      verified: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor Marketplace</h2>
          <p className="text-muted-foreground">Manage and onboard supply chain partners</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Onboard New Vendor
        </Button>
      </div>

      {/* Search and Filters */}
      <VendorSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Vendor Stats */}
      <VendorStats />

      {/* Vendors Table */}
      <VendorTable vendors={vendors} />

      {/* Pending Vendor Applications */}
      <PendingVendorApplications />
    </div>
  );
};

export default VendorMarketplace;
