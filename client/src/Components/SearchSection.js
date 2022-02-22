// from react and react dom
import React, { useContext, useState } from "react";

// additional packages
import axios from "axios";
import { toast } from "react-toastify";

// styles
import "../Styles/SearchSection.css";

// contex
import { ContexStore } from "../context";
const SearchSection = () => {
  const details = useContext(ContexStore);
  const [, setData] = details.data;
  const [SearchInput, setSearchInput] = useState("");
  const { loading, setLoading } = useContext(ContexStore);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = SearchInput;
    if (SearchInput.includes("&list")) {
      data = SearchInput.slice(32).split("&")[0];
    } else {
      data = SearchInput.slice(32);
    }
    axios
      .post("/api/getlinks", {
        link: data,
      })
      .then((res) => {
        setData(res.data);
        setSearchInput("");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Couldn't process URL 😢");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="searchContainer">
        <form onSubmit={handleSubmit}>
          <input
            disabled={loading}
            required
            type="text"
            name="search"
            id="search"
            className="searchInp"
            value={SearchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            placeholder="Enter the video URL ....."
          />
          <button id={loading && "disable"} className="searchBtn">
            {loading ? "Generating ..." : "Search"}
          </button>
        </form>
        <div></div>
      </div>
    </>
  );
};

export default SearchSection;
