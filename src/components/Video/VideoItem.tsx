// VideoItem.js
import React, { useRef, useEffect, useState } from "react";


interface VideoItemProps {
  src: string;
  onNext?: () => void;
}

const VideoItem = ({ src, onNext }: VideoItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  return (
    <div className="relative h-64 px-5">
      <video
        ref={videoRef}
        src={"/test.mp4"}
        className="w-full h-full rounded-lg object-cover"
        controls={false}
        autoPlay
        loop={true}
        muted={true} // Ensure the video is muted by default
        onClick={() => {
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
        }}
      />
    </div>
  );
};


export default VideoItem;
