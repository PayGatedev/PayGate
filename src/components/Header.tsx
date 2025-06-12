import React from 'react';
import { Link } from 'react-router-dom';
import {WalletButton} from './wallet-button';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link to="/" className="text-2xl font-semibold">PayGate</Link>
      <div className="space-x-4">
        <Link to="/subscribe" className="hover:text-blue-500">Subscribe</Link>
        <Link to="/profile" className="hover:text-blue-500">Profile</Link>
        <WalletButton />
      </div>
    </header>
  );
};

export default Header;
