import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Cooperative {
  coop_id: number;
  name: string;
  status: string;
  region: string | null;
  address: string | null;
}

const Buy: React.FC = () => {
  const { coop_id } = useParams();
  const [coop, setCoop] = useState<Cooperative | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoop = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cooperatives/${coop_id}`);
        const data = await res.json();
        setCoop(data);
      } catch (err) {
        console.error("Error fetching coop:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoop();
  }, [coop_id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!coop) return <p className="p-6">Cooperative not found.</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">
        Buy from Suggested Co-op: <span className="text-green-700">{coop.name}</span>
      </h1>

      <p className="mt-2">Select items to order from this cooperative.</p>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Region:</strong> {coop.region || "N/A"}</p>
        <p><strong>Address:</strong> {coop.address || "N/A"}</p>
      </div>
    </div>
  );
};

export default Buy;
