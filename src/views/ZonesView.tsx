// src/views/ZonesView.tsx
import React, { useEffect, useState } from 'react';
import { ZoneController } from '../controllers/zoneController';
import { Zone } from '../models/zoneModel';

const ZonesView = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');


    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');
    const [editingRegion, setEditingRegion] = useState('');

  const loadZones = async () => {
    setLoading(true);
    const data = await ZoneController.fetchZones();
    setZones(data);
    setLoading(false);
  };

  const handleAddZone = async () => {
    if (!name || !region) return alert('Please fill all fields');
    const success = await ZoneController.addZone({ name, region });
    if (success) {
      alert('Zone added successfully!');
      setName('');
      setRegion('');
      loadZones();
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Delete this zone?');
    if (!confirmDelete) return;
    const success = await ZoneController.deleteZone(id);
    if (success) loadZones();
  };

  const handleUpdate = async (id: number) => {
    if (!editingName || !editingRegion) return alert('Please fill all fields');
    const success = await ZoneController.editZone(id, { name: editingName, region: editingRegion });
    if (success) {
        alert('Zone updated successfully!');
        setEditingId(null);
        loadZones(); // refresh table
    }
    };

  useEffect(() => {
    loadZones();
  }, []);

  if (loading) 
    return <center>
            <i className="fas fa-spinner fa-pulse"></i>
            HUWAT HA!
        </center> ;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Zone Management</h2>

      {/* Add Zone Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Zone Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddZone}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Zones Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Region</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td className="border p-2">{zone.id}</td>
              <td className="border p-2">{zone.name}</td>
              <td className="border p-2">{zone.region}</td>
              <td className="border p-2 text-center">



                
  {editingId === zone.id ? (
    <>
      <input
        value={editingName}
        onChange={(e) => setEditingName(e.target.value)}
        className="border p-1 rounded w-24"
      />
      <input
        value={editingRegion}
        onChange={(e) => setEditingRegion(e.target.value)}
        className="border p-1 rounded w-24 ml-1"
      />
      <button
        onClick={() => handleUpdate(zone.id)}
        className="bg-blue-500 text-white px-2 py-1 rounded ml-1"
      >
        Save
      </button>
      <button
        onClick={() => setEditingId(null)}
        className="bg-gray-400 text-white px-2 py-1 rounded ml-1"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => {
          setEditingId(zone.id);
          setEditingName(zone.name);
          setEditingRegion(zone.region);
        }}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(zone.id)}
        className="bg-red-500 text-white px-3 py-1 rounded ml-1"
      >
        Delete
      </button>
    </>
  )}


              </td>
            </tr>
          ))}
          {zones.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No zones found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ZonesView;
