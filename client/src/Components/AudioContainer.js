import React, { useState } from "react";
import "../Styles/AudioContainer.css";
import { ContexStore } from "../context";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext } from "react";
import axios from "axios";
import fileDownload from "js-file-download";


const download_file = (fname) => {
  let filePath = "http://localhost:8080/upload/" + fname;
  axios
    .get(`${filePath}`, {
      responseType: "blob",
    })
    .then((res) => {
      let filename = filePath.replace(/^.*[\\\/]/, "");

      let fileExtension;

      fileExtension = filePath.split(".");

      fileExtension = fileExtension[fileExtension.length - 1];

      fileDownload(res.data, `${filename}.${fileExtension}`);
    });
};

const AudioContainer = () => {
  const [like, setLike] = useState(false);

  const details = useContext(ContexStore);
  const [data] = details.data;

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
          <button className="audio_container-playlist">
            <span>Add </span> <PlaylistAddIcon />
          </button>
          <button
            className="audio_container-download"
            onClick={() => download_file(data.audio_id)}
          >
            <span>Download</span>
            <CloudDownloadIcon />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="search_music">
      <div className="icon">🎧</div>
      <div className="text">Try searching some musics.</div>
    </div>
  );
};

export default AudioContainer;