// src/pages/SubscribePage.tsx

import SubscriptionForm from "../components/SubscriptionForm";

const SubscribePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Subscribe to Creator</h1>
        <SubscriptionForm />
      </div>
    </div>
  );
};

export default SubscribePage;
