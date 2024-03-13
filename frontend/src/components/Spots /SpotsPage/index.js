import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot } from "../../../store/spots";

const SpotPage = () => {
  const dispatch = useDispatch();

  let { spotId } = useParams();
  spotId = Number(spotId);

  const spot = useSelector(state => state.spots.singleSpot);
  const userId = useSelector(state => state.session.user?.id);
  

  return <div></div>;
};

export default SpotPage;
