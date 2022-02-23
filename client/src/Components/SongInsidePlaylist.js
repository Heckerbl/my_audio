// from react and react dom
import { useContext, useState } from "react";

//styles
import "../Styles/SongInsidePlaylist.css";

// contex
import { ContexStore } from "../context";

// additional packages
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

// icons
import Tooltip from "@mui/material/Tooltip";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const SongInsidePlaylist = ({ data, ind }) => { 
  const details = useContext(ContexStore);
  const [, setPlayMusic] = details.musicStatus;
  const [playlistSongs, setPlaylistSongs] = details.playlist;
  const [Play, setPlay] = details.playstatus;
  const handleClick = (e) => {
    if (Play) {
      setPlay(false);
    }
    const data_cpy = data;
    data_cpy.count_id = ind;
    setPlayMusic(data_cpy); 
  };
  let vid = data.video_id;

  const sn = ind + 1;
  //delete video from playlist
  const deletedata = (video_id, cookie_id) => {
    axios
      .post("https://yodio.herokuapp.com/api/deleteplayList", {
        video_id,
        cookie_id,
      })
      .then(() => {
        toast.success("Deleted from playlist");
        let array = playlistSongs.filter((data) => {
          return data.video_id !== video_id;
        });
        setPlaylistSongs(array);
      })
      .catch((err) => {
        toast.error("Couln't delete from playlist");
      });
  };

  return (
    <>
      <div className="songInsidePlaylist_con">
        <div
          className="sn"
          onClick={() => {
            handleClick();
          }}
        >
          {/* {sn} */}
        </div>
        <div
          onClick={() => {
            handleClick();
          }}
          className="title"
        >
          <div className="playlist_song_thumbnail">
            {/* <img src={data.thumbnail} alt="not_found" /> */}
          </div>
          {/* <div className="playlist_song_title">{data.video_title}</div> */}
        </div>
        <div
          onClick={() => {
            handleClick();
          }}
          className="added_date"
        >
          {/* {data.added_date} */}
        </div>

        <div className="delete">
          <Tooltip title="Delete" arrow>
            <RemoveCircleIcon
              onClick={() => {
                deletedata(vid, Cookies.get("userCookie"));
              }}
              className="remcircle"
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default SongInsidePlaylist;
