import react, { useContext } from "react";
import SongInsidePlaylist from "../Components/SongInsidePlaylist";
import img from "../img/playbg.jpg";
import EditIcon from "@mui/icons-material/Edit";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { ContexStore } from "../context";

import "../Styles/Playlist.css";
const Playlist = () => {
  const details = useContext(ContexStore);
  const playlistSongs = details.playlistSongs;

  return (
    <>
      <div className="playlist_container">
        <div className="background">
          <div className="playlist_details">
            <div className="img">
              <img src={img} alt="not found" />
            </div>
            <div className="other_details">
              <div className="title">
                <span>My Playlist</span>
                &nbsp;&nbsp;&nbsp;
                <div className="edit">
                  <EditIcon />
                </div>
              </div>
              <div className="playlist_stats">
                <div className="number_of_songs">
                  <span> 200 </span>
                  <span> songs </span>
                </div>
                <div className="total_duration">
                  <span className="dot"> &nbsp; . </span>
                  <span> 2 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="playlist">
          <div className="header">
            <div className="count">S.N</div>
            <div className="title">Title</div>
            <div className="dateAdded">Added</div>
            <div className="duration">
              <WatchLaterIcon />
            </div>
          </div>
          <div className="musics">
            {playlistSongs.length != 0
              ? playlistSongs.map((data, i) => data.video_title)
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
