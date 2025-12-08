import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

interface Cooperative {
  coop_id: number;
  name: string;
  registration_no: string | null;
  status: string;
  address: string | null;
  region: string | null;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  established_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  members_count: number | null;
}

const CoopPanel: React.FC = () => {
  const [coops, setCoops] = useState<Cooperative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoops = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cooperatives");
        if (!res.ok) throw new Error("Failed to fetch cooperatives");

        const data: Cooperative[] = await res.json();
        setCoops(data);
      } catch (err) {
        console.error("Error fetching cooperatives:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoops();
  }, []);

  if (loading) return <p>Loading cooperatives...</p>;
  if (!coops.length) return <p>No cooperatives available.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Cooperatives Directory</CardTitle>
            <CardDescription>
              All registered cooperatives in the platform
            </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Registration No.</TableHead>
                
                <TableHead>Address</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>
                  Contact Person/
                  Phone/
                  Email
                </TableHead>
                
                <TableHead>Established</TableHead>

                <TableHead>Status</TableHead>
                <TableHead>{/* col for buttons */}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {coops.map((coop) => (
                <TableRow key={coop.coop_id}>
                  <TableCell>{coop.coop_id}</TableCell>
                  <TableCell className='text-[1em] w-[12%] font-medium text-green-700'>{coop.name}</TableCell>
                  <TableCell>{coop.registration_no || "-"}</TableCell>
                  
                  <TableCell>{coop.address || "-"}</TableCell>
                  <TableCell>{coop.region || "-"}</TableCell>
                  <TableCell>
                    <div className="font-bold">{coop.contact_person || "-"}</div>
                    <div>{coop.phone || "-"}</div>
                    <div>{coop.email || "-"}</div>
                  </TableCell>
                  <TableCell>
                    {coop.established_at
                      ? new Date(coop.established_at).toLocaleDateString()
                      : "-"}
                  </TableCell>

                    <TableCell>{coop.status}</TableCell>

                  <TableCell>
                          <div className="flex items-center gap-4 align-right">
      <Button 
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        //nClick={onBuy}
      >
        BUY
      </Button>

      <Button 
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
        //onClick={onSell}
      >
        SELL
      </Button>
    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoopPanel;
