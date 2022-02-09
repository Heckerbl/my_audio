import React, { useState } from "react";
import "../Styles/SearchSection.css";
import axios from "axios";
const SearchSection = () => {
    const [SearchInput, setSearchInput] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost3001/api/getlinks", { SearchInput })
            .then((res) => {
                console.log("The data sent!!");
            })
            .catch((err) => {
                console.log("err");
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
