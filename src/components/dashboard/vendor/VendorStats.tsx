import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

const VendorStats = () => {
  const [totalVendors, setTotalVendors] = useState<number>(0)
  const [verifiedVendors, setVerifiedVendors] = useState<number>(0)
  const [totalEOQMatches, setTotalEOQMatches] = useState<number>(0)
  const [averageRating, setAverageRating] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVendorStats = async () => {
      setLoading(true)

      // 1️⃣ Fetch all vendors
      const { data, error } = await supabase
        .from(import.meta.env.VITE_VENDORS_TABLE)
        .select('verified, eoq_matches, rating')

      if (error) {
        console.error('Error fetching vendors:', error)
        setLoading(false)
        return
      }

      if (data) {
        // 2️⃣ Compute stats
        const total = data.length
        const verified = data.filter(v => v.verified).length
        const totalEOQ = data.reduce((sum, v) => sum + (v.eoq_matches || 0), 0)
        const avgRating =
          data.length > 0
            ? data.reduce((sum, v) => sum + (v.rating || 0), 0) / data.length
            : 0

        setTotalVendors(total)
        setVerifiedVendors(verified)
        setTotalEOQMatches(totalEOQ)
        setAverageRating(parseFloat(avgRating.toFixed(1)))
      }

      setLoading(false)
    }

    fetchVendorStats()
  }, [])

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading vendor stats...</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Vendors */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVendors}</div>
          <div className="text-xs text-muted-foreground">
            +2 this month
          </div>
        </CardContent>
      </Card>

      {/* Verified Vendors */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Verified Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {verifiedVendors}
          </div>
          <div className="text-xs text-green-600">
            {totalVendors > 0
              ? `${Math.round((verifiedVendors / totalVendors) * 100)}% verification rate`
              : 'No data'}
          </div>
        </CardContent>
      </Card>

      {/* EOQ Matches */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">EOQ Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEOQMatches}</div>
          <div className="text-xs text-muted-foreground">Active this week</div>
        </CardContent>
      </Card>

      {/* Avg Rating */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating}</div>
          <div className="flex items-center text-xs text-yellow-600">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Based on farmer reviews
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VendorStats
