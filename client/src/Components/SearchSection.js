import React, { useContext, useState } from "react";
import "../Styles/SearchSection.css";
import axios from "axios";
import { ContexStore } from "../context";
const SearchSection = () => {
  const details = useContext(ContexStore);
  const [, setData] = details.data;

  const [SearchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    setSearchInput("");
    e.preventDefault();
    const data = SearchInput;

    axios
      .post("http://localhost:8080/api/getlinks", {
        link: data,
      })
      .then((res, err) => {
        console.log(res.data);
        setData(res.data);
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
        <button className="searchBtn">Search</button>
      </form>
    </div>
  );
};

export default SearchSection;
