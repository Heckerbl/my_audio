import React, { useContext } from "react";
import SearchSection from "../Components/SearchSection";
import "../Styles/HomePage.css";
import AudioController from "../Components/AudioController";
import AudioContainer from "../Components/AudioContainer";
import { ContexStore } from "../context";
import NoSearch from "../Components/NoSearch";

const Homepage = () => {
  const details = useContext(ContexStore);
  const [data] = details.data;
  return (
    <>
      <div className="main_container">
        {data ? "" : <NoSearch />}
        <SearchSection />
        {data ? <AudioContainer /> : ""}

        <AudioController />
      </div>
    </>
  );
};

export default Homepage;
