import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { AlertCircle, ChevronLeft, Loader } from 'lucide-react';

interface Farm {
  farm_id: number;
  name: string;
  region: string;
  crops?: string;
  hectares?: number;
  yield?: number;
  address?: string;
  carbon_sequestered?: number;
  created_at: string;
  updated_at: string;
}

export function FarmDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/farms/${id}`);
        if (!response.ok) throw new Error('Failed to fetch farm');
        const data = await response.json();
        setFarm(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching farm:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarm();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error || !farm) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error || 'Farm not found'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{farm.name}</CardTitle>
              <CardDescription className="text-lg">{farm.region}</CardDescription>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Created: {new Date(farm.created_at).toLocaleDateString()}</p>
              <p>Updated: {new Date(farm.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Farm Information</h3>
              <div className="space-y-3">
                {farm.address && (
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold">{farm.address}</p>
                  </div>
                )}
                {farm.crops && (
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">Crops Grown</p>
                    <p className="font-semibold">{farm.crops}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Production Metrics</h3>
              <div className="space-y-3">
                {farm.hectares !== null && farm.hectares !== undefined && (
                  <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600">Land Area</p>
                    <p className="text-2xl font-bold text-blue-600">{farm.hectares} ha</p>
                  </div>
                )}
                {farm.yield !== null && farm.yield !== undefined && (
                  <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600">Yield</p>
                    <p className="text-2xl font-bold text-green-600">{farm.yield}</p>
                  </div>
                )}
                {farm.carbon_sequestered !== null && farm.carbon_sequestered !== undefined && (
                  <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
                    <p className="text-sm text-gray-600">Carbon Sequestered</p>
                    <p className="text-2xl font-bold text-emerald-600">{farm.carbon_sequestered}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline">View Soil Assessment</Button>
          <Button variant="outline">View Crops</Button>
          <Button variant="outline">Generate Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FarmDetail;