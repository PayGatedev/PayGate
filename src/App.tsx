import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home'
import CreatorProfile from './components/CreatorProfile'
import Profile from './pages/Profile'
import Subscription from './pages/Subscription'
const CreatorProfileWrapper = () => {
  const { address } = useParams<{ address: string }>();

  if (!address) return <div>Address not found</div>;

  return <CreatorProfile creatorAddress={address} />;
};
const App = () => {
  return (
    <Router>
      <header className="flex justify-between p-4 border-b">
        <h1 className="text-xl font-bold">PayGate</h1>
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator/:address" element={<CreatorProfileWrapper />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
