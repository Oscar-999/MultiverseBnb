import { csrfFetch } from "./csrf";
/************************************************************************************ */

export const GET_ALL_SPOTS = "spots/getAllSpots";
export const GET_SPOT = "spots/getSpot";
export const CREATE_SPOT = "spots/createSpot";
export const UPDATE_SPOT = "spots/updateSpot";
export const DELETE_SPOT = "spots/deleteSpot";
/************************************************************************************ */

//action creator
export const getSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const currentUserSpot = (spots) => ({
  type: GET_SPOT,
  spots,
});

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const removeSpot = (spot) => ({
  type: DELETE_SPOT,
  spot,
});
/************************************************************************************ */
//Thunks
export const thunkAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(getSpots(spots));
  }
};

export const thunkOneSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spotDetails = await res.json();
    dispatch(createSpot(spotDetails));
    return spotDetails;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkAllUserSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  if (res.ok) {
    const userSpots = await res.json();
    dispatch(currentUserSpot(userSpots));
  }
};

export const thunkCreateSpot = (spot, spotImages) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  const newSpot = await res.json();
  if (res.ok) {
    for (let img of spotImages) {
      await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(img),
      });
    }
    dispatch(createSpot(newSpot));
    return newSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeSpot(spot));
  } else {
    const errors = await res.json();
    return errors;
  }
};
/************************************************************************************ */

const initialState = { allSpots: {}, singleSpot: {} };

/************************************************************************************ */
//Reducer
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: { ...state.allSpots } };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case CREATE_SPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      return { ...state, singleSpot: { ...action.spot } };
    case GET_SPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case UPDATE_SPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      return { ...state, singleSpot: { ...action.spot } };
    case DELETE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
      delete newState.allSpots[action.spot.id];
      return newState;
    default:
      return state;
  }
};
export default spotReducer;
