import { useContext } from "react";
import "../Styles/SongInsidePlaylist.css";
import { ContexStore } from "../context";
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const SongInsidePlaylist = ({ data, ind }) => {
  const details = useContext(ContexStore);
  const [, setPlayMusic] = details.musicStatus;
  const handleClick = () => {
    const data_cpy = data;
    data_cpy.count_id = ind;
    setPlayMusic(data_cpy);
  };

  const sn = ind + 1;

  return (
    <>
      <div
        className="songInsidePlaylist_con"
        onClick={() => {
          handleClick();
        }}
      >
        <div className="sn">{sn}</div>
        <div className="title">
          <div className="playlist_song_thumbnail">
            <img src={data.thumbnail} alt="not_found" />
          </div>
          <div className="playlist_song_title">{data.video_title}</div>
        </div>
        <div className="added_date">{data.added_date}</div>
        <div className="delete">
          <Tooltip title="Delete" arrow>
            <RemoveCircleIcon className="remcircle" />
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default SongInsidePlaylist;
