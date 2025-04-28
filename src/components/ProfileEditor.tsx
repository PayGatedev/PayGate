import React, { useState } from 'react';

const ProfileEditor: React.FC = () => {
  const [name, setName] = useState('');

  const handleSave = () => {
    alert(`Name updated to: ${name}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        placeholder="Enter new name"
      />
      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition-all shadow-md"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileEditor;
