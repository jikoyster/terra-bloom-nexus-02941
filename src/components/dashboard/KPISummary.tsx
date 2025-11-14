import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingBag,
  Leaf,
  DollarSign,
  Package
} from 'lucide-react'
import { supabase } from '../../supabaseClient' // adjust path if needed

const KPISummary = () => {
  const [farmerCount, setFarmerCount] = useState<number | null>(null)
  const [vendorCount, setVendorCount] = useState<number | null>(null)
  const [carbonCredit, setCarbonCredit] = useState<number | null>(null)
  const [financingDisbursed, setfinancingDisbursed] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // 🔹 Count farmers (role = 2)
        const { count: farmers, error: farmerError } = await supabase
          .from('Users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 2)

        if (farmerError) throw farmerError

        // 🔹 Count vendors (role = 3)
        const { count: vendors, error: vendorError } = await supabase
          .from('Users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 3)

        if (vendorError) throw vendorError

        // 🔹 Get topmost carbon_credit
        const { data: carbonData, error: carbonError } = await supabase
          .from('Markets')
          .select('carbon_credit')
          .order('carbon_credit', { ascending: false }) 
          .limit(1)

        if (carbonError) throw carbonError
        const topCarbonCredit = carbonData?.[0]?.carbon_credit || 0

        // 🔹 Get topmost financing_disbursed
        const { data: financingDisbursed, error: financingDisbursedError } = await supabase
          .from('Markets')
          .select('financing_disbursed')
          .order('financing_disbursed', { ascending: false }) 
          .limit(1)

        if (carbonError) throw carbonError
        const topFinancingDisbursed = financingDisbursed?.[0]?.financing_disbursed || 0

        setFarmerCount(farmers)
        setVendorCount(vendors)
        setCarbonCredit(topCarbonCredit)
        setfinancingDisbursed(topFinancingDisbursed)
      } catch (error) {
        console.error('Supabase count error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  const kpis = [
    {
      title: 'Active Farmers',
      value: loading ? '...' : farmerCount ?? '0',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Vendors Onboarded',
      value: loading ? '...' : vendorCount ?? '0',
      change: '+2',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-green-600'
    },
    {
      title: 'Carbon Credits (Q2)',
      value: loading ? '...' : `${carbonCredit ?? 0} `,
      unit: 'tCO₂e',
      change: '+12%',
      trend: 'up',
      icon: Leaf,
      color: 'text-emerald-600'
    },
    {
      title: 'Financing Disbursed',
      value: loading ? '...' : `${financingDisbursed ?? 0}`,
      unit: `${import.meta.env.VITE_CURRENCY}`,
      change: '+5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-amber-600'
    },
    {
      title: 'Economic Order Quantity (EOQ)',
      value: '83',
      unit: '%',
      change: '+7%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title} 
              </CardTitle>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp end={kpi.value} duration={2} separator="," /> {kpi.unit || ''}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {/*
                <TrendIcon
                  className={`mr-1 h-3 w-3 ${
                    kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                {kpi.change} from last month
                */}
              </div>
              
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default KPISummary
