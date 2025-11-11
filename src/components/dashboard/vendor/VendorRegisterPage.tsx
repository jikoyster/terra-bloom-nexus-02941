import React, { useState } from 'react'
import Header from '@/components/layout/Header';

import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabaseClient'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const VendorRegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 1, // default selection
    products: '',
    location: '',
    stock_level: '',
    rating: '',
    eoq_matches: -1,
    verified: false,
    status: 'pending'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { name, email, category, products, location, stock_level, rating, eoq_matches, verified, status} = formData

    // ✅ Insert vendor data into your Vendors table
    const { error } = await supabase.from(import.meta.env.VITE_VENDORS_TABLE).insert([
      { name, email, category: category, products, location, stock_level, rating, eoq_matches, verified, status }
    ])

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      alert('Vendor added successfully!')
      navigate('/vendor-dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-lg">

        <Header />

        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Register a New Vendor</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Vendor Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter vendor name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter vendor email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="products">Products</Label>
              <div>
              <textarea
                id="products"
                name="products"
                placeholder="Enter vendor products"
                value={formData.products}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-md px-3 py-2"
                required
              />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Central Visayas"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="1">Seeds</option>
                <option value="2">Fertilizers</option>
                <option value="3">Packaging</option>
              </select>
            </div>

            <div>
            <Label htmlFor="stock_level">Stock Level</Label>
            <Input
                id="stock_level"
                name="stock_level"
                type="number"
                placeholder="Enter available stock"
                value={formData.stock_level}
                onChange={handleChange}
                required
            />
            </div>

            <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                placeholder="Enter vendor rating (e.g. 4.5)"
                value={formData.rating}
                onChange={handleChange}
            />
            </div>


            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Add Vendor'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default VendorRegisterPage
