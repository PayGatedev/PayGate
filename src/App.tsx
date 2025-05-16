"use client"

import type React from "react"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// Import pages
import Home from "./pages/Home"
import ApplyPage from "./pages/Apply"

// Import styles
import "@solana/wallet-adapter-react-ui/styles.css"
import "./index.css"

// Auth context
import { AuthProvider, useAuth } from "./context/AuthContext"
import Dashboard from "./pages/DashboardPage"
import ContentPage from "./pages/dashboard/content/page"
import SubscribersPage from "./pages/dashboard/subscribers/page"
import EarningsPage from "./pages/dashboard/earnings/page"
import CollaboratorsPage from "./pages/dashboard/collaborators/page"
import ProposalsPage from "./pages/dashboard/proposals/page"
import SettingsPage from "./pages/dashboard/settings/page"
import WalletPage from "./pages/dashboard/wallet/page"
import NotFound from "./pages/NotFound"
import CreateContentPage from "./pages/dashboard/content/create/page"

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="min-h-screen bg-[#0F1116] text-white flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const AppContent = () => {

  return (
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<ApplyPage />} />

              {/* Dashboard routes - protected */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/content"
                element={
                  <ProtectedRoute>
                    <ContentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/content/create"
                element={
                  <ProtectedRoute>
                    <CreateContentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/subscribers"
                element={
                  <ProtectedRoute>
                    <SubscribersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/earnings"
                element={
                  <ProtectedRoute>
                    <EarningsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/collaborators"
                element={
                  <ProtectedRoute>
                    <CollaboratorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/proposals"
                element={
                  <ProtectedRoute>
                    <ProposalsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/wallet"
                element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
