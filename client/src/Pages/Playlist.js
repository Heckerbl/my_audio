import react, { useContext } from "react";
import MusicContainer from "../Components/MusicContainer";
import { ContexStore } from "../context";

const Playlist = () => {
  const details = useContext("ContexStore");

  return (
    <>
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
    </>
  );
};
