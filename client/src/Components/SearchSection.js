import React, { useState } from "react";
import "../Styles/SearchSection.css";
import axios from "axios";
const SearchSection = ({ status }) => {
  const [SearchInput, setSearchInput] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = SearchInput;

    axios
      .post("http://localhost:8080/api/getlinks", {
        link: data,
      })
      .then((res, err) => {
        console.log(res.data);
      });
  };

  return (
    <div className={status ? "searchContainer disabled" : "searchContainer"}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          className="searchInp"
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
