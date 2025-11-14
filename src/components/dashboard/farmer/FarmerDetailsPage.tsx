import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/supabaseClient'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const FarmerDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [farmer, setFarmer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFarmer = async () => {
      const { data: user, error } = await supabase
        .from('Users')
        .select('id, name, role, farm')
        .eq('id', id)
        .single()

      if (error || !user) {
        console.error('Farmer not found:', error)
        setLoading(false)
        return
      }

      const { data: farm } = await supabase
        .from('Farm')
        .select('farm_id, name, region, crops')
        .eq('farm_id', user.farm)
        .single()

      const { data: report } = await supabase
        .from('Farm_reports')
        .select('yield, profitability, financing, carbon, insurance, risk_level, created_at')
        .eq('farm_id', user.farm)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setFarmer({ ...user, farm, report })
      setLoading(false)
    }

    fetchFarmer()
  }, [id])

  if (loading) return <p className="p-4 text-muted-foreground">Loading farmer details...</p>

  if (!farmer) return <p className="p-4 text-muted-foreground">Farmer not found.</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{farmer.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farm Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Farm Name:</strong> {farmer.farm?.name || '—'}</p>
          <p><strong>Region:</strong> {farmer.farm?.region || '—'}</p>
          <p><strong>Crops:</strong> {farmer.farm?.crops || '—'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest Farm Report</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Yield:</strong> {farmer.report?.yield || '—'} t/ha</p>
          <p><strong>Profitability:</strong> {farmer.report?.profitability || '—'}%</p>
          <p><strong>Financing:</strong> {farmer.report?.financing || '—'}</p>
          <p><strong>Carbon:</strong> {farmer.report?.carbon || '—'} kg CO₂</p>
          <p><strong>Insurance:</strong> {farmer.report?.insurance || '—'}</p>
          <p>
            <strong>Risk Level:</strong>{' '}
            <Badge>{farmer.report?.risk_level || 'Low'}</Badge>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default FarmerDetailsPage
