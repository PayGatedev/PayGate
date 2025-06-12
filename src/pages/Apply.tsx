"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Link } from "react-router-dom"
import {
  ChevronLeft,
  Wallet,
  CheckCircle,
  XCircle,
  ChevronRight,
  ArrowRight,
  Video,
  FileText,
  Headphones,
  BookOpen,
  Coins,
  TrendingUp,
  Zap,
  User,
  FileIcon,
  Check,
  AlertCircle,
} from "lucide-react"
import { WalletButton } from "../components/wallet-button"

type ContentType = "video" | "article" | "podcast" | "guide" | "other"
type SubscriptionModel = "one-time" | "recurring" | "nft" | "multiple"

interface FormData {
  username: string
  contentTypes: ContentType[]
  subscriptionModels: SubscriptionModel[]
  description: string
  portfolioLinks: string
}

const initialFormData: FormData = {
  username: "",
  contentTypes: [],
  subscriptionModels: [],
  description: "",
  portfolioLinks: "",
}

// API URL - would come from environment variables in a real app
const API_URL = "https://paygate-dyof.onrender.com/api"

const ApplyPage = () => {
  const wallet = useWallet()
  const { setVisible } = useWalletModal()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  // Check if wallet is connected
  useEffect(() => {
    if (!wallet.connected && submitStatus === "idle") {
      // You might want to show a notification here
      console.log("Please connect your wallet to apply as a creator")
    }
  }, [wallet.connected, submitStatus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckboxChange = (
    type: "contentTypes" | "subscriptionModels",
    value: ContentType | SubscriptionModel,
  ) => {
    setFormData((prev) => {
      const currentValues = prev[type]
      // @ts-ignore
      if (currentValues.includes(value as any)) {
        return { ...prev, [type]: currentValues.filter((v) => v !== value) }
      } else {
        return { ...prev, [type]: [...currentValues, value as any] }
      }
    })
    // Clear error when user selects
    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: undefined }))
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (currentStep) {
      case 1: // Wallet connection
        if (!wallet.connected) {
          return false
        }
        break
      case 2: // Username
        if (!formData.username.trim()) {
          newErrors.username = "Username is required"
        }
        break
      case 3: // Content types and subscription models
        if (formData.contentTypes.length === 0) {
          // @ts-ignore
          newErrors.contentTypes = "Select at least one content type"
        }
        if (formData.subscriptionModels.length === 0) {
          // @ts-ignore
          newErrors.subscriptionModels = "Select at least one subscription model"
        }
        break
      case 4: // Description
        if (!formData.description.trim()) {
          newErrors.description = "Description is required"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!wallet.connected || !wallet.publicKey) {
      setVisible(true)
      return
    }

    if (!validateCurrentStep()) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Prepare data for API
      const creatorData = {
        username: formData.username,
        walletAddress: wallet.publicKey.toString(),
        contentTypes: formData.contentTypes,
        subscriptionModels: formData.subscriptionModels,
        description: formData.description,
        portfolioLinks: formData.portfolioLinks,
      }

      // Send data to API
      const response = await fetch(`${API_URL}/creators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creatorData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application")
      }

      setSubmitStatus("success")
    } catch (error: any) {
      console.error("Error submitting form:", error)
      setErrorMessage(error.message || "An unexpected error occurred")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setSubmitStatus("idle")
    setErrorMessage("")
    setCurrentStep(1)
  }

  // If form was successfully submitted
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-[#0F1116] text-white py-20 px-4">
        <div className="max-w-2xl mx-auto bg-[#161921] rounded-lg border border-gray-800 p-8">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-gray-300 mb-8">
              Thank you for applying to become a creator on PayGate. We've received your application and will review it
              shortly. You'll receive a notification once your application has been processed.
            </p>
            <Link to="/">
              <button className="bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If there was an error submitting the form
  if (submitStatus === "error") {
    return (
      <div className="min-h-screen bg-[#0F1116] text-white py-20 px-4">
        <div className="max-w-2xl mx-auto bg-[#161921] rounded-lg border border-gray-800 p-8">
          <div className="flex flex-col items-center text-center">
            <XCircle className="w-16 h-16 text-red-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Submission Failed</h1>
            <p className="text-gray-300 mb-4">There was an error submitting your application:</p>
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-md mb-6 w-full max-w-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{errorMessage || "An unexpected error occurred. Please try again."}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors"
              >
                Try Again
              </button>
              <Link to="/">
                <button className="bg-transparent border border-gray-700 text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F1116] text-white">
      <header className="bg-[#0A0A0B] shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#FF3366] font-bold text-xl">PayGate</span>
          </Link>
          <WalletButton />
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Apply as a Creator</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Connect your wallet and complete the application to join our creator community.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === currentStep
                        ? "bg-[#FF3366] text-white"
                        : step < currentStep
                          ? "bg-green-500 text-white"
                          : "bg-[#161921] text-gray-400"
                    }`}
                  >
                    {step < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      step === currentStep ? "text-[#FF3366]" : step < currentStep ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {step === 1 ? "Wallet" : step === 2 ? "Profile" : step === 3 ? "Content" : "Description"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#161921]"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-[#FF3366] transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[#161921] rounded-lg border border-gray-800 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Wallet Connection */}
              {currentStep === 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-6">
                    <Wallet className="w-10 h-10 text-[#FF3366]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                  <p className="text-gray-400 text-center mb-8 max-w-md">
                    Connect your Solana wallet to verify your identity and continue with the application process.
                  </p>

                  {!wallet.connected ? (
                    <button
                      type="button"
                      onClick={() => setVisible(true)}
                      className="bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors w-full max-w-xs"
                    >
                      Connect Wallet
                      <Wallet className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full max-w-md">
                      <div className="p-4 bg-[#0F1116] rounded-md border border-gray-800 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-[#FF3366]" />
                          </div>
                          <div>
                            <div className="font-medium">Wallet Connected</div>
                            <div className="text-xs text-gray-400">
                              {wallet.publicKey?.toString().slice(0, 8)}...{wallet.publicKey?.toString().slice(-8)}
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors w-full"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Username */}
              {currentStep === 2 && (
                <div>
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-6">
                      <User className="w-10 h-10 text-[#FF3366]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
                    <p className="text-gray-400 text-center max-w-md">
                      Choose a username that will represent you on the platform.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0F1116] border ${
                        errors.username ? "border-red-500" : "border-gray-700"
                      } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50`}
                      placeholder="Choose a unique username"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-transparent border border-gray-700 text-white font-medium rounded-md px-6 py-3 text-base flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Content Types and Subscription Models */}
              {currentStep === 3 && (
                <div>
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-6">
                      <FileIcon className="w-10 h-10 text-[#FF3366]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Content & Subscription</h2>
                    <p className="text-gray-400 text-center max-w-md">
                      Select the types of content you'll create and your preferred subscription models.
                    </p>
                  </div>

                  <div className="mb-8">
                    <label className="block text-lg font-medium text-white mb-4">Content Types *</label>
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                        errors.contentTypes ? "border border-red-500 rounded-md p-3" : ""
                      }`}
                    >
                      {[
                        { value: "video", label: "Videos", icon: <Video className="w-5 h-5" /> },
                        { value: "article", label: "Articles", icon: <FileText className="w-5 h-5" /> },
                        { value: "podcast", label: "Podcasts", icon: <Headphones className="w-5 h-5" /> },
                        { value: "guide", label: "Guides", icon: <BookOpen className="w-5 h-5" /> },
                        { value: "other", label: "Other", icon: <FileIcon className="w-5 h-5" /> },
                      ].map((type) => (
                        <div
                          key={type.value}
                          onClick={() => handleCheckboxChange("contentTypes", type.value as ContentType)}
                          className={`flex items-center gap-3 p-4 rounded-md cursor-pointer transition-colors ${
                            formData.contentTypes.includes(type.value as ContentType)
                              ? "bg-[#FF3366]/10 border border-[#FF3366]/30"
                              : "bg-[#0F1116] border border-gray-700 hover:bg-[#0F1116]/80"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              formData.contentTypes.includes(type.value as ContentType)
                                ? "bg-[#FF3366]/20 text-[#FF3366]"
                                : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {type.icon}
                          </div>
                          <span className="font-medium">{type.label}</span>
                          {formData.contentTypes.includes(type.value as ContentType) && (
                            <CheckCircle className="w-5 h-5 text-[#FF3366] ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.contentTypes && <p className="mt-2 text-sm text-red-500">{errors.contentTypes}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-lg font-medium text-white mb-4">Subscription Models *</label>
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                        errors.subscriptionModels ? "border border-red-500 rounded-md p-3" : ""
                      }`}
                    >
                      {[
                        { value: "one-time", label: "One-time Payments", icon: <Coins className="w-5 h-5" /> },
                        {
                          value: "recurring",
                          label: "Recurring Subscriptions",
                          icon: <TrendingUp className="w-5 h-5" />,
                        },
                        { value: "nft", label: "NFT Access Passes", icon: <Zap className="w-5 h-5" /> },
                        { value: "multiple", label: "Multiple Tiers", icon: <FileIcon className="w-5 h-5" /> },
                      ].map((model) => (
                        <div
                          key={model.value}
                          onClick={() => handleCheckboxChange("subscriptionModels", model.value as SubscriptionModel)}
                          className={`flex items-center gap-3 p-4 rounded-md cursor-pointer transition-colors ${
                            formData.subscriptionModels.includes(model.value as SubscriptionModel)
                              ? "bg-[#FF3366]/10 border border-[#FF3366]/30"
                              : "bg-[#0F1116] border border-gray-700 hover:bg-[#0F1116]/80"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              formData.subscriptionModels.includes(model.value as SubscriptionModel)
                                ? "bg-[#FF3366]/20 text-[#FF3366]"
                                : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {model.icon}
                          </div>
                          <span className="font-medium">{model.label}</span>
                          {formData.subscriptionModels.includes(model.value as SubscriptionModel) && (
                            <CheckCircle className="w-5 h-5 text-[#FF3366] ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.subscriptionModels && (
                      <p className="mt-2 text-sm text-red-500">{errors.subscriptionModels}</p>
                    )}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-transparent border border-gray-700 text-white font-medium rounded-md px-6 py-3 text-base flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Description and Review */}
              {currentStep === 4 && (
                <div>
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-6">
                      <FileText className="w-10 h-10 text-[#FF3366]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Creator Description</h2>
                    <p className="text-gray-400 text-center max-w-md">
                      Tell us about yourself and share any relevant portfolio links.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                      Creator Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full bg-[#0F1116] border ${
                        errors.description ? "border-red-500" : "border-gray-700"
                      } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50`}
                      placeholder="Tell us about yourself and the content you create..."
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>

                  <div className="mb-8">
                    <label htmlFor="portfolioLinks" className="block text-sm font-medium text-gray-300 mb-2">
                      Portfolio Links (Optional)
                    </label>
                    <textarea
                      id="portfolioLinks"
                      name="portfolioLinks"
                      value={formData.portfolioLinks}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50"
                      placeholder="Links to your existing work (one per line)"
                    ></textarea>
                  </div>

                  <div className="bg-[#0F1116] rounded-md p-4 border border-gray-700 mb-8">
                    <h3 className="font-medium mb-3">Application Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Wallet Address:</span>
                        <span>
                          {wallet.publicKey?.toString().slice(0, 6)}...{wallet.publicKey?.toString().slice(-6)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Username:</span>
                        <span>{formData.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Content Types:</span>
                        <span>{formData.contentTypes.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subscription Models:</span>
                        <span>{formData.subscriptionModels.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-transparent border border-gray-700 text-white font-medium rounded-md px-6 py-3 text-base flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-[#FF3366] text-white font-medium rounded-md px-8 py-3 text-base flex items-center justify-center gap-2 hover:bg-[#FF3366]/90 transition-colors ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ApplyPage
