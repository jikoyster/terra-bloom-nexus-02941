import { useState, useCallback } from 'react';

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

interface FarmInput {
  name: string;
  region: string;
  crops?: string;
  hectares?: number;
  yield?: number;
  address?: string;
  carbon_sequestered?: number;
}

const API_BASE_URL = 'http://localhost:5000/api/farms';

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch farms');
      const data = await response.json();
      setFarms(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error fetching farms:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFarmById = useCallback(async (id: number): Promise<Farm | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Farm not found');
      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error fetching farm:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createFarm = useCallback(async (farmData: FarmInput): Promise<Farm | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmData)
      });
      if (!response.ok) throw new Error('Failed to create farm');
      const newFarm = await response.json();
      setFarms([...farms, newFarm]);
      return newFarm;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error creating farm:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [farms]);

  const updateFarm = useCallback(async (id: number, farmData: Partial<FarmInput>): Promise<Farm | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmData)
      });
      if (!response.ok) throw new Error('Failed to update farm');
      const updatedFarm = await response.json();
      setFarms(farms.map(f => f.farm_id === id ? updatedFarm : f));
      return updatedFarm;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error updating farm:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [farms]);

  const deleteFarm = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete farm');
      setFarms(farms.filter(f => f.farm_id !== id));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error deleting farm:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [farms]);

  const getSoilAssessments = useCallback(async (farmId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${farmId}/soil`);
      if (!response.ok) throw new Error('Failed to fetch soil assessments');
      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error fetching soil assessments:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    farms,
    loading,
    error,
    fetchFarms,
    fetchFarmById,
    createFarm,
    updateFarm,
    deleteFarm,
    getSoilAssessments
  };
}
