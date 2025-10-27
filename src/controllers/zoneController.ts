// src/controllers/zoneController.ts
import { ZoneModel, Zone } from '../models/zoneModel';

export const ZoneController = {
  async fetchZones(): Promise<Zone[]> {
    try {
      return await ZoneModel.getAll();
    } catch (error) {
      console.error('Error fetching zones:', error);
      return [];
    }
  },

  async addZone(newZone: Omit<Zone, 'id'>): Promise<boolean> {
    try {
      await ZoneModel.create(newZone);
      return true;
    } catch (error) {
      console.error('Error adding zone:', error);
      return false;
    }
  },

  async editZone(id: number, zone: Partial<Zone>): Promise<boolean> {
    try {
      await ZoneModel.update(id, zone);
      return true;
    } catch (error) {
      console.error('Error updating zone:', error);
      return false;
    }
  },

  async deleteZone(id: number): Promise<boolean> {
    try {
      await ZoneModel.remove(id);
      return true;
    } catch (error) {
      console.error('Error deleting zone:', error);
      return false;
    }
  },
};
