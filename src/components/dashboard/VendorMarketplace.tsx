import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { supabase } from '../../supabaseClient'
import VendorStats from './vendor/VendorStats'
import VendorSearch from './vendor/VendorSearch'
import VendorTable from './vendor/VendorTable'
import PendingVendorApplications from './vendor/PendingVendorApplications'

const VendorMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)

      // Fetch from Vendor table, joining with VendorCategory
      const { data, error } = await supabase
        .from(import.meta.env.VITE_VENDORS_TABLE)
        .select(`
          id,
          name,
          products,
          stock,
          rating,
          eoq_matches,
          location,
          verified,
          category:VendorCategory(id, name)
        `)

      if (error) {
        console.error('Error fetching vendors:', error)
      } else {
        // Transform product strings into arrays if stored as comma-separated values
        const formatted = data.map((v) => ({
          ...v,
          products: typeof v.products === 'string'
            ? v.products.split(',').map((p: string) => p.trim())
            : v.products
        }))
        setVendors(formatted)
      }

      setLoading(false)
    }

    fetchVendors()
  }, [])

  // Optional filtering for search input
  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor Marketplace</h2>
          <p className="text-muted-foreground">Manage and onboard supply chain partners</p>
        </div>
        <Button className="flex items-center gap-2"
          onClick={() => window.location.href = '/vendor-register'}>
          <Plus className="h-4 w-4" />
          Onboard New Vendor
        </Button>
      </div>

      {/* Search and Filters */}
      <VendorSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Vendor Stats */}
      <VendorStats />

      {/* Vendors Table */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading vendors...</p>
      ) : (
        <VendorTable vendors={filteredVendors} /> 
      )}

      {/* Pending Vendor Applications */}
      {/*<PendingVendorApplications />*/} <br className='h-550px' />
    </div>
  )
}

export default VendorMarketplace
