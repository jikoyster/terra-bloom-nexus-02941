import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/supabaseClient'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'

const FarmerEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    role: 2,
    farm: '',
    yield: '',
    profitability: '',
    financing: '',
    carbonContrib: '',
    insurance: '',
    riskLevel: '',
  })
  const [farms, setFarms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // Fetch farmer and zone/farm data
      const { data: user, error: userError } = await supabase
        .from('Users')
        .select(`
          id, 
          name, 
          role, 
          farm:Farm_reports!id (
            yield,
            profitability,
            financing,
            carbonContrib,
            insurance,
            riskLevel
          )
        `)
        .eq('id', id)
        .single()

      if (userError) {
        console.error('Error fetching farmer:', userError)
      } else {
        setFormData({
          name: user.name || '',
          role: 2,
          farm: user.farm || '',
          yield: user.zone?.yield || '',
          profitability: user.zone?.profitability || '',
          financing: user.zone?.financing || '',
          carbonContrib: user.zone?.carbonContrib || '',
          insurance: user.zone?.insurance || '',
          riskLevel: user.farm?.riskLevel || '',
        })
      }

      const { data: farmsData, error: farmsError } = await supabase
        .from('Farm')
        .select('farm_id, name, region')

      if (farmsError) console.error('Error fetching farms:', farmsError)
      else setFarms(farmsData || [])

      setLoading(false)
    }

    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error: userError } = await supabase
      .from('Users')
      .update({
        name: formData.name,
        farm: formData.farm,
      })
      .eq('id', id)

    const { error: zoneError } = await supabase
      .from('Farm_reports')
      .update({
        yield: formData.yield,
        profitability: formData.profitability,
        financing: formData.financing,
        carbonContrib: formData.carbonContrib,
        insurance: formData.insurance,
        riskLevel: formData.riskLevel,
      })
      .eq('id', id) // assumes the same id as user; change if needed

    if (userError || zoneError) {
      console.error('Error updating:', userError || zoneError)
      alert('Error updating farmer details.')
    } else {
      alert('Farmer updated successfully!')
      navigate('/dashboard')
    }
  }

  if (loading) return <p className="p-4 text-muted-foreground">Loading farmer...</p>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Link to="/dashboard">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Farmer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="farm">Assigned Farm</Label>
              <select
                id="farm"
                name="farm"
                value={formData.farm}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select a farm</option>
                {farms.map((f) => (
                  <option key={f.farm_id} value={f.farm_id}>
                    {f.name} — {f.region}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yield">Yield</Label>
                <Input id="yield" name="yield" value={formData.yield} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="profitability">Profitability</Label>
                <Input
                  id="profitability"
                  name="profitability"
                  value={formData.profitability}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="financing">Financing</Label>
                <Input
                  id="financing"
                  name="financing"
                  value={formData.financing}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="carbonContrib">Carbon</Label>
                <Input
                  id="carbonContrib"
                  name="carbonContrib"
                  value={formData.carbonContrib}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="insurance">Insurance</Label>
                <Input
                  id="insurance"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="riskLevel">Risk</Label>
                <Input
                  id="riskLevel"
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="mt-2">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FarmerEditPage
