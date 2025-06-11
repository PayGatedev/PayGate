"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  Loader2,
  AlertTriangle,
  SkipForward,
  RotateCcw,
} from "lucide-react"

interface VideoPlayerProps {
  content: {
    videoUrl: string // Expects "url1@url2@url3"
    thumbnailUrl?: string // Optional: for initial display
    title?: string // For alt text
    premium?: boolean // Example, adjust as per your content structure
    theme?: any // Theme object for dynamic colors
  }
  isTheaterMode?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content, isTheaterMode = false }) => {
  const [partUrls, setPartUrls] = useState<string[]>([])
  const [currentPartIndex, setCurrentPartIndex] = useState<number>(0)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0) // Duration of the current segment

  const [volume, setVolume] = useState(0.8) // Default volume 0-1
  const [showControls, setShowControls] = useState(true)
  const [quality, setQuality] = useState("Auto") // Placeholder
  const [playbackSpeed, setPlaybackSpeed] = useState(1) // Placeholder
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [isHoveringProgress, setIsHoveringProgress] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const preloadVideoRef = useRef<HTMLVideoElement>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const theme = content.theme || {
    primary: "blue-500",
    primaryLight: "blue-400",
    text: "text-blue-400",
    bg: "blue-500/10",
    gradient: "from-blue-500 to-blue-600",
    gradientSubtle: "from-blue-500/20 to-blue-600/10",
    border: "blue-500/30", // Added for settings menu consistency
    gradientHover: "from-blue-600 to-blue-700" // Added for button hover
  }

  useEffect(() => {
    if (content?.videoUrl) {
      const urls = content.videoUrl.split("@").filter((url) => url.trim() !== "")
      if (urls.length > 0) {
        setPartUrls(urls)
        setCurrentPartIndex(0)
        setError(null)
        setIsLoading(true)
        setIsPlaying(false)
      } else {
        setPartUrls([])
        setError("No valid video part URLs provided in content.")
        setIsLoading(false)
      }
    } else {
      setPartUrls([])
      setError("Video URL not found in content.")
      setIsLoading(false)
    }
  }, [content?.videoUrl])

  useEffect(() => {
    const videoElement = mainVideoRef.current
    if (!videoElement || partUrls.length === 0) return

    if (currentPartIndex >= partUrls.length) {
      setIsPlaying(false)
      return
    }

    const currentUrl = partUrls[currentPartIndex]
    if (videoElement.src !== currentUrl) {
      videoElement.src = currentUrl
      videoElement.load()
      setIsLoading(true)
    }

    if (preloadVideoRef.current && currentPartIndex + 1 < partUrls.length) {
      const nextUrl = partUrls[currentPartIndex + 1]
      if (preloadVideoRef.current.src !== nextUrl) {
        preloadVideoRef.current.src = nextUrl
        preloadVideoRef.current.load()
      }
    } else if (preloadVideoRef.current) {
      preloadVideoRef.current.src = ""
    }
  }, [currentPartIndex, partUrls])

  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds) || timeInSeconds === Number.POSITIVE_INFINITY || timeInSeconds < 0) return "0:00"
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const togglePlay = useCallback(() => {
    if (!mainVideoRef.current) return
    if (mainVideoRef.current.paused || mainVideoRef.current.ended) {
      mainVideoRef.current.play().catch((e) => {
        console.error("Error playing video:", e)
        setIsPlaying(false)
      })
    } else {
      mainVideoRef.current.pause()
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (!mainVideoRef.current) return
    const newMutedState = !mainVideoRef.current.muted
    mainVideoRef.current.muted = newMutedState
    setIsMuted(newMutedState)
    if (!newMutedState && mainVideoRef.current.volume === 0) {
      mainVideoRef.current.volume = 0.5
      setVolume(0.5)
    }
  }, [])

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !mainVideoRef.current || !duration) return
      const rect = progressRef.current.getBoundingClientRect()
      const clickPosition = e.clientX - rect.left
      const clickRatio = clickPosition / rect.width
      const newTime = clickRatio * duration
      mainVideoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    },
    [duration],
  )

  const handleProgressHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !duration) {
        setHoverTime(null)
        return
      }
      const rect = progressRef.current.getBoundingClientRect()
      const hoverPosition = e.clientX - rect.left
      const hoverRatio = Math.max(0, Math.min(1, hoverPosition / rect.width))
      setHoverTime(hoverRatio * duration)
    },
    [duration],
  )

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!mainVideoRef.current) return
    const newVolume = Number.parseFloat(e.target.value)
    mainVideoRef.current.volume = newVolume
    setVolume(newVolume)
    const newMutedState = newVolume === 0
    mainVideoRef.current.muted = newMutedState
    setIsMuted(newMutedState)
  }, [])

  const handleVolumeMouseEnter = () => {
    setShowVolumeSlider(true)
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current)
  }

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => setShowVolumeSlider(false), 500)
  }

  const skipTime = useCallback(
    (amount: number) => {
      if (mainVideoRef.current && duration) {
        const newTime = Math.max(0, Math.min(duration, mainVideoRef.current.currentTime + amount))
        mainVideoRef.current.currentTime = newTime
        setCurrentTime(newTime)
      }
    },
    [duration],
  )

  const skipBackward = () => skipTime(-10)
  const skipForward = () => skipTime(10)

  const toggleFullscreen = useCallback(() => {
    const elem = playerContainerRef.current
    if (!elem) return

    // Type guard for vendor-specific fullscreen methods
    const typedElem = elem as HTMLDivElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>; // Older Firefox
    };
    const typedDocument = document as Document & {
        webkitExitFullscreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        mozCancelFullScreen?: () => Promise<void>; // Older Firefox
        webkitIsFullScreen?: boolean;
        msFullscreenElement?: Element | null;
        mozFullScreenElement?: Element | null; // Older Firefox
    };


    if (
        !document.fullscreenElement &&
        !typedDocument.webkitIsFullScreen && // Safari
        !typedDocument.mozFullScreenElement && // Older Firefox
        !typedDocument.msFullscreenElement    // IE/Edge
    ) {
      if (typedElem.requestFullscreen) {
        typedElem.requestFullscreen().catch((err) => console.error(`Fullscreen error: ${err.message} (${err.name})`));
      } else if (typedElem.webkitRequestFullscreen) { // Safari
        typedElem.webkitRequestFullscreen();
      } else if (typedElem.mozRequestFullScreen) { // Older Firefox
        typedElem.mozRequestFullScreen();
      } else if (typedElem.msRequestFullscreen) { // IE/Edge
        typedElem.msRequestFullscreen();
      }
    } else {
      if (typedDocument.exitFullscreen) {
        typedDocument.exitFullscreen();
      } else if (typedDocument.webkitExitFullscreen) { // Safari
        typedDocument.webkitExitFullscreen();
      } else if (typedDocument.mozCancelFullScreen) { // Older Firefox
        typedDocument.mozCancelFullScreen();
      } else if (typedDocument.msExitFullscreen) { // IE/Edge
        typedDocument.msExitFullscreen();
      }
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
        const typedDocument = document as Document & {
            webkitIsFullScreen?: boolean;
            msFullscreenElement?: Element | null;
            mozFullScreenElement?: Element | null;
        };
      setIsFullscreen(
        !!(
            document.fullscreenElement ||
            typedDocument.webkitIsFullScreen || // Safari
            typedDocument.mozFullScreenElement || // Older Firefox
            typedDocument.msFullscreenElement    // IE/Edge
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange) // Safari, Chrome, Opera
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)    // Firefox
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)     // IE/Edge

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])


  const hideControls = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && mainVideoRef.current && !mainVideoRef.current.paused) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  const showAndAutoHideControls = useCallback(() => {
    setShowControls(true)
    hideControls()
  }, [hideControls])

  useEffect(() => {
    const playerElement = playerContainerRef.current
    if (playerElement) {
      playerElement.addEventListener("mousemove", showAndAutoHideControls)
      playerElement.addEventListener("mouseenter", showAndAutoHideControls)
      playerElement.addEventListener("mouseleave", () => {
        if (isPlaying) hideControls()
      })
    }
    showAndAutoHideControls()
    return () => {
      if (playerElement) {
        playerElement.removeEventListener("mousemove", showAndAutoHideControls)
        playerElement.removeEventListener("mouseenter", showAndAutoHideControls)
        playerElement.removeEventListener("mouseleave", hideControls)
      }
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying, showAndAutoHideControls, hideControls])

  const handleVideoError = () => {
    const currentUrl = partUrls[currentPartIndex] || "Unknown URL"
    const errorMsg = `Error loading segment ${currentPartIndex + 1}`
    console.error(`Error on ${currentUrl}:`, mainVideoRef.current?.error)
    setError(errorMsg)
    setIsLoading(false)
    setIsPlaying(false)
  }

  const handleVideoCanPlay = () => {
    setIsLoading(false)
    if (mainVideoRef.current) {
      setDuration(mainVideoRef.current.duration)
      if (isPlaying) {
        mainVideoRef.current.play().catch((e) => {
          console.warn("Autoplay/Continue play prevented:", e)
          setIsPlaying(false)
        })
      }
    }
  }

  const handleVideoEnded = () => {
    if (currentPartIndex < partUrls.length - 1) {
      setCurrentPartIndex((prev) => prev + 1)
    } else {
      setIsPlaying(false)
    }
  }

  const handleVideoTimeUpdate = () => {
    if (mainVideoRef.current) setCurrentTime(mainVideoRef.current.currentTime)
  }

  const handleVideoLoadedMetadata = () => {
    if (mainVideoRef.current) setDuration(mainVideoRef.current.duration)
  }

  if (partUrls.length === 0 && !isLoading) {
    return (
      <div
        className={`relative bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 ${isTheaterMode ? "w-full aspect-video" : "aspect-video"}`}
        style={{ minHeight: "200px" }}
      >
        <div className="text-center">
          <AlertTriangle className={`w-12 h-12 ${theme.text} mx-auto mb-3`} />
          <p className="text-lg font-medium">{error || "No video source provided"}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative bg-black rounded-xl overflow-hidden group ${
        isTheaterMode ? "w-full aspect-video" : "aspect-video"
      } border border-gray-800`}
      ref={playerContainerRef}
      onMouseMove={showAndAutoHideControls}
    >
      <video
        ref={mainVideoRef}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
        onCanPlay={handleVideoCanPlay}
        onLoadedMetadata={handleVideoLoadedMetadata}
        onTimeUpdate={handleVideoTimeUpdate}
        onWaiting={() => {
          if (isPlaying) setIsLoading(true)
        }}
        onPlaying={() => setIsLoading(false)}
        playsInline
        muted={isMuted}
        poster={content.thumbnailUrl}
      />
      <video ref={preloadVideoRef} style={{ display: "none" }} muted playsInline />

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.gradientSubtle} flex items-center justify-center mb-3`}
          >
            <Loader2 className={`w-8 h-8 ${theme.text} animate-spin`} />
          </div>
          <p className="text-white text-sm font-medium">Loading video...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 p-6">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.gradientSubtle} flex items-center justify-center mb-4`}
          >
            <AlertTriangle className={`w-8 h-8 ${theme.text}`} />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">Playback Error</h3>
          <p className="text-gray-300 text-center mb-4 max-w-md">{error}</p>
          {currentPartIndex < partUrls.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setError(null)
                setCurrentPartIndex((prev) => prev + 1)
              }}
              className={`px-6 py-3 bg-gradient-to-r ${theme.gradient} hover:bg-gradient-to-r hover:${theme.gradientHover} text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2`}
            >
              <SkipForward className="w-4 h-4" />
              Try Next Segment
            </button>
          )}
        </div>
      )}

      {content?.premium && (
        <div className="absolute top-4 left-4 z-30">
          <span
            className={`bg-gradient-to-r ${theme.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20`}
          >
            PREMIUM
          </span>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 flex flex-col justify-between z-10 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            {partUrls.length > 1 && (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                <span className="text-white text-sm font-medium">
                  Part {currentPartIndex + 1} of {partUrls.length}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-lg transition-all duration-200"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-lg transition-all duration-200"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          {!isPlaying && !isLoading && !error && (
            <button
              className={`w-20 h-20 rounded-full bg-gradient-to-r ${theme.gradient} hover:bg-gradient-to-r hover:${theme.gradientHover} flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105`}
              onClick={togglePlay}
            >
              <Play className="w-10 h-10 ml-1" />
            </button>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div
            className="relative h-2 bg-white/20 rounded-full cursor-pointer group/progress"
            ref={progressRef}
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => {
              setIsHoveringProgress(false)
              setHoverTime(null)
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full"></div>
            <div
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-150`}
              style={{ width: `${currentTime && duration && duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 shadow-lg`}
              style={{
                left: `${currentTime && duration && duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            {isHoveringProgress && hoverTime !== null && (
              <div
                className="absolute bottom-6 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded pointer-events-none border border-white/10"
                style={{
                  left: `${hoverTime && duration && duration > 0 ? (hoverTime / duration) * 100 : 0}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 text-white hover:text-white/80 transition-colors" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors" onClick={skipBackward}>
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors" onClick={skipForward}>
                <RotateCcw className="w-5 h-5 scale-x-[-1]" />
              </button>
              <div
                className="relative flex items-center"
                onMouseEnter={handleVolumeMouseEnter}
                onMouseLeave={handleVolumeMouseLeave}
              >
                <button className="p-2 text-white/80 hover:text-white transition-colors" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                {showVolumeSlider && (
                  <div className="absolute left-0 bottom-12 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="w-24 h-2 bg-white/20 rounded-full relative">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${theme.gradient} rounded-full`}
                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                      ></div>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                        style={{
                          left: `${(isMuted ? 0 : volume) * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showSettings && (
                <div className="absolute bottom-16 right-4 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 w-48 z-20">
                  <div className="space-y-3">
                    <div>
                      <div className="text-white text-sm font-medium mb-2">Quality</div>
                      <div className="space-y-1">
                        {["Auto", "1080p", "720p", "480p"].map((q) => (
                          <button
                            key={q}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                              quality === q
                                ? `bg-gradient-to-r ${theme.gradientSubtle} ${theme.text} border border-${theme.border}`
                                : "text-white/80 hover:bg-white/10"
                            }`}
                            onClick={() => {
                              setQuality(q)
                              setShowSettings(false)
                            }}
                          >
                            {q} {quality === q && "✓"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium mb-2">Speed</div>
                      <div className="space-y-1">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                              playbackSpeed === speed
                                ? `bg-gradient-to-r ${theme.gradientSubtle} ${theme.text} border border-${theme.border}`
                                : "text-white/80 hover:bg-white/10"
                            }`}
                            onClick={() => {
                              setPlaybackSpeed(speed)
                              if(mainVideoRef.current) mainVideoRef.current.playbackRate = speed;
                              setShowSettings(false)
                            }}
                          >
                            {speed === 1 ? "Normal" : `${speed}x`} {playbackSpeed === speed && "✓"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
