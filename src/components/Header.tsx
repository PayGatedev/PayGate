import React from 'react';
import { Link } from 'react-router-dom';
import ConnectWalletButton from './ConnectWalletButton';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold">PayGate</Link>
        <div className="flex space-x-4">
          <Link to="/subscribe" className="hover:text-gray-400">Subscribe</Link>
          <Link to="/profile" className="hover:text-gray-400">Profile</Link>
        </div>
        <ConnectWalletButton />
      </nav>
    </header>
  );
};

export default Header;
