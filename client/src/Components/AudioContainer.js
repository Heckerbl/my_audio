// from react
import React, { useState, useContext } from "react";

// contex
import { ContexStore } from "../context";

// additional packages
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// styles
import "../Styles/AudioContainer.css";
import "react-toastify/dist/ReactToastify.css";

// icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import fileDownload from "js-file-download";


//add to play list
const cookie = Cookies.get("userCookie");
const addtoplayList = (data) => {
  if (cookie) {
    const { audio_id } = data;
    axios
      .post("https://nayayodio.suryaghatlibrary.com/api/addtoplaylist", {
        cookie,
        audio_id,
      })
      .then((res) => {
        if (res.status == 201) {
          //already in playlist
          toast.info("Already in your playlist");
        } else if (res.status == 200) {
          toast.success("Added to the playlist");
        }
      })
      .catch((err) => {
        if (err.status == 404) {
          toast.error("failed while Adding to playlist");
        }
      });
  } else {
    toast.warning("Please login to create playlist");
  }
};

const AudioContainer = () => {
  const [download, setDownload] = useState(false);
  const details = useContext(ContexStore);
  const [data, setData] = details.data;
  const download_file = (fname, downloadName) => {
    setDownload(true);
    let filePath = "https://nayayodio.suryaghatlibrary.com/download/" + fname;
    axios
      .get(`${filePath}`, {
        responseType: "blob",
      })
      .then((res) => {
        let filename = downloadName;
        let fileExtension = ".mp3";
        fileDownload(res.data, `${filename}.${fileExtension}`);
        setDownload(false);
      });
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
          </div>
        </div>

        <div className="audio_container-actions">
          <button
            className="audio_container-playlist"
            onClick={() => {
              addtoplayList(data);
            }}
          >
            <span>Add </span> <PlaylistAddIcon />
          </button>
          <button
            disabled={download}
            className="audio_container-download"
            id={download && "download"}
            onClick={() => {
              download_file(data.audio_id, data.title);
              setDownload(true);
            }}
          >

            <span  >{download ? "Downloading" : "Download"}</span>
            {
              download ? <>
                <div class="loader"></div>
              </> : <CloudDownloadIcon />
            }


          </button>
        </div>
      </div>
    </>
  );
};

export default AudioContainer;
