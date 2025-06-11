"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useWallet } from "@solana/wallet-adapter-react"; // Import useWallet
import {
  ArrowLeft,
  Video,
  Upload,
  Eye,
  Save,
  CheckCircle,
  LinkIcon,
  Clock,
  AlertCircle,
  Globe,
  Calendar,
  Coins,
  Lock,
  X,
  Loader2,
} from "lucide-react"

import FormInput from "../ui/FormInput"
import FormTextarea from "../ui/FormTextarea"
import FormRadio from "../ui/FormRadio"
import FormDatePicker from "../ui/FormDatePicker"
import FormCheckbox from "../ui/FormCheckbox"
import FormFileUpload from "../ui/FormFileUpload"
import FormTagInput from "../ui/FormTagInput"
import FormSection from "../ui/FormSection"
import RichTextEditor from "../ui/RichTextEditor"

interface VideoFormProps {
  onBack: () => void
}

const API_BASE_URL = "/api";

export default function VideoForm({ onBack }: VideoFormProps) {
  const navigate = useNavigate();
  const { publicKey, connected: isWalletConnected } = useWallet(); // Use the wallet hook

  const [previewMode, setPreviewMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [videoSource, setVideoSource] = useState<"upload" | "external">("upload");
  const [currentChapter, setCurrentChapter] = useState({ title: "", timestamp: "" });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>("");

  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
  const [localThumbnailPreviewUrl, setLocalThumbnailPreviewUrl] = useState<string>("");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusMessage, setUploadStatusMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
    tags: [] as string[],
    collaborators: [] as string[],
    transcript: "",
    chapters: [] as { title: string; timestamp: string }[],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    isPublic: true,
    allowComments: true,
    allowReactions: true,
    accessType: "free",
    price: "",
    isScheduled: false,
    publishDate: "",
    publishTime: "",
    // walletAddress: "" // Removed from local form data
    isDraft: false,
  });

  useEffect(() => {
    const localVidPreview = localPreviewUrl;
    const localThumbPreview = localThumbnailPreviewUrl;
    return () => {
      if (localVidPreview) {
        URL.revokeObjectURL(localVidPreview)
      }
      if (localThumbPreview) {
        URL.revokeObjectURL(localThumbPreview)
      }
    }
  }, [localPreviewUrl, localThumbnailPreviewUrl]);

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleVideoFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
    }
    if (file) {
      setLocalPreviewUrl(URL.createObjectURL(file));
      updateFormData("videoUrl", "");
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.videoUrl;
        delete newErrors.videoS3Upload;
        return newErrors;
      });
    } else {
      setLocalPreviewUrl("");
    }
  };

  const handleThumbnailFileSelect = (file: File | null) => {
    setSelectedThumbnailFile(file);
    if (localThumbnailPreviewUrl) {
      URL.revokeObjectURL(localThumbnailPreviewUrl);
    }
    if (file) {
      setLocalThumbnailPreviewUrl(URL.createObjectURL(file));
      updateFormData("thumbnailUrl", "");
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.thumbnailUrl;
        delete newErrors.thumbnailS3Upload;
        return newErrors;
      });
    } else {
      setLocalThumbnailPreviewUrl("");
    }
  };

  const handleAddChapter = () => {
    if (currentChapter.title && currentChapter.timestamp) {
      setFormData((prev) => ({
        ...prev,
        chapters: [...prev.chapters, { ...currentChapter }],
      }));
      setCurrentChapter({ title: "", timestamp: "" });
    }
  };

  const handleRemoveChapter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      
      if (!isWalletConnected || !publicKey) { // Validate wallet connection
          newErrors.walletConnection = "Creator wallet is not connected. Please connect to proceed.";
      }

      if (videoSource === "upload") {
        if (!selectedFile && !formData.videoUrl) {
          newErrors.videoUrl = "Video file is required for upload source.";
        }
      } else if (videoSource === "external") {
        if (!formData.videoUrl.trim()) newErrors.videoUrl = "Video URL is required for external source.";
        try {
          new URL(formData.videoUrl);
        } catch (_) {
          newErrors.videoUrl = "Invalid URL format for external video.";
        }
      }
    } else if (step === 3) {
      if (formData.accessType === "one-time" && !formData.price) {
        newErrors.price = "Price is required for paid content.";
      }
      if (formData.isScheduled) {
        if (!formData.publishDate) newErrors.publishDate = "Publication date is required.";
        if (!formData.publishTime) newErrors.publishTime = "Publication time is required.";
      }
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const uploadFileToS3_Multipart = async (file: File, purpose: "video" | "thumbnail"): Promise<string | null> => {
    setUploadStatusMessage(`Uploading ${purpose}...`);
    setUploadProgress(0);
    let uploadId = "";
    let s3Key = "";
    const errorKey = purpose === "video" ? "videoS3Upload" : "thumbnailS3Upload";

    try {
      const startResponse = await fetch(`https://paygate-dyof.onrender.com${API_BASE_URL}/s3/start-upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });
      if (!startResponse.ok) {
        const errorData = await startResponse.json();
        throw new Error(errorData.details || `Failed to start ${purpose} upload`);
      }
      const { uploadId: newUploadId, key: newKey } = await startResponse.json();
      uploadId = newUploadId;
      s3Key = newKey;

      const CHUNK_SIZE = 5 * 1024 * 1024;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const urlsResponse = await fetch(`https://paygate-dyof.onrender.com${API_BASE_URL}/s3/get-upload-urls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: s3Key, uploadId, partsCount: totalChunks }),
      });
      if (!urlsResponse.ok) {
        const errorData = await urlsResponse.json();
        throw new Error(errorData.details || `Failed to get ${purpose} pre-signed URLs`);
      }
      const { urls: presignedUrls } = await urlsResponse.json() as { urls: { partNumber: number; signedUrl: string }[] };

      const uploadedParts: { ETag: string; PartNumber: number }[] = [];
      let totalUploadedBytes = 0;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        const partNumber = i + 1;
        const presignedUrlData = presignedUrls.find(u => u.partNumber === partNumber);

        if (!presignedUrlData) {
          throw new Error(`Could not find pre-signed URL for ${purpose} part ${partNumber}`);
        }
        
        const uploadPartResponse = await fetch(presignedUrlData.signedUrl, {
          method: "PUT",
          body: chunk,
          headers: { 'Content-Type': file.type }
        });

        if (!uploadPartResponse.ok) {
          throw new Error(`Failed to upload ${purpose} part ${partNumber}. Status: ${uploadPartResponse.status}`);
        }
        const eTag = uploadPartResponse.headers.get("ETag");
        if (!eTag) {
          throw new Error(`ETag not found for ${purpose} part ${partNumber}`);
        }
        uploadedParts.push({ ETag: eTag.replace(/"/g, ""), PartNumber: partNumber });
        totalUploadedBytes += chunk.size;
        setUploadProgress(Math.round((totalUploadedBytes / file.size) * 100));
      }

      const completeResponse = await fetch(`https://paygate-dyof.onrender.com${API_BASE_URL}/s3/complete-upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: s3Key, uploadId, parts: uploadedParts }),
      });
      if (!completeResponse.ok) {
        const errorData = await completeResponse.json();
        await fetch(`https://paygate-dyof.onrender.com${API_BASE_URL}/s3/abort-upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: s3Key, uploadId }),
        });
        throw new Error(errorData.details || `Failed to complete ${purpose} upload`);
      }
      const { location } = await completeResponse.json();
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
      return location;
    } catch (err: any) {
      console.error(`S3 Upload Error for ${purpose}:`, err);
      setErrors((prev) => ({ ...prev, [errorKey]: err.message || `${purpose[0].toUpperCase() + purpose.slice(1)} upload failed` }));
      if (uploadId && s3Key) {
         try {
            await fetch(`https://paygate-dyof.onrender.com${API_BASE_URL}/s3/abort-upload`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: s3Key, uploadId }),
            });
         } catch (abortError) {
            console.error(`Failed to abort ${purpose} upload itself:`, abortError);
         }
      }
      return null;
    }
  };

  const handleNextStep = () => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.videoS3Upload;
      delete newErrors.thumbnailS3Upload;
      delete newErrors.formSubmit;
      delete newErrors.walletConnection; // Clear wallet connection error if any
      return newErrors;
    });
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    } else {
      onBack()
    }
  };

  const handleSubmit = async (isDraft = false) => {
    setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.formSubmit;
        delete newErrors.walletConnection;
        return newErrors;
    });
    if (isUploading) return;

    if (!isWalletConnected || !publicKey) {
        setErrors(prev => ({ ...prev, walletConnection: "Wallet not connected. Please connect your wallet to submit." }));
        if (currentStep !== 1 && !isDraft) setCurrentStep(1);
        setIsUploading(false);
        return;
    }
    const creatorWalletAddress = publicKey.toBase58();

    if (!isDraft && currentStep !== 3 && !validateStep(currentStep)) {
        setUploadStatusMessage("Please correct errors in the current step.");
        return;
    }
     if (videoSource === 'upload' && !selectedFile && !formData.videoUrl && !isDraft) {
        setErrors(prev => ({ ...prev, videoUrl: "Video file is required for upload." }));
        if (currentStep !== 1) setCurrentStep(1);
        return;
    }

    setIsUploading(true);
    setUploadStatusMessage("Starting submission...");

    let finalVideoS3Url = formData.videoUrl;
    let finalThumbnailS3Url = formData.thumbnailUrl;

    if (videoSource === "upload" && selectedFile) {
      setUploadStatusMessage("Uploading video...");
      const s3VidUrl = await uploadFileToS3_Multipart(selectedFile, "video");
      if (s3VidUrl) {
        finalVideoS3Url = s3VidUrl;
        updateFormData("videoUrl", s3VidUrl);
      } else {
        if (!isDraft) {
            setIsUploading(false);
            setUploadStatusMessage("Video upload failed. Cannot publish.");
            return;
        }
      }
    }

    if (selectedThumbnailFile) {
      setUploadStatusMessage("Uploading thumbnail...");
      const s3ThumbUrl = await uploadFileToS3_Multipart(selectedThumbnailFile, "thumbnail");
      if (s3ThumbUrl) {
        finalThumbnailS3Url = s3ThumbUrl;
        updateFormData("thumbnailUrl", s3ThumbUrl);
      } else {
        if (!isDraft) {
             setUploadStatusMessage("Thumbnail upload failed. Form not published.");
             setIsUploading(false);
             return;
        }
      }
    }
    
    setUploadStatusMessage(isDraft ? "Saving draft..." : "Finalizing submission...");
    
    if (!isDraft) {
        const step1Valid = validateStep(1);
        const step3Valid = validateStep(3);

        if (!step1Valid || !step3Valid ) { 
            setIsUploading(false);
            setUploadStatusMessage("Validation failed. Please check errors in all steps.");
            if (!step1Valid) setCurrentStep(1);
            else if (!step3Valid) setCurrentStep(3);
            return;
        }
        if (errors.videoS3Upload || errors.thumbnailS3Upload) {
            setIsUploading(false);
            setUploadStatusMessage("File upload errors detected. Cannot publish.");
            return;
        }
        if (videoSource === 'upload' && (!finalVideoS3Url || !finalVideoS3Url.startsWith('http'))) {
            setErrors(prev => ({ ...prev, videoUrl: "A valid video URL is required after upload to publish." }));
            setIsUploading(false);
            setUploadStatusMessage("Video URL missing or invalid after upload attempt.");
            if (currentStep !== 1) setCurrentStep(1);
            return;
        }
    }

    let payload_videoUrl: string | undefined = finalVideoS3Url;
    if (isDraft && (payload_videoUrl === "" || !payload_videoUrl?.startsWith('http'))) {
        payload_videoUrl = undefined;
    }

    let payload_thumbnailUrl: string | undefined = finalThumbnailS3Url;
    if (payload_thumbnailUrl === "" || !payload_thumbnailUrl?.startsWith('http')) {
        payload_thumbnailUrl = undefined;
    }

    let numericPrice: number | undefined = undefined;
    if (formData.price !== "" && typeof formData.price !== 'undefined' && formData.price !== null) {
        const parsedPrice = parseFloat(formData.price);
        if (!isNaN(parsedPrice) && parsedPrice >= 0) {
            numericPrice = parsedPrice;
        } else if (!isDraft) {
            setErrors(prev => ({ ...prev, price: "Invalid price format. Price must be a non-negative number." }));
            setIsUploading(false);
            setUploadStatusMessage("Invalid price value.");
            if (currentStep !== 3) setCurrentStep(3);
            return;
        }
    }
    
    const payload: any = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration || undefined,
        transcript: formData.transcript || undefined,
        chapters: formData.chapters && formData.chapters.length > 0 ? formData.chapters : undefined,
        tags: formData.tags && formData.tags.length > 0 ? formData.tags : undefined,
        collaborators: formData.collaborators && formData.collaborators.length > 0 ? formData.collaborators : undefined,
        seoTitle: formData.seoTitle || undefined,
        seoDescription: formData.seoDescription || undefined,
        seoKeywords: formData.seoKeywords || undefined,
        
        isPublic: formData.isPublic,
        allowComments: formData.allowComments,
        allowReactions: formData.allowReactions,
        accessType: formData.accessType,
        
        isScheduled: formData.isScheduled,
        publishDate: formData.isScheduled && formData.publishDate ? formData.publishDate : undefined,
        publishTime: formData.isScheduled && formData.publishTime ? formData.publishTime : undefined,
        
        walletAddress: creatorWalletAddress,
        kind: "video",
        videoUrl: payload_videoUrl,
        thumbnailUrl: payload_thumbnailUrl,
        price: numericPrice,
        isDraft: isDraft,
    };

    Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
            delete payload[key];
        }
    });

    console.log("Submitting to /api/content/create:", JSON.stringify(payload, null, 2));
    setUploadStatusMessage(isDraft ? "Saving draft..." : "Submitting content...");

    try {
        const response = await fetch(`https://paygate-dyof.onrender.com/api/content/create`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = errorData.message || 'Failed to create content.';
          if (errorData.details && Array.isArray(errorData.details)) {
            errorMessage += ` Details: ${errorData.details.join(', ')}`;
          }
          throw new Error(errorMessage);
        }

        const createdContent = await response.json();
        console.log("Content created:", createdContent);
        alert(`Content ${isDraft ? 'saved as draft' : 'published'} successfully!`);
        navigate("/dashboard/content");

    } catch (err: any) {
        console.error("Error submitting form:", err);
        setErrors(prev => ({ ...prev, formSubmit: err.message || "Submission failed" }));
        setUploadStatusMessage("Submission failed.");
    } finally {
        setIsUploading(false);
        setUploadStatusMessage("");
    }
  };

  const handleCancel = () => {
    const userConfirmed = globalThis.confirm("Are you sure you want to cancel? All your progress will be lost.");
    if (userConfirmed) {
      navigate("/dashboard/content")
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Basic Information</h2>
            {errors.walletConnection && <p className="text-red-400 text-sm mb-2">{errors.walletConnection}</p>}
            {errors.videoS3Upload && <p className="text-red-400 text-sm mb-2">{errors.videoS3Upload}</p>}
            {errors.thumbnailS3Upload && <p className="text-red-400 text-sm mb-2">{errors.thumbnailS3Upload}</p>}
            <FormSection>
              <FormInput
                label="Video Title"
                required
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Enter a compelling title for your video"
                error={errors.title}
              />
              <FormTextarea
                label="Description"
                required
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Provide a brief overview of your video"
                error={errors.description}
                characterCount
                maxLength={300}
              />
              {/* Wallet Address Input Removed - Now uses useWallet */}
              {/* You might want to display the connected wallet address here for confirmation: */}
              {isWalletConnected && publicKey && (
                <div className="mb-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-sm text-white/70">Creator Wallet:</p>
                    <p className="text-sm text-blue-400 break-all">{publicKey.toBase58()}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-white/80 mb-2 text-sm font-medium">Video Source</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => { setVideoSource("upload"); updateFormData("videoUrl", ""); setSelectedFile(null); setLocalPreviewUrl(""); }}
                    className={`glassmorphism-card p-4 rounded-xl border ${
                      videoSource === "upload"
                        ? "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-glow-sm"
                        : "border-white/10 hover:bg-white/5"
                    } transition-all group text-left`}
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center mr-4">
                        <Upload className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                          Upload Video
                        </h3>
                        <p className="text-white/60 text-xs">Upload a video file from your device.</p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVideoSource("external"); updateFormData("videoUrl", ""); setSelectedFile(null); setLocalPreviewUrl(""); }}
                    className={`glassmorphism-card p-4 rounded-xl border ${
                      videoSource === "external"
                        ? "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-glow-sm"
                        : "border-white/10 hover:bg-white/5"
                    } transition-all group text-left`}
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center mr-4">
                        <LinkIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                          External URL
                        </h3>
                        <p className="text-white/60 text-xs">
                          Link to a video hosted elsewhere (YouTube, Vimeo, etc.).
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {videoSource === "upload" ? (
                <>
                  <FormFileUpload
                    label="Upload Video"
                    required
                    onChange={handleVideoFileSelect}
                    accept="video/*"
                    maxSize={500}
                    error={errors.videoUrl || errors.videoS3Upload}
                    helperText="Maximum file size: 500MB. Supported formats: MP4, MOV, AVI, etc."
                    previewUrl={localPreviewUrl}
                    placeholder={
                      <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#161921] to-[#0F1116] flex items-center justify-center overflow-hidden">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                          <Video className="w-8 h-8 text-blue-400/60" />
                        </div>
                      </div>
                    }
                  />
                </>
              ) : (
                <FormInput
                  label="Video URL"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => updateFormData("videoUrl", e.target.value)}
                  placeholder="http://example.com/video.mp4"
                  error={errors.videoUrl}
                  helperText="Enter a YouTube, Vimeo, or other video platform URL"
                />
              )}
              {isUploading && uploadStatusMessage && (
                <div className="mt-4">
                   <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-blue-400">{uploadStatusMessage}</span>
                        <span className="text-sm font-medium text-blue-400">{uploadProgress > 0 && `${uploadProgress}%`}</span>
                    </div>
                   {uploadProgress > 0 && (
                     <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                   )}
                </div>
                )}


              <FormInput
                label="Video Duration"
                value={formData.duration}
                onChange={(e) => updateFormData("duration", e.target.value)}
                placeholder="HH:MM:SS"
                helperText="Enter the duration of your video (e.g., 00:05:30 for 5 minutes and 30 seconds)"
              />
              <FormFileUpload
                label="Thumbnail Image"
                onChange={handleThumbnailFileSelect}
                helperText="Recommended size: 1280x720px (16:9 ratio). Max size: 5MB. (Optional)"
                accept="image/*"
                previewUrl={localThumbnailPreviewUrl}
                error={errors.thumbnailUrl || errors.thumbnailS3Upload}
              />
              <FormTagInput
                label="Tags"
                tags={formData.tags}
                onChange={(tags) => updateFormData("tags", tags)}
                helperText="Add up to 10 tags to help users discover your video"
                maxTags={10}
              />
            </FormSection>
            <FormSection
              title="Collaborators"
              description="Add collaborators who will receive a share of earnings from this content (Optional)"
            >
              <FormTagInput
                label="Collaborators"
                tags={formData.collaborators}
                onChange={(collaborators) => updateFormData("collaborators", collaborators)}
                placeholder="Enter wallet address or username"
              />
            </FormSection>
            <FormSection title="SEO Settings">
              <div className="flex justify-between items-center mb-4">
                <p className="text-white/60 text-sm">Optimize your video for search engines (Recommended)</p>
              </div>
              <FormInput
                label="SEO Title"
                value={formData.seoTitle}
                onChange={(e) => updateFormData("seoTitle", e.target.value)}
                placeholder="Enter SEO title (defaults to video title if empty)"
              />
              <FormTextarea
                label="SEO Description"
                value={formData.seoDescription}
                onChange={(e) => updateFormData("seoDescription", e.target.value)}
                placeholder="Enter SEO description (defaults to video description if empty)"
              />
              <FormInput
                label="SEO Keywords"
                value={formData.seoKeywords}
                onChange={(e) => updateFormData("seoKeywords", e.target.value)}
                placeholder="Enter comma-separated keywords"
                helperText="Separate keywords with commas (e.g., tutorial, blockchain, crypto)"
              />
            </FormSection>
          </div>
        )
      case 2:
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Video Details</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                    previewMode
                      ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                      : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? "Exit Preview" : "Preview"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  disabled={isUploading}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4" />}
                  Save Draft
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={previewMode ? "hidden lg:block" : ""}>
                <FormSection title="Transcript (Optional)">
                  <RichTextEditor
                    label="Video Transcript"
                    value={formData.transcript}
                    onChange={(value) => updateFormData("transcript", value)}
                    placeholder="Add a transcript of your video content..."
                    minHeight="200px"
                  />
                  <p className="text-white/40 text-xs mt-2">
                    Adding a transcript improves accessibility and helps with SEO.
                  </p>
                </FormSection>
                <FormSection title="Chapters">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.chapters.map((chapter, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-white/10 text-white/80 px-3 py-2 rounded-md text-sm w-full"
                        >
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400">{chapter.timestamp}</span>
                          <span className="mx-2">-</span>
                          <span className="flex-1">{chapter.title}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveChapter(index)}
                            className="text-white/60 hover:text-white/90"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="col-span-1">
                        <input
                          type="text"
                          value={currentChapter.timestamp}
                          onChange={(e) => setCurrentChapter((prev) => ({ ...prev, timestamp: e.target.value }))}
                          placeholder="00:00:00"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white/10 transition-all"
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="flex">
                          <input
                            type="text"
                            value={currentChapter.title}
                            onChange={(e) => setCurrentChapter((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Chapter title"
                            className="flex-1 bg-white/5 border border-white/10 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white/10 transition-all"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddChapter()
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddChapter}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-r-lg transition-all"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs">
                      Add timestamps to help viewers navigate your video (e.g., 00:01:30 - Introduction)
                    </p>
                  </div>
                </FormSection>
              </div>

              {previewMode && (
                <div className="lg:col-span-1">
                  <FormSection className="min-h-[500px]">
                    <div className="prose prose-invert max-w-none">
                      <h1>{formData.title || "Your Video Title"}</h1>
                      <p className="text-white/60">
                        {formData.description || "Your video description will appear here."}
                      </p>
                      {(formData.videoUrl || localPreviewUrl) && (
                        <div className="my-4 aspect-video bg-black/30 rounded-lg flex items-center justify-center">
                          { (videoSource === "upload" && (localPreviewUrl && !formData.videoUrl.startsWith('http')) && !selectedFile?.name) || (videoSource === "upload" && formData.videoUrl.startsWith('http')) ? (
                            <video src={formData.videoUrl.startsWith('http') ? formData.videoUrl : localPreviewUrl} controls className="w-full h-full rounded-lg">
                                Your browser does not support the video tag.
                            </video>
                          ) : videoSource === "upload" && localPreviewUrl && selectedFile?.name ? (
                             <video src={localPreviewUrl} controls className="w-full h-full rounded-lg">
                                Your browser does not support the video tag.
                            </video>
                          ) : videoSource === "external" && formData.videoUrl ? (
                             <p className="text-white/60">External video: {formData.videoUrl} (Preview not embedded)</p>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <Video className="w-12 h-12 text-blue-400/60 mb-2" />
                              <p className="text-white/60">Video preview will appear here</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </FormSection>
                </div>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Access & Publishing</h2>
            <FormSection title="Access Settings">
              <FormRadio
                label="Access Type"
                name="accessType"
                value={formData.accessType}
                onChange={(value) => updateFormData("accessType", value)}
                layout="cards"
                options={[
                  { value: "free", label: "Free Access", description: "Make your content available to everyone for free.", icon: <Globe className="w-5 h-5 text-green-400" />, color: "green" },
                  { value: "one-time", label: "One-Time Purchase", description: "Charge a one-time fee for access to this content.", icon: <Coins className="w-5 h-5 text-yellow-400" />, color: "yellow" },
                  { value: "recurring", label: "Subscription Only", description: "Make this content available only to your subscribers.", icon: <Calendar className="w-5 h-5 text-[#FF3366]" />, color: "pink" },
                  { value: "nft", label: "NFT Access Pass", description: "Require users to hold your NFT to access this content.", icon: <Lock className="w-5 h-5 text-purple-400" />, color: "purple" },
                ]}
              />
              {formData.accessType === "one-time" && (
                <div className="mt-4">
                  <FormInput
                    label="Price (SOL)"
                    required
                    value={formData.price}
                    onChange={(e) => updateFormData("price", e.target.value)}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    error={errors.price}
                    helperText="Minimum price: 0.01 SOL"
                    className="pl-10"
                  />
                </div>
              )}
              <div className="mt-4 space-y-3">
                <FormCheckbox
                  label="Allow comments on this content"
                  checked={formData.allowComments}
                  onChange={(checked) => updateFormData("allowComments", checked)}
                />
                <FormCheckbox
                  label="Allow reactions (likes) on this content"
                  checked={formData.allowReactions}
                  onChange={(checked) => updateFormData("allowReactions", checked)}
                />
                <FormRadio
                  name="visibility"
                  value={formData.isPublic ? "public" : "private"}
                  onChange={(value) => updateFormData("isPublic", value === "public")}
                  options={[
                    { value: "public", label: "Public", description: "Discoverable in search and recommendations" },
                    { value: "private", label: "Private", description: "Only accessible via direct link" },
                  ]}
                />
              </div>
            </FormSection>
            <FormSection title="Publishing Options">
              <FormRadio
                name="publishingOption"
                value={formData.isScheduled ? "scheduled" : "immediate"}
                onChange={(value) => updateFormData("isScheduled", value === "scheduled")}
                options={[
                  { value: "immediate", label: "Publish immediately" },
                  { value: "scheduled", label: "Schedule for later" },
                ]}
              />
              {formData.isScheduled && (
                <div className="ml-6 mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormDatePicker
                      label="Publication Date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={(e) => updateFormData("publishDate", e.target.value)}
                      error={errors.publishDate}
                      required={formData.isScheduled}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <FormInput
                      label="Publication Time"
                      type="time"
                      value={formData.publishTime}
                      onChange={(e) => updateFormData("publishTime", e.target.value)}
                      error={errors.publishTime}
                      required={formData.isScheduled}
                    />
                  </div>
                  <p className="text-white/40 text-xs">
                    Your content will be automatically published at the specified date and time.
                  </p>
                </div>
              )}
            </FormSection>
            <FormSection className="bg-gradient-to-r from-blue-500/10 to-transparent">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Before You Publish</h4>
                  <p className="text-white/60 text-sm mb-2">
                    Please review your video content carefully before publishing. Once published, your content will be
                    visible to users based on your access settings.
                  </p>
                  <ul className="text-white/60 text-sm list-disc list-inside space-y-1">
                    <li>Ensure your video plays correctly</li>
                    <li>Check that all chapters and timestamps are accurate</li>
                    <li>Verify that your transcript (if provided) matches the video content</li>
                    <li>Confirm your pricing and access settings are correct</li>
                  </ul>
                </div>
              </div>
            </FormSection>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6 flex items-center">
        <button
          onClick={handlePrevStep}
          disabled={isUploading}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep > 1 ? "Back" : "Back to Content Type"}</span>
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent ml-6">
          Create New Video
        </h1>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
        {[1,2,3].map(stepNum => (
          <div 
            key={stepNum}
            className={`flex flex-col items-center ${currentStep >= stepNum ? "cursor-pointer" : "opacity-50"}`}
            onClick={() => !isUploading && currentStep >= stepNum && (stepNum === 1 || validateStep(stepNum -1)) && setCurrentStep(stepNum)}
          >
            <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                currentStep > stepNum
                ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border border-green-500/30"
                : currentStep === stepNum
                ? "bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-white/40 border border-white/10"
            }`}
            >
            {currentStep > stepNum ? <CheckCircle className="w-5 h-5" /> : <span>{stepNum}</span>}
            </div>
            <span className={`text-sm transition-colors ${currentStep === stepNum ? "text-white font-medium" : "text-white/60"}`}>
            {stepNum === 1 ? "Basic Info" : stepNum === 2 ? "Details" : "Publishing"}
            </span>
          </div>
        ))}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-0 left-0 h-1 bg-white/10 w-full rounded-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-500/50 rounded-full transition-all"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {renderStepContent()}
      {errors.formSubmit && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
            {errors.formSubmit}
        </div>
      )}
       {(errors.videoS3Upload && currentStep !==1) && <p className="text-red-400 text-sm mt-2 text-center">{errors.videoS3Upload}</p>}
       {(errors.thumbnailS3Upload && currentStep !==1) && <p className="text-red-400 text-sm mt-2 text-center">{errors.thumbnailS3Upload}</p>}
       {(errors.walletConnection && currentStep !==1) && <p className="text-red-400 text-sm mt-2 text-center">{errors.walletConnection}</p>}


      <div className="flex justify-between mt-8">
        <button
          onClick={handleCancel}
          disabled={isUploading}
          className="px-6 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <div className="flex gap-3">
          {currentStep < 3 ? (
            <button
              onClick={handleNextStep}
              disabled={isUploading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-500/70 text-white transition-all shadow-glow-sm disabled:opacity-50 disabled:from-gray-500 disabled:to-gray-600"
            >
              {isUploading && uploadProgress > 0 ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
            </button>
          ) : (
            <>
              <button
                onClick={() => handleSubmit(true)}
                disabled={isUploading}
                className="px-6 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-all disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save as Draft"}
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={isUploading}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-500/70 text-white transition-all shadow-glow-sm disabled:opacity-50 disabled:from-gray-500 disabled:to-gray-600"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (formData.isScheduled ? "Schedule Publication" : "Publish Now")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}