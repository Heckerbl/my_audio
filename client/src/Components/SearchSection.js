import React, { useContext, useState } from "react";
import "../Styles/SearchSection.css";
import axios from "axios";
import { ContexStore } from "../context";
const SearchSection = () => {
  const details = useContext(ContexStore);
  const [, setData] = details.data;

  const [SearchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = SearchInput;
    if (SearchInput.includes("&list")) {
      data = SearchInput.slice(32).split("&")[0];
      console.log("Indide", data);
    } else {
      data = SearchInput.slice(32);
    }
    axios
      .post("http://localhost:8080/api/getlinks", {
        link: data,
      })
      .then((res, err) => {
        setData(res.data);
        setSearchInput("");
        setLoading(false);

      });
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          className="searchInp"
          value={SearchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          placeholder="Enter the url ....."
        />
        <button className="searchBtn">
          {/* {
            loading ? <> "Generating.." <img src="/assets/Ghost.jpg" className="loderImg" /> </> : "Search"
          } */}
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchSection;
