"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "@solana/wallet-adapter-react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  login: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

// Remove the async keyword from the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)
  const wallet = useWallet()

  // Replace the entire useEffect block with this improved version that includes retries and timeout
  useEffect(() => {
    const MAX_RETRIES = 10
    const RETRY_DELAY = 2000 // 2 seconds between retries
    const TIMEOUT_DURATION = 60000 // 60 seconds total timeout

    let retryCount = 0
    let timeoutId: NodeJS.Timeout
    let retryIntervalId: NodeJS.Timeout

    const checkAuth = async () => {
      setIsLoading(true)

      try {
        console.log(`Checking wallet connection (attempt ${retryCount + 1}/${MAX_RETRIES})...`)

        if (wallet.connected && wallet.publicKey) {
          // Successfully connected
          console.log("Wallet connected successfully:", wallet.publicKey.toString())
          clearTimeout(timeoutId)
          clearInterval(retryIntervalId)

          setIsAuthenticated(true)
          setUser({
            walletAddress: wallet.publicKey.toString(),
            username: "CryptoCreator",
            role: "creator",
          })
          setIsLoading(false)
        } else if (retryCount >= MAX_RETRIES) {
          // Max retries reached
          console.log("Max retries reached. Authentication failed.")
          clearTimeout(timeoutId)
          clearInterval(retryIntervalId)

          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
        } else {
          // Not connected yet, will retry
          retryCount++
          console.log(`Wallet not connected yet. Will retry in ${RETRY_DELAY / 1000} seconds...`)
        }
      } catch (error) {
        console.error("Auth check error:", error)

        if (retryCount >= MAX_RETRIES) {
          clearTimeout(timeoutId)
          clearInterval(retryIntervalId)

          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
        } else {
          retryCount++
        }
      }
    }

    // Start the retry interval
    retryIntervalId = setInterval(checkAuth, RETRY_DELAY)

    // Initial check immediately
    checkAuth()

    // Set the overall timeout
    timeoutId = setTimeout(() => {
      console.log("Authentication timeout reached (60 seconds)")
      clearInterval(retryIntervalId)

      if (!isAuthenticated) {
        setIsAuthenticated(false)
        setUser(null)
        setIsLoading(false)
      }
    }, TIMEOUT_DURATION)

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      clearInterval(retryIntervalId)
    }
  }, [wallet.connected, wallet.publicKey])

  // Update the login function to include retries
  const login = async () => {
    setIsLoading(true)

    const MAX_CONNECT_RETRIES = 3
    let connectRetries = 0

    const attemptConnect = async (): Promise<boolean> => {
      try {
        if (!wallet.connected) {
          await wallet.connect()
          return true
        }
        return true
      } catch (error) {
        console.error(`Connect attempt ${connectRetries + 1} failed:`, error)
        connectRetries++

        if (connectRetries < MAX_CONNECT_RETRIES) {
          console.log(`Retrying connection (${connectRetries}/${MAX_CONNECT_RETRIES})...`)
          // Wait 2 seconds before retrying
          await new Promise((resolve) => setTimeout(resolve, 2000))
          return attemptConnect()
        }

        return false
      }
    }

    const connected = await attemptConnect()

    if (!connected) {
      console.error("Failed to connect wallet after multiple attempts")
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
    }
    // The useEffect will handle setting auth state if connection is successful
  }

  const logout = () => {
    setIsLoading(true)
    try {
      wallet.disconnect()
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
