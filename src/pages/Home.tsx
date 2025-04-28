import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Welcome to PayGate</h1>
        <p className="mt-4">The decentralized subscription platform for creators and their communities.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
