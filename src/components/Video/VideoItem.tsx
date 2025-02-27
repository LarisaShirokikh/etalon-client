// VideoItem.js
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "../Skeleton";

interface VideoItemProps {
  slug: string;
}

const VideoItem = ({ slug }: VideoItemProps) => {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        console.error("No slug provided");
        return;
      }

      try {
        const response = await axios.get(`/api/video`, {
          params: { slug },
        });

        setVideo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading || !video) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <Link href={`/video/${video.slug}`}>
      <div className="relative">
        <div className="relative w-full h-[280px] md:h-[370px]">
          <video
            autoPlay
            playsInline
            muted
            loop
            controls={false}
            preload="auto"
            className="w-full h-full rounded-lg object-cover"
          >
            <source src={video.video[0]} type="video/mp4" />
          </video>

          <div className="absolute bottom-0 left-0 w-full p-2 text-white rounded-b-lg bg-gradient-to-t from-black via-transparent to-transparent">
            <h3 className="line-clamp-2 text-xs">{video.title}</h3>
            <div className="mt-1 flex">
              {video.price.discountedPrice ? (
                <>
                  <span className="text-white font-bold text-sm mr-2">
                    {video.price.discountedPrice} ₽
                  </span>
                  <span className="text-white text-xs line-through">
                    {video.price.price} ₽
                  </span>
                </>
              ) : (
                <span className="text-white text-sm">
                  {video.price.price} ₽
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
