import React, { useContext } from "react";
import SearchSection from "../Components/SearchSection";
import "../Styles/HomePage.css";
import AudioController from "../Components/AudioController";
import AudioContainer from "../Components/AudioContainer";
import { ContexStore } from "../context";

const Homepage = () => {

  return (
    <>

      <div className="main_container">
        <SearchSection />
        <AudioContainer />
        <AudioController />
      </div>
    </>
  );
};

export default Homepage;
