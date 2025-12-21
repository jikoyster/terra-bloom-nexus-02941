// src/pages/Sell.tsx

import React from "react";

/* =======================
   Interfaces (optional)
======================= */
// Add props or data interfaces here when needed
// interface SellProps {}

const Sell: React.FC = () => {
  return (
    <div className="p-6">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Sell</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage selling transactions.
        </p>
      </header>

      {/* Main Content */}
      <main className="space-y-4">
        {/* Placeholder content */}
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Sell page content goes here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Sell;
