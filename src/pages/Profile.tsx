import React from 'react';
import ProfileCard from '../components/ProfileCard';
import NFTCard from '../components/NFTCard';
import ProfileEditor from '../components/ProfileEditor';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <ProfileCard />
        <NFTCard />
        <ProfileEditor />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
