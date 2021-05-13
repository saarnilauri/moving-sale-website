import React from "react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

const YouTubePlayer = ({ url }) => {
  const id = getYouTubeId(url);
  return id ? (
    <div
      style={{
        paddingBottom: "56.25%",
        paddingTop: "30px",
      }}
      className="relative h-0 overflow-hidden"
    >
      <YouTube className="absolute top-0 left-0 w-full h-full" videoId={id} />
    </div>
  ) : null;
};

export default YouTubePlayer;
