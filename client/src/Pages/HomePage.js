import React, { useContext } from "react";
// styles
import "../Styles/HomePage.css";

// contex
import { ContexStore } from "../context";

// components
import NoSearch from "../Components/NoSearch";
import SearchSection from "../Components/SearchSection";
import AudioContainer from "../Components/AudioContainer";

const Homepage = () => {
  const details = useContext(ContexStore);
  const [data] = details.data;
  const { loading } = useContext(ContexStore);
  document.title = "YODIO | Home";

  return (
    <>
      <div className="main_container">
        {data ? "" : <NoSearch />}
        <SearchSection />

        {data ? <AudioContainer /> : ""}
        {loading && (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
