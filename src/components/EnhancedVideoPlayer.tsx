import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Minimize, Subtitles, Languages, SkipBack, SkipForward, PictureInPicture, Download, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  title?: string;
  autoPlay?: boolean;
}

const EnhancedVideoPlayer = ({ videoUrl, title, autoPlay = false }: EnhancedVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlay); // Muted by default if autoPlay
  const [volume, setVolume] = useState([autoPlay ? 0 : 100]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("auto");
  const [showControls, setShowControls] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [playerSize, setPlayerSize] = useState("full");
  const [isLoop, setIsLoop] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (!isLoop) setIsPlaying(false);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("progress", updateBuffered);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    // Auto-play handling
    if (autoPlay && video) {
      video.muted = true;
      video.play().catch(() => {
        // Auto-play blocked by browser
      });
    }

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("progress", updateBuffered);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay, isLoop]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        setVolume([100]);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
      if (value[0] === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          setIsPiP(false);
        } else {
          await videoRef.current.requestPictureInPicture();
          setIsPiP(true);
        }
      } catch (error) {
        console.error("PiP not supported");
      }
    }
  };

  const toggleLoop = () => {
    if (videoRef.current) {
      videoRef.current.loop = !isLoop;
      setIsLoop(!isLoop);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = title || 'video';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto group bg-black rounded-lg overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isFullscreen && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video bg-black"
        onClick={togglePlay}
        crossOrigin="anonymous"
        playsInline
        loop={isLoop}
      >
        {subtitlesEnabled && (
          <track kind="subtitles" srcLang="en" label="English" />
        )}
      </video>

      {/* Overlay Controls */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Title */}
        {title && (
          <div className="absolute top-0 left-0 right-0 p-4">
            <h3 className="text-white font-medium text-lg truncate">{title}</h3>
          </div>
        )}

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-transform hover:scale-110"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10" />
            ) : (
              <Play className="h-10 w-10 ml-1" />
            )}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Progress Bar */}
          <div className="relative">
            {/* Buffered progress */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-white/30 rounded-full pointer-events-none"
              style={{ width: `${buffered}%` }}
            />
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-1 md:gap-2">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Play className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </Button>

              {/* Skip backward */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skip(-10)}
                className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 hidden sm:flex"
              >
                <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              {/* Skip forward */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skip(10)}
                className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 hidden sm:flex"
              >
                <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              {/* Volume */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9"
                >
                  {isMuted || volume[0] === 0 ? (
                    <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </Button>
                <div className="w-16 md:w-24 hidden sm:block">
                  <Slider
                    value={isMuted ? [0] : volume}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Time */}
              <span className="text-xs md:text-sm whitespace-nowrap ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Loop */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLoop}
                className={`text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 hidden md:flex ${isLoop ? 'bg-white/20' : ''}`}
              >
                <Repeat className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              {/* PiP */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePiP}
                className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 hidden md:flex"
              >
                <PictureInPicture className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              {/* Download */}
              <Button
                variant="ghost"
                size="icon"
                onClick={downloadVideo}
                className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 hidden md:flex"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              {/* Subtitles */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 hidden sm:flex"
                  >
                    <Subtitles className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Subtitles</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSubtitlesEnabled(false)}>
                    Off {!subtitlesEnabled && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubtitlesEnabled(true)}>
                    English {subtitlesEnabled && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9"
                  >
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Quality</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setQuality("auto")}>
                    Auto {quality === "auto" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuality("1080p")}>
                    1080p {quality === "1080p" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuality("720p")}>
                    720p {quality === "720p" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuality("480p")}>
                    480p {quality === "480p" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Speed</DropdownMenuLabel>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <DropdownMenuItem
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                    >
                      {rate}x {playbackRate === rate && "✓"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Maximize className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedVideoPlayer;
