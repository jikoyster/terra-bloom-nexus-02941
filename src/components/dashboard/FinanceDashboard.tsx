import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CheckCircle, Clock, AlertTriangle, Eye, EyeOff } from "lucide-react";

const FinanceDashboard = () => {
  const [showCarbonView, setShowCarbonView] = useState(false);
  const [loans, setLoans] = useState<any[]>([]);
  const [insurances, setInsurances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------
  // FETCH DATA FROM SUPABASE
  // -------------------------------------
  const fetchData = async () => {
    setLoading(true);

    // Fetch Loans
    const { data: loanData, error: loanError } = await supabase.from("Loans")
      .select(`
        id,
        amount,
        credit_score,
        markov_score,
        repayment_rate,
        risk_level,
        status,
        farmer:Users (id, name)
      `);

    // Fetch Insurance
    const { data: insuranceData, error: insError } = await supabase.from(
      "Insurance"
    ).select(`
        id,
        type,
        cause,
        amount,
        validation,
        status,
        farmer:Users (id, name)
      `);

    if (loanError) console.error("Loan fetch error:", loanError);
    if (insError) console.error("Insurance fetch error:", insError);

    setLoans(loanData || []);
    setInsurances(insuranceData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------------------------
  // HELPERS
  // -------------------------------------
  const getMarkovBadge = (score: number) => {
    if (score >= 0.8)
      return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 0.6)
      return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 0.4)
      return { label: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Poor", color: "bg-red-100 text-red-800" };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
      case "Validated":
        return <CheckCircle className="h-4 w-4 text-green-500" />;

      case "Pending":
      case "Under Review":
      case "Under Investigation":
        return <Clock className="h-4 w-4 text-yellow-500" />;

      case "High Risk":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;

      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  // -------------------------------------
  // DERIVED VALUES
  // -------------------------------------
  const avgMarkovScore =
    loans.length > 0
      ? loans.reduce((sum, l) => sum + (l.markov_score || 0), 0) / loans.length
      : 0;

  const highRiskCount = loans.filter((l) => l.risk_level === "High").length;

  // -------------------------------------
  // LOANS APPROVE HANDLER
  // -------------------------------------
  const handleApprove = async (loanId: string) => {
    const { error } = await supabase
      .from("Loans")
      .update({ status: "Approved" })
      .eq("id", loanId);

    if (error) {
      console.error("Error approving loan:", error);
      return;
    }

    // Refresh the dashboard
    fetchData();
  };

  if (loading) return <div>Loading finance dashboard...</div>;

  // -------------------------------------
  // RENDER
  // -------------------------------------
  return (
    <div className="space-y-6">
      {/* Header / Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Finance Dashboard</h2>
        <Button
          variant="outline"
          onClick={() => setShowCarbonView(!showCarbonView)}
          className="flex items-center gap-2"
        >
          {showCarbonView ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {showCarbonView ? "Hide Carbon View" : "Simulated Carbon Integration"}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Markov Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(avgMarkovScore * 100).toFixed(0)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              High Risk Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {highRiskCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Repayment Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="loans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loans">Loan Applications</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Claims</TabsTrigger>
        </TabsList>

        {/* Loans Table */}
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Loan Applications</CardTitle>
              <CardDescription>
                Markov scoring & risk evaluation
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Markov</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loans.map((loan) => {
                    const markovBadge = getMarkovBadge(loan.markov_score || 0);

                    return (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.id}</TableCell>

                        <TableCell>{loan.farmer?.name || "-"}</TableCell>

                        <TableCell>₱{loan.amount}</TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={loan.credit_score || 0}
                              className="w-12 h-2"
                            />
                            <span>{loan.credit_score || 0}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge className={markovBadge.color}>
                            {(loan.markov_score || 0).toFixed(0)}%
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={
                              loan.risk_level === "High"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {loan.risk_level}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(loan.status)}
                            <Badge className="bg-gray-100 text-black hover:text-white">
                              {loan.status}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell className="flex gap-2">
                          <Link to={`/farmer/${loan.farmer?.id}`}>
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </Link>

                          {loan.status !== "Approved" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-green-600 text-white hover:bg-green-700"
                                >
                                  Approve
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Approve this loan?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will update the loan status to{" "}
                                    <strong>Approved</strong>. Are you sure you
                                    want to continue?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                                  <AlertDialogAction
                                    onClick={() => handleApprove(loan.id)}
                                    className="bg-green-600 text-white hover:bg-green-700"
                                  >
                                    Confirm Approve
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Table */}
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cause</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Validation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {insurances.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>

                      <TableCell>{row.farmer?.name || "-"}</TableCell>

                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.cause || "-"}</TableCell>

                      <TableCell>₱{row.amount.toLocaleString()}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            row.validation === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {row.validation}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge>{row.status}</Badge>
                      </TableCell>

                      <TableCell>
                        <Link to={`/farmer/${row.farmer?.id}`}>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDashboard;
