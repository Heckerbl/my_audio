import React, { useContext, useState, useRef } from "react";
import "../Styles/AudioController.css";
import { ContexStore } from "../context.js";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const AudioContainer = () => {
  const details = useContext(ContexStore);
  const [playMusic, setPlayMusic] = details.musicStatus;
  const [Play, setPlay] = details.playstatus;
  const [SliderValue, setSliderValue] = useState(0);
  const url =
    "/api/getsongs/" + playMusic.video_id + ".mp3";

  const audio_element = useRef();

  const [playlistSongs] = details.playlist;
  let updater;

  const handleClick = () => {
    let timeLine,
      currentTime = audio_element.current.currentTime,
      totaltime = audio_element.current.duration;
    timeLine = (currentTime / totaltime) * 100;

    setSliderValue(timeLine);
    setPlay(!Play);

    if (!Play) {
      audio_element.current.play();
      updater = setInterval(() => {
        setSliderValue((audio_element.current.currentTime / totaltime) * 100);

        console.log(
          "divided value " + audio_element.current.currentTime / totaltime
        );
      }, 100);
    } else {
      clearInterval(updater);
      audio_element.current.pause();
    }
  };

  //To continue playing the song once the song is completed and to skip the song
  let count = playMusic.count_id;
  let length = playlistSongs.length - 1;
  const change_song = (direction) => {
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
    setSliderValue(100);
    change_song("fwd");

    setTimeout(() => {
      audio_element.current.play();
      setPlay(true);
    }, 1000);
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
          <audio src={url} ref={audio_element} onEnded={ended}></audio>
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
