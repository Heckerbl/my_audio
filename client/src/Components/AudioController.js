// from react
import React, { useContext, useRef } from "react";
// contex
import { ContexStore } from "../context.js";

// icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

// styles
import "../Styles/AudioController.css";

const AudioContainer = () => {
  const details = useContext(ContexStore);
  const [playMusic, setPlayMusic] = details.musicStatus;
  const [Play, setPlay] = details.playstatus;
  const [SliderValue, setSliderValue] = details.timeline;

  const url =
    "https://yodio.herokuapp.com/api/getsongs/" + playMusic.video_id + ".mp3";

  const audio_element = useRef();
  const [playlistSongs] = details.playlist;

  const calculateTime = () => {
    let currentTime = audio_element.current.currentTime;
    let totaltime = audio_element.current.duration;

    if (isNaN(totaltime)) {
      return 0;
    }
    return (currentTime / totaltime) * 100;
  };
  const handleClick = () => {
    setSliderValue(calculateTime());
    setPlay(!Play);

    if (!Play) {
      audio_element.current.play();
    } else {
      audio_element.current.pause();
    }
  };
  const UpdateTimeline = () => {
    setSliderValue(calculateTime());
  };

  //To continue playing the song once the song is completed and to skip the song
  let count = playMusic.count_id;
  let length = playlistSongs.length - 1;
  const change_song = (direction) => {
    setSliderValue(calculateTime());
    if (direction === "fwd") {
      count === length ? (count = 0) : count++;
    } else {
      count > 0 ? count-- : (count = length);
    }
    const next = playlistSongs[count];
    next.count_id = count;
    setPlayMusic(next);
    setPlay(false);
  };

  const sliderChange = (e) => {
    let duration = audio_element.current.duration;
    let slider_value = e.target.value;
    let time = (duration * slider_value) / 100;
    setSliderValue(slider_value);
    audio_element.current.currentTime = time;
  };

  const ended = () => {
    setPlay(false);
    change_song("fwd");

    setTimeout(() => {
      audio_element.current.play();
      setPlay(true);
    }, 100);
  };

  return (
    <div className="Audio">
      <div className="Audio_song">
        <div className="Audio_img">
          <img src={playMusic.thumbnail} alt="not found" />
        </div>
        <div className="Audio_details">
          <div className="Audio_title">{playMusic.video_title} </div>
          <div className="Audio_author"> {playMusic.yt_channel} </div>
        </div>
      </div>
      <div className="Audio-customizable">
        <div className="Audio-play_head">
          <input
            type="range"
            step="0.01"
            value={SliderValue}
            onChange={sliderChange}
          />
        </div>
        <div className="Audio-controlls">
          <audio
            onTimeUpdate={UpdateTimeline}
            src={url}
            ref={audio_element}
            onEnded={ended}
          ></audio>
          <div
            className="Audio-backward"
            onClick={() => {
              change_song("back");
            }}
          >
            <SkipPreviousIcon />
          </div>
          <div
            className={Play ? "pause" : "play"}
            onClick={() => handleClick()}
          >
            {Play ? <PauseIcon /> : <PlayArrowIcon />}
          </div>
          <div
            className="Audio-forward"
            onClick={() => {
              change_song("fwd");
            }}
          >
            <SkipNextIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioContainer;
