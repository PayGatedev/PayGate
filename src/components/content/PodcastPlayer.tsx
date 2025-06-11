"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Clock, Download } from "lucide-react"

interface PodcastPlayerProps {
  content: any
  theme?: any
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ content, theme }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedOptions, setShowSpeedOptions] = useState(false)
  const [isHoveringProgress, setIsHoveringProgress] = useState(false)
  const [hoverTime, setHoverTime] = useState(null)

  const progressRef = useRef(null)
  const volumeTimeoutRef = useRef(null)
  const speedTimeoutRef = useRef(null)

  // Default theme if not provided
  const currentTheme = theme || {
    primary: "purple-500",
    primaryLight: "purple-400",
    primaryDark: "purple-600",
    gradient: "from-purple-500 to-purple-600",
    gradientLight: "from-purple-400 to-purple-500",
    gradientSubtle: "from-purple-500/20 to-purple-600/10",
    gradientHover: "from-purple-400 to-purple-600",
    bg: "purple-500/10",
    bgLight: "purple-500/5",
    border: "purple-500/30",
    icon: "text-purple-400",
    text: "text-purple-400",
    hover: "hover:text-purple-400",
    ring: "ring-purple-500/30",
  }

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    setProgress(pos * 100)
    setCurrentTime(pos * duration)
  }

  // Handle progress bar hover
  const handleProgressHover = (e) => {
    if (!progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    setHoverTime(pos * duration)
  }

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Show volume slider
  const handleVolumeMouseEnter = () => {
    setShowVolumeSlider(true)
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current)
    }
  }

  // Hide volume slider
  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false)
    }, 1000)
  }

  // Show speed options
  const handleSpeedMouseEnter = () => {
    setShowSpeedOptions(true)
    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current)
    }
  }

  // Hide speed options
  const handleSpeedMouseLeave = () => {
    speedTimeoutRef.current = setTimeout(() => {
      setShowSpeedOptions(false)
    }, 1000)
  }

  // Skip backward 15 seconds
  const skipBackward = () => {
    setCurrentTime((prev) => {
      const newTime = Math.max(0, prev - 15)
      setProgress((newTime / duration) * 100)
      return newTime
    })
  }

  // Skip forward 15 seconds
  const skipForward = () => {
    setCurrentTime((prev) => {
      const newTime = Math.min(duration, prev + 15)
      setProgress((newTime / duration) * 100)
      return newTime
    })
  }

  // Set initial duration
  useEffect(() => {
    const durationParts = (content.duration || "45:00").split(":")
    const durationInSeconds = Number.parseInt(durationParts[0]) * 60 + Number.parseInt(durationParts[1])
    setDuration(durationInSeconds)
  }, [content])

  // Simulate audio progress
  useEffect(() => {
    let interval

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          const newTime = prev + 0.1
          setProgress((newTime / duration) * 100)
          return newTime
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, duration])

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current)
      if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current)
    }
  }, [])

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-xl overflow-hidden">
      {/* Podcast header */}
      <div className="bg-gradient-to-r from-[#0F1116] to-[#161921] p-6">
        <div className="flex items-center gap-6">
          <div
            className={`w-24 h-24 bg-gradient-to-br ${currentTheme.gradientSubtle} rounded-xl flex items-center justify-center flex-shrink-0 border border-${currentTheme.border}`}
          >
            <Headphones className={`w-12 h-12 ${currentTheme.icon}`} />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{content.title || "Podcast Episode Title"}</h2>
            <p className="text-gray-400 mb-2">{content.creator?.username || "Podcast Creator"}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{content.duration || "45:00"}</span>
              </div>
              <div>Episode {content.episodeNumber || 12}</div>
              <div>{new Date(content.createdAt).toLocaleDateString() || "May 15, 2025"}</div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 transition-all duration-200 text-gray-300 hover:text-white">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download</span>
          </button>
        </div>
      </div>

      {/* Player controls */}
      <div className="p-4 border-t border-gray-800">
        {/* Progress bar */}
        <div
          className="relative h-3 bg-[#0F1116] rounded-full mb-3 cursor-pointer group border border-gray-800"
          ref={progressRef}
          onClick={handleProgressClick}
          onMouseMove={handleProgressHover}
          onMouseEnter={() => setIsHoveringProgress(true)}
          onMouseLeave={() => setIsHoveringProgress(false)}
        >
          <div
            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${currentTheme.gradient} rounded-full transition-all duration-150`}
            style={{ width: `${progress}%` }}
          ></div>

          {/* Progress thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
          ></div>

          {/* Hover time tooltip */}
          {isHoveringProgress && hoverTime !== null && (
            <div
              className="absolute bottom-6 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded pointer-events-none border border-white/10"
              style={{
                left: `${(hoverTime / duration) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Time indicators */}
        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime(duration - currentTime)}</span>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Playback speed */}
            <div className="relative" onMouseEnter={handleSpeedMouseEnter} onMouseLeave={handleSpeedMouseLeave}>
              <button className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white">
                {playbackSpeed}x
              </button>

              {/* Speed options */}
              {showSpeedOptions && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#0F1116] border border-gray-800 rounded-lg p-2 w-24 z-10">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      className={`w-full text-center py-1 rounded text-sm transition-colors ${
                        playbackSpeed === speed
                          ? `bg-gradient-to-r ${currentTheme.gradientSubtle} ${currentTheme.text} border border-${currentTheme.border}`
                          : "text-white hover:bg-[#161921]"
                      }`}
                      onClick={() => setPlaybackSpeed(speed)}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Skip backward */}
            <button
              className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
              onClick={skipBackward}
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause */}
            <button
              className={`w-14 h-14 rounded-full bg-gradient-to-r ${currentTheme.gradient} hover:bg-gradient-to-r hover:${currentTheme.gradientHover} flex items-center justify-center transition-all duration-200 transform hover:scale-105`}
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
            </button>

            {/* Skip forward */}
            <button
              className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
              onClick={skipForward}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume control */}
          <div
            className="relative flex items-center"
            onMouseEnter={handleVolumeMouseEnter}
            onMouseLeave={handleVolumeMouseLeave}
          >
            <button
              className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Volume slider */}
            {showVolumeSlider && (
              <div className="absolute right-0 bottom-12 bg-[#0F1116] border border-gray-800 rounded-lg p-3 w-40 z-10">
                <div className="w-full h-2 bg-gray-700 rounded-full relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${currentTheme.gradient} rounded-full`}
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  ></div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                    style={{
                      left: `${isMuted ? 0 : volume}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episode details */}
      <div className="p-6 border-t border-gray-800">
        <h3 className="text-lg font-bold mb-3 text-white">Episode Notes</h3>
        <p className="text-gray-300 mb-4">
          {content.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."}
        </p>

        <div className="bg-[#0F1116] border border-gray-800 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-2 text-white">Topics Covered</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-${currentTheme.primary}`}></div>
              <span>The evolution of decentralized finance</span>
            </li>
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-${currentTheme.primary}`}></div>
              <span>Current challenges in the DeFi ecosystem</span>
            </li>
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-${currentTheme.primary}`}></div>
              <span>Regulatory considerations and compliance</span>
            </li>
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-${currentTheme.primary}`}></div>
              <span>Future trends and innovations</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0F1116] border border-gray-800 rounded-lg p-4">
          <h4 className="font-medium mb-2 text-white">Featured Guests</h4>
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentTheme.gradientSubtle} flex items-center justify-center border border-${currentTheme.border}`}
            >
              <svg
                className={`w-5 h-5 ${currentTheme.icon}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h5 className="font-medium text-white">Alex Johnson</h5>
              <p className="text-sm text-gray-400">DeFi Researcher</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentTheme.gradientSubtle} flex items-center justify-center border border-${currentTheme.border}`}
            >
              <svg
                className={`w-5 h-5 ${currentTheme.icon}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h5 className="font-medium text-white">Sarah Chen</h5>
              <p className="text-sm text-gray-400">Blockchain Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastPlayer
