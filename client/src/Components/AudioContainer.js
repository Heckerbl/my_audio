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
import Cookies from "js-cookie";
import HeadphonesIcon from '@mui/icons-material/Headphones';

//download the file
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
//add to play list
const cookie = Cookies.get("userCookie");
const addtoplayList = (data) => {
  if (cookie) {
    const { audio_id } = data;
    axios
      .post("http://localhost:8080/api/addtoplaylist", { cookie, audio_id })
      .then((res) => {
        if (res.status == 201) {
          console.log("Already in your playlist");
        } else if (res.status == 200) {
          console.log("Added to the playlist");
        }
      }).catch((err) => {
        if (err.status == 404) {
          console.log("failed while Adding to playlist");
        }
      })
  } else {
    alert("Please login")
  }
};
const AudioContainer = () => {
  const [like, setLike] = useState(false);
  const details = useContext(ContexStore);
  const [data] = details.data;
  if (data) {
    return (
      <>
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
            <button
              onClick={() => {
                addtoplayList(data);
              }}
              className="audio_container-playlist"
            >
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
      </>
    );
  }
  return (
    <>
      <div className="search_music">
        <div className="icon"><HeadphonesIcon className="headphone" /></div>
        <div className="text">Try searching some musics.</div>
      </div></>
  );
};

export default AudioContainer;
