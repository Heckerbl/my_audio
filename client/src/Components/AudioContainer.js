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
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const download_file = (fname, downloadName) => {
  let filePath = "http://localhost:8080/download/" + fname;
  axios
    .get(`${filePath}`, {
      responseType: "blob",
    })
    .then((res) => {
      let filename = downloadName;
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
          //already in playlist
          toast.info("Already in your playlist")
        } else if (res.status == 200) {
          toast.success("Added to the playlist")
        }
      })
      .catch((err) => {
        if (err.status == 404) {
          toast.error("failed while Adding to playlist")
        }
      });
  } else {
    toast.warning("Please login to create playlist")
  }
};
const AudioContainer = () => {
  const [like, setLike] = useState(false);
  const [download, setDownload] = useState(false);

  const details = useContext(ContexStore);
  const [data, setData] = details.data;
  const handleStats = ({ like, download }) => {
    var cpyData = data;
    // console.log(cpyData.downloads)
    if (download) {
      cpyData.downloads = cpyData.downloads + 1;
    }
    if (like) {
      cpyData.likes = cpyData.likes + 1;
    } else if (!like) {
      cpyData.likes = cpyData.likes - 1;
    }
  };
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
            onClick={() => {
              setLike(!like);
              handleStats({ like: !like, download: "" });
            }}
          >
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
          <button
            className="audio_container-playlist"
            onClick={() => {
              addtoplayList(data);
            }}
          >
            <span>Add </span> <PlaylistAddIcon />
          </button>
          <button
            className="audio_container-download"
            onClick={() => {
              download_file(data.audio_id, data.title);
              setDownload(true);
              handleStats({ like: "", download: true });
            }}
          >
            {!download ? (
              <>
                <span>Download</span>
                <CloudDownloadIcon />
              </>
            ) : (
              <>
                <span>Downloaded</span>
                <FileDownloadDoneIcon />
              </>
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AudioContainer;
