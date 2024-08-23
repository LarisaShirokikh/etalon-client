import VideoItem from "@/components/Video/VideoItem";

const VideoGroup = ({ videos }: { videos: any[] }) => {
  return videos.map((video: any, index: number) => (
    <div key={`video-${video.slug}-${index}`} className="rounded-lg p-2">
      <VideoItem slug={video.slug} />
    </div>
  ));
};

export default VideoGroup;
