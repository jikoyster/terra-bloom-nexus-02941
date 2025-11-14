import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import FarmerTable from '@/components/dashboard/farmer/FarmerTable'

import { supabase } from '../../supabaseClient'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  TrendingUp,
  MapPin,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

const getRiskBadge = (risk: string) => {
  const colors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  }
  return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const FarmersPanel = () => {
  const [farmers, setFarmers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  // ✅ New summary states
      const [avgYield, setAvgYield] = useState(0)
      const [avgProfit, setAvgProfit] = useState(0)
      const [totalCarbon, setTotalCarbon] = useState(0)
      const [insuranceClaims, setInsuranceClaims] = useState(0)

  useEffect(() => {
    const fetchFarmers = async () => {
      // Step 1️⃣ Get all users with role = 2 (farmers)
      const { data: users, error: usersError } = await supabase
        .from('Users')
        .select(`id, name, role, 
          farm`)
        .eq('role', 2)

      if (usersError) {
        console.error('Error fetching users:', usersError)
        setLoading(false)
        return
      }

      // Step 2️⃣ For each user, fetch farm and its report
      const farmersWithDetails = await Promise.all(
        users.map(async (user) => {
          // Fetch farm info
          const { data: farm, error: farmError } = await supabase
            .from('Farm')
            .select('farm_id, name, region, crops')
            .eq('farm_id', user.farm)
            .single()

          if (farmError) {
            console.warn(`No farm found for user ${user.id}`)
          }

          // Fetch latest farm report
          const { data: report, error: reportError } = await supabase
            .from('Farm_reports')
            .select('yield, profitability, financing, carbon, insurance, risk_level')
            .eq('farm_id', user.farm)
            .order('created_at', { ascending: false })
            .limit(10)
            .single(0)

          if (reportError) {
            console.warn(`No farm report for farm ${user.farm}`)
          }

          return { ...user, farm, report }
        })
      )

      // ✅ Compute summary stats
      const validReports = farmersWithDetails
        .map((f) => f.report)
        .filter((r) => r !== null && r !== undefined)
      
      const totalYield = validReports.reduce((sum, r) => sum + (r.yield || 0), 0)
      const totalProfit = validReports.reduce((sum, r) => sum + (r.profitability || 0), 0)
      const totalCarbonSum = validReports.reduce((sum, r) => sum + (r.carbon || 0), 0)
      const insuranceCount = validReports.filter(
        (r) => r.insurance && r.insurance !== 'Inactive'
      ).length

      setAvgYield(validReports.length ? totalYield / validReports.length : 0)
      setAvgProfit(validReports.length ? totalProfit / validReports.length : 0)
      setTotalCarbon(totalCarbonSum)
      setInsuranceClaims(insuranceCount)


      console.log('✅ Farmers with details:', farmersWithDetails)
      setFarmers(farmersWithDetails)
      setLoading(false)
    }

    fetchFarmers()
  }, [])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Yield This Season</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={avgYield} duration={2} decimals={1} /> tons/ha
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              Based on latest farm reports
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Profitability Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={avgProfit} duration={2} />%
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              Across all active farms
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Carbon Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={totalCarbon} duration={2} separator="," /> kg CO₂
            </div>
            <div className="text-xs text-muted-foreground">Total offset this quarter</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"> 
              <CountUp end={insuranceClaims} duration={2} separator="," />
            </div>
            <div className="text-xs text-muted-foreground">Active insurance coverage</div>
          </CardContent>
        </Card>
      </div>

      {/* Farmers Table */}
      <Card>
  <CardHeader>
    <CardTitle>Farmer Performance Overview</CardTitle>
    <CardDescription>
      Track yield, profitability, and risk metrics for all farmers
    </CardDescription>
  </CardHeader>
  <CardContent>
    <FarmerTable farmers={farmers} loading={loading} />
  </CardContent>
</Card>


      {/* ERP Integration Preview 
      <Card>
        <CardHeader>
          <CardTitle>ERP Integration - Field Activity Logs</CardTitle>
          <CardDescription>
            Real-time tracking of farming activities and costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Fertilizer Application - Plot A-12</p>
                  <p className="text-sm text-muted-foreground">
                    Cost: ₱2,400 | Applied: 50kg organic compost
                  </p>
                </div>
              </div>
              <Badge>Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Pest Control - Plot B-08</p>
                  <p className="text-sm text-muted-foreground">
                    Cost: ₱1,200 | Scheduled for tomorrow
                  </p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      */}
    </div>
  )
}

export default FarmersPanel
