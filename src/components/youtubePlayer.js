import React from "react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

const opts = {
  playerVars: {
    modestbranding: 1,
    controls: 0,
    rel: 0,
  },
};

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
      <YouTube
        className="absolute top-0 left-0 w-full h-full"
        videoId={id}
        opts={opts}
      />
    </div>
  ) : null;
};

export default YouTubePlayer;
