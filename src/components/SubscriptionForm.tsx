
import React, { useState } from "react";

const SubscriptionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | "lifetime">("monthly");

  const handleSubscribe = async () => {
    //  TODO: додати логіку мінта NFT-доступу з solanaUtils
    alert(`Subscribed with ${selectedPlan} plan!`);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold">Choose your plan:</label>
      <select
        value={selectedPlan}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedPlan(e.target.value as 'monthly' | 'yearly' | 'lifetime')
          }
        className="p-2 rounded bg-gray-700 text-white"
      >
        <option value="monthly">Monthly — 1 SOL</option>
        <option value="yearly">Yearly — 10 SOL</option>
        <option value="lifetime">Lifetime — 20 SOL</option>
      </select>

      <button
        onClick={handleSubscribe}
        className="bg-green-500 hover:bg-green-600 p-2 rounded text-white font-bold mt-4"
      >
        Subscribe & Mint NFT
      </button>
    </div>
  );
};

export default SubscriptionForm;
