import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllSpots } from "../../store/spots";
import SpotList from "./SpotLists/SpotLists.js";

import "./LandingPage.css";
import SearchBox from "../Navigation/SearchBox/SearchBox.js";

const LandingPage = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredSpots, setFilterSpots] = useState([]);

  const dispatch = useDispatch();
  const spotObj = useSelector((state) => state.spots.allSpots);
  const spotList = Object.values(spotObj);

  useEffect(() => {
    dispatch(thunkAllSpots());
  }, [dispatch]);

  useEffect(() => {
    const newFilteredSpots = spotList.filter((spot) => {
      return spot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    setFilterSpots(newFilteredSpots);
  }, [spotList, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  if (!spotList) {
    return null;
  }

  return (
    <div>
      <SearchBox
        className="search-box"
        onChangeHandler={onSearchChange}
        placeholder="search spots"
      />
      <SpotList spots={filteredSpots} />
    </div>
  );
};

export default LandingPage;
