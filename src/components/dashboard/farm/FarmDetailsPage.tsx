import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/supabaseClient'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const FarmDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [farm, setFarm] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFarm = async () => {
      const { data, error } = await supabase
        .from('Farm')
        .select('farm_id, name, region, address, crops')
        .eq('farm_id', id)
        .single()

      if (error || !data) {
        console.error('Error fetching farm:', error)
        setLoading(false)
        return
      }

      setFarm(data)
      setLoading(false)
    }

    fetchFarm()
  }, [id])

  if (loading) return <p className="p-4 text-muted-foreground">Loading farm details...</p>

  if (!farm) return <p className="p-4 text-muted-foreground">Farm not found.</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{farm.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farm Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong className='inline-block w-[150px]'>Farm Name:</strong> {farm.name}</p>
          <p><strong className='inline-block w-[150px]'>Region:</strong> {farm.region}</p>
          <p><strong className='inline-block w-[150px]'>Address:</strong> {farm.address}</p>
          <p><strong className='inline-block w-[150px]'>Crops:</strong> {farm.crops}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default FarmDetailsPage
