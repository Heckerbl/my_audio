import React, { useContext } from "react";
import SearchSection from "../Components/SearchSection";
import "../Styles/HomePage.css";
import AudioContainer from "../Components/AudioContainer";
import { ContexStore } from "../context";
import NoSearch from "../Components/NoSearch";
const Homepage = () => {
  const details = useContext(ContexStore);
  const [data] = details.data;
  const { loading } = useContext(ContexStore);
  document.title = "YouTube Audio | Home"

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

      </div>
    </>
  );
};

export default Homepage;
