import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
export const ContexStore = createContext();

const Context = (props) => {
  const [data, setData] = useState();
  const [playMusic, setPlayMusic] = useState(false);
  const [userData, setuserData] = useState([]);
  const cookie = Cookies.get("userCookie");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (cookie) {
      axios
        .post("http://localhost:8080/api/getuserdata", { cookie })
        .then((res) => {
          setuserData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [playlistSongs, setPlaylistSongs] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/getplaylistSongs", { cookie })
      .then((res) => {
        setPlaylistSongs(res.data.playlist);
        // console.log("res",res);
      });
  }, []);



  return (
    <>
      <ContexStore.Provider
        value={{
          data: [data, setData],
          musicStatus: [playMusic, setPlayMusic],
          userData,
          playlistSongs,
          loading,
          setLoading
        }}
      >
        {props.children}
      </ContexStore.Provider>
    </>
  );
};

export default Context;

