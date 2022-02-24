// from react and react-dom
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// contex
import { ContexStore } from "../context";

// additional packages
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// styles
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Playlist.css";

// icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

// components
import SongInsidePlaylist from "../Components/SongInsidePlaylist";

const Playlist = () => {
  const history = useHistory();
  const cookie = Cookies.get("userCookie");
  const details = useContext(ContexStore);
  const { playlist_name, user_photo } = details.userData;
  const [playlistSongs, setPlaylistSongs] = details.playlist;
  const [newname, setnewname] = details.updatePlaylistName;
  if (!cookie) {
    history.push("/");
  }
  useEffect(() => {
    axios
      .post("https://nayayodio.suryaghatlibrary.com/api/getplaylistSongs", { cookie })
      .then((res) => {
        setPlaylistSongs(res.data.playlist);
      });
  }, []);
  //update playlist
  const updatePlayList = () => {
    let newPlaylistName = prompt(
      "Please enter new playlist Name ?",
      playlist_name
    );
    if (newPlaylistName) {
      axios
        .post("https://nayayodio.suryaghatlibrary.com/api/updatePlaylistname", {
          newPlaylistName,
          cookie,
        })
        .then(() => {
          toast.success("Name changed Successfully !");
          setnewname(newPlaylistName);
        })
        .catch(() => {
          toast.error("Couldn't change name ! 😢 ");
        });
    }
  };

  return (
    <>
      <div className="playlist_container">
        <div className="background">
          <div className="playlist_details">
            <div className="img">
              <img src={user_photo ? user_photo : "/assets/user.png"} alt="not found" />
            </div>
            <div className="other_details">
              <div className="title">
                <span>{newname ? newname : playlist_name}</span>
                &nbsp;&nbsp;&nbsp;
                <div className="edit">
                  <EditIcon onClick={updatePlayList} />
                </div>
              </div>
              <div className="playlist_stats">
                <div className="number_of_songs">
                  <span>{playlistSongs.length}</span>
                  <span> songs </span>
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
              <DeleteOutlineIcon />
            </div>
          </div>
          <div className="musics">
            {playlistSongs.length !== 0
              ? playlistSongs.map((data, i) => {
                return <SongInsidePlaylist data={data} ind={i} key={i} />;
              })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
