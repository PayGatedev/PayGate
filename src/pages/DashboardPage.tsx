"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardPage from "./dashboard/page"

const Dashboard = () => {
  const navigate = useNavigate()

  // Handle navigation from sidebar
  useEffect(() => {
    // Listen for custom navigation events from the dashboard components
    const handleNavigation = (event: CustomEvent) => {
      navigate(event.detail.path)
    }

    window.addEventListener("dashboard-navigate" as any, handleNavigation)

    return () => {
      window.removeEventListener("dashboard-navigate" as any, handleNavigation)
    }
  }, [navigate])

  return <DashboardPage />
}

export default Dashboard
