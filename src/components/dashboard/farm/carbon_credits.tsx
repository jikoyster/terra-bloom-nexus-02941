import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabaseClient'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Link } from 'lucide-react'

const FarmerTable = () => {
  const [farmers, setFarmers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔵 Fetch Farmers + Farm + Farm_reports
  const fetchFarmers = async () => {
    setLoading(true)
    setError(null)

    // Get Users with role = 2 (farmers)
    const { data: users, error: usersError } = await supabase
      .from('Users')
      .select('id, name, farm')
      .eq('role', 2)

    if (usersError) {
      setError(usersError.message)
      setLoading(false)
      return
    }

    // Attach farm + report to each user
    const farmersWithDetails = await Promise.all(
      users.map(async (user: any) => {
        const { data: farm } = await supabase
          .from('Farms')
          .select('farm_id, name, region')
          .eq('farm_id', user.farm)
          .single()

        const { data: report } = await supabase
          .from('Farm_reports')
          .select('yield, profitability, carbon, insurance, risk_level')
          .eq('farm_id', user.farm)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        return { ...user, farm, report }
      })
    )

    setFarmers(farmersWithDetails)
    setLoading(false)
  }

  useEffect(() => {
    fetchFarmers()
  }, [])

  // 🔴 Delete farmer
  const handleDelete = async (farmerId: string) => {
    if (!confirm("Are you sure you want to delete this farmer?")) return

    const { error } = await supabase
      .from('Users')
      .delete()
      .eq('id', farmerId)

    if (error) {
      alert("Failed to delete farmer: " + error.message)
    } else {
      alert("Farmer deleted successfully!")

      // Remove row immediately without fetching
      setFarmers((prev) => prev.filter((f) => f.id !== farmerId))
    }
  }

  // Risk badge colors
  const getRiskBadge = (risk: string) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800',
    }
    return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading farmers...</p>
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>
  if (farmers.length === 0) return <p className="text-sm text-muted-foreground">No farmers found.</p>

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Farm</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Yield</TableHead>
            <TableHead>Profitability</TableHead>
            <TableHead>Carbon</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {farmers.map((farmer) => (
            <TableRow key={farmer.id}>
                <TableCell>
                    <a href={`/farmer/${farmer.id}`} className="text-green-600 hover:underline">
                        {farmer.name}
                    </a>
                </TableCell>
                <TableCell>
                    <a href={`/farm/${farmer.farm?.farm_id}`} className="text-green-600 hover:underline">{farmer.farm.name}</a> 
                </TableCell>
                <TableCell>{farmer.farm?.region || '—'}</TableCell>
              <TableCell>{farmer.report?.yield ? `${farmer.report.yield} tons/ha` : '—'}</TableCell>

              <TableCell>
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-gray-200 rounded mr-2">
                    <div
                      className="h-2 bg-green-500 rounded"
                      style={{ width: `${farmer.report?.profitability || 0}%` }}
                    />
                  </div>
                  {farmer.report?.profitability || 0}%
                </div>
              </TableCell>

              <TableCell>{farmer.report?.carbon ?? '—'}</TableCell>
              <TableCell>{farmer.report?.insurance ?? '—'}</TableCell>

              <TableCell>
                <Badge className={getRiskBadge(farmer.report?.risk_level || '')}>
                  {farmer.report?.risk_level || '—'}
                </Badge>
              </TableCell>

              <TableCell>
                <a
                  href="#"
                  onClick={() => handleDelete(farmer.id)}
                  className="ml-2 text-red-600 hover:underline"
                >
                  ❌
                </a>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default FarmerTable