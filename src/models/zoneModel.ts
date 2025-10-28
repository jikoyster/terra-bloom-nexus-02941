// src/models/zoneModel.ts
import { supabase } from '../supabaseClient';

export interface Zone {
  id: number;
  name: string;
  region: string;
}

export const ZoneModel = {
  // Fetch all zones
  async getAll(): Promise<Zone[]> {
    const { data, error } = await supabase.from('Zones').select('*');
    if (error) throw error;
    return data || [];
  },

  // Create a new zone
  async create(zone: Omit<Zone, 'id'>): Promise<Zone[]> {
    const { data, error } = await supabase.from('Zones').insert([zone]).select();
    if (error) throw error;
    return data || [];
  },

  // Update a zone
  async update(id: number, updatedZone: Partial<Zone>): Promise<Zone[]> {
    const { data, error } = await supabase.from('Zones').update(updatedZone).eq('id', id).select();
    if (error) throw error;
    return data || [];
  },

  // Delete a zone
  async remove(id: number): Promise<void> {
    const { error } = await supabase.from('Zones').delete().eq('id', id);
    if (error) throw error;
  },
};