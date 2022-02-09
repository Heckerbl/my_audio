import React from "react";
import SearchSection from "../Components/SearchSection";
import "../Styles/HomePage.css";
import AudioController from "../Components/AudioController";

const Homepage = () => {
    return (<>
    <div className="main_container">
<SearchSection status={true}/>
<SearchSection status={false}/>
<AudioController />
    </div>
         </>);
};

export default Homepage;
