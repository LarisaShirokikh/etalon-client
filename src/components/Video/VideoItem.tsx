// VideoItem.js
import React, { useRef, useEffect, useState, RefObject } from "react";

interface VideoItemProps {
  src: string;
  onNext?: () => void;
}

const VideoItem = ({ src, onNext }: VideoItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleEnded = () => {
      if (onNext) onNext();
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleEnded);
      videoElement.play();
      setIsPlaying(true);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [onNext]);

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setIsMuted(videoElement.muted);
    }
  };

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative h-64">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full rounded-lg object-cover"
        controls={false}
        autoPlay
        loop={true}
        muted={isMuted}
        onClick={togglePlay}
      />
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <div className="text-wite">
          <button onClick={toggleMute}>
            {isMuted ? (
              <img
                src="/volume.svg" // Path to the SVG for mute
                alt="Mute"
                className="h-6 w-6 text-white"
                color="FFFFFF"
              />
            ) : (
              <img
                src="/volume-2.svg" // Path to the SVG for sound
                alt="Sound"
                className="h-6 w-6 text-white"
              />
            )}
          </button>
        </div>
        <div>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <img
                src="/pause.svg" // Path to the SVG for pause
                alt="Pause"
                className="h-6 w-6 text-white"
              />
            ) : (
              <img
                src="/play.svg" // Path to the SVG for play
                alt="Play"
                className="h-6 w-6 text-white"
              />
            )}
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-lg text-white mb-2">Video Title</h3>
        <p className="text-sm text-white">Additional Info</p>
      </div>
    </div>
  );
};

export default VideoItem;
