import React, { useState } from "react";
import "../Styles/SearchSection.css";
const SearchSection = () => {
    const [SearchInput, setSearchInput] = useState();

    const handleSubmit = e => {
        e.preventDefault();
    }

    return <div className="searchContainer">
        <form onSubmit={handleSubmit}>
            <input type="text" name="search" id="search" className="searchInp" onChange={(e) => { setSearchInput(e.target.value) } } placeholder= "Enter the url ....." />
            <button className="searchBtn">Search</button>
        </form>
    </div>
};

export default SearchSection;