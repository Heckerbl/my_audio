import React, { useState } from "react";
import "../Styles/AudioContainer.css";
import { ContexStore } from "../context";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext } from "react";

const AudioContainer = () => {
  const [like, setLike] = useState(false);
  const details = useContext(ContexStore);
  const [data] = details.data;

  const addtoplayList = (video_id)=>{

  }

  if (data) {
    return (
      <div className="main_audio_container">
        <div className="audio_container_details">
          <div className="audio_container_img">
            <img src={data.thumbnail} alt="music" />
          </div>
          <div className="audio_container_info">
            <div className="audio_container_title">{data.title}</div>
            <div className="audio_container_author">{data.author}</div>
            <div className="audio_container_stats">
              <div className="audio_container_downloads">
                <CloudDownloadIcon /> {data.downloads}
              </div>
              <div className="audio_container_likes">
                <FavoriteIcon /> {data.likes}
              </div>
            </div>
          </div>
        </div>
        <div className="audio_container-actions">
          <button
            className="audio_container-like"
            onClick={() => setLike(!like)}
          >
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
          <button onClick={addtoplayList} className="audio_container-playlist">
            <span>Add </span> <PlaylistAddIcon />
          </button>
          <button className="audio_container-download">
            <a href={data.link} download>Download</a> <CloudDownloadIcon />
          </button>
        </div>
      </div>
    );
  }
  return <div className="search_music">
    <div className="icon">
      🎧
    </div>
    <div className="text">
      Try searching some musics.
    </div>
  </div>;
};

export default AudioContainer;
