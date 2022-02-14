import React, { useContext, useState } from "react";
import "../Styles/AudioController.css";
import { ContexStore } from "../context.js";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const AudioContainer = () => {
  const [Play, setPlay] = useState(false);

  const details = useContext(ContexStore);
  const [data] = details.data;
  const [playMusic] = details.musicStatus;
  if (playMusic) {
    return (
      <div className="Audio">
        <div className="Audio_song">
          <div className="Audio_img">
            <img src={data.thumbnail} alt="not found" />
          </div>
          <div className="Audio_details">
            <div className="Audio_title">{data.title} </div>
            <div className="Audio_author"> {data.author} </div>
          </div>
        </div>
        <div className="Audio-customizable">
          <div className="Audio-play_head">
            <input type="range" />
          </div>
          <div className="Audio-controlls">
            <div className="Audio-backward">
              <SkipPreviousIcon />
            </div>
            <div
              className={Play ? "pause" : "play"}
              onClick={() => {
                setPlay(!Play);
              }}
            >
              {Play ? <PauseIcon /> : <PlayArrowIcon />}
            </div>
            <div className="Audio-forward">
              <SkipNextIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return "";
};

export default AudioContainer;
