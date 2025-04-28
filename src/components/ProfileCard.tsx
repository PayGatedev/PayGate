import React from 'react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold">Your Profile</h2>
      <p className="text-gray-700 mt-2">Here you can manage your profile, subscriptions, and NFTs.</p>
    </div>
  );
};

export default ProfileCard;
