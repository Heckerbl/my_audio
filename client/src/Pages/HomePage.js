import React, { useContext } from "react";
import SearchSection from "../Components/SearchSection";
import "../Styles/HomePage.css";
import AudioController from "../Components/AudioController";
import AudioContainer from "../Components/AudioContainer";
import { ContexStore } from "../context";
import NoSearch from "../Components/NoSearch";
import { toast } from "react-toastify";

const Homepage = () => {
  const details = useContext(ContexStore);
  const [data] = details.data;
  const { loading } = useContext(ContexStore);
  return (
    <>
      <div className="main_container">
        {data ? "" : <NoSearch />}
        <SearchSection />

        {data ? <AudioContainer /> : ""}
        {

          loading && (
            <div className="lds-ripple"><div></div><div></div></div>

          )
        }
        <AudioController />
      </div>
    </>
  );
};

export default Homepage;
