import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"; // assuming you use ShadCN toast

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);

  // Fetch currently logged in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You’ve been signed out successfully.",
      duration: 2000,
    });
    navigate("/login");
  };

  const showToast = (message: string, type: "info" | "success" | "error") => {
    toast({
      title: message,
      description:
        type === "info"
          ? "You have switched views."
          : type === "success"
          ? "Action completed successfully."
          : "An error occurred.",
      duration: 1500,
    });
  };

  if (!user) return null; // Prevents render errors while loading

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Leaf className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold">
              Terra<span className="text-green-600">Sync</span>
            </h1>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/*
            <h2 className="text-xl font-bold text-foreground">
              {user.user_metadata?.role || "User"} Dashboard
            </h2>
            */}
            <div className="flex items-center gap-4 mt-1 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Logged in as{" "}
                <b>
                  {user.user_metadata?.name || "Unnamed"} - {user.email}
                </b>
              </span>
              <Badge variant="outline">
                Region: {user.user_metadata?.region || "N/A"}
              </Badge>
              {/*
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast("Switched to Vendor View", "info")}
              >
                Switch to Vendor View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast("Switched to Farmer View", "info")}
              >
                Switch to Farmer View
              </Button>
              */}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="px-4 py-2"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
