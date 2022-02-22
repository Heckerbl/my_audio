// additional packages
import axios from "axios";
import Cookies from "js-cookie";

// from react and react dom
import React, { createContext, useEffect, useState } from "react";
export const ContexStore = createContext();

const Context = (props) => {
  const [data, setData] = useState();
  const [playMusic, setPlayMusic] = useState(false);
  const [userData, setuserData] = useState([]);
  const cookie = Cookies.get("userCookie");
  const [loading, setLoading] = useState(false);
  const [newname, setnewname] = useState("");
  const [SliderValue, setSliderValue] = useState(0.1);

  useEffect(() => {
    if (cookie) {
      axios
        .post("https://yodio.herokuapp.com/api/getuserdata", { cookie })
        .then((res) => {
          setuserData(res.data[0]);
        });
    }
  }, []);

  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [Play, setPlay] = useState(false);

  return (
    <>
      <ContexStore.Provider
        value={{
          data: [data, setData],
          musicStatus: [playMusic, setPlayMusic],
          userData,
          playlistSongs,
          loading,
          setLoading,
          playlist: [playlistSongs, setPlaylistSongs],
          playstatus: [Play, setPlay],
          updatePlaylistName: [newname, setnewname],
          timeline: [SliderValue, setSliderValue],
        }}
      >
        {props.children}
      </ContexStore.Provider>
    </>
  );
};

export default Context;
