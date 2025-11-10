import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Link } from "react-router-dom"

const VendorTable = () => {
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from(import.meta.env.VITE_VENDORS_TABLE)
        .select(`
          id,
          name,
          products,
          stock_level,
          rating,
          eoq_matches,
          location,
          status,
          category:VendorCategory(id, name)
        `)

      if (error) {
        console.error('Error fetching vendors:', error)
        setError(error.message)
      } else {
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

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading vendors...</p>
  }

  if (error) {
    return <p className="text-sm text-red-500">Error: {error}</p>
  }

  if (vendors.length === 0) {
    return <p className="text-sm text-muted-foreground">No vendors found.</p>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Vendor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>EOQ Matches</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium align-top">
                <Link
                  to={`/vendors/${vendor.id}`}
                  className="text-green-600 hover:underline"
                >
                  {vendor.name}
                </Link>
              </TableCell>
              <TableCell className="align-top">
                {vendor.category?.name || 'Uncategorized'}
              </TableCell>
              <TableCell className="align-top">
                {Array.isArray(vendor.products)
                  ? vendor.products.join(', ')
                  : vendor.products || '—'}
              </TableCell>
              <TableCell className="align-top">{vendor.stock_level || '—'}</TableCell>
              <TableCell className="align-top">{vendor.rating || '—'}</TableCell>
              <TableCell className="align-top">{vendor.eoq_matches || 0}</TableCell>
              <TableCell className="align-top">{vendor.location || '—'}</TableCell>
              <TableCell className="align-top text-center">
                <Badge
                  variant={vendor.status ? 'default' : 'destructive'}
                >
                  {vendor.status ? 'Verified' : 'Unverified'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default VendorTable
