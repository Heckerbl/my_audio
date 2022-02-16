import react, { useContext } from "react";
import MusicContainer from "../Components/MusicContainer";
import { ContexStore } from "../context";
import img from "../img/playbg.jpg";
import EditIcon from "@mui/icons-material/Edit";
import "../Styles/Playlist.css";
const Playlist = () => {
  const details = useContext("ContexStore");

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
                  <span className="dot">    &nbsp; .  </span>
                  <span>  2 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="playlist">
          <div className="header">
            <div className="count">S.N</div>
            <div className="title">Title</div>
            <div className="dateAdded"></div>
            <div className="duration"></div>
          </div>
          <div className="musics">
            <MusicContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
