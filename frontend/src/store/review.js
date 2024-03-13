import { csrfFetch } from "./csrf";
/************************************************************************************ */

const GET_REVIEW = "reviews/getReview";
const GET_USER_REVIEW = "reviews/userReview";
const POST_REVIEW = "reviews/postReview";
const UPDATE_REVIEW = "reviews/updateReview";
const DELETE_REVIEW = "reviews/deleteReview";
/************************************************************************************ */

export const getAllReviews = (reviews) => ({
  type: GET_REVIEW,
  reviews,
});

export const postReview = (review) => ({
  type: POST_REVIEW,
  review,
});

export const getUserReview = (reviews) => ({
  type: GET_USER_REVIEW,
  reviews,
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});
/************************************************************************************ */

export const thunkAllReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const spotReviews = await res.json();
    dispatch(getAllReviews(spotReviews));
    return spotReviews;
  }
};

export const thunkUserReviews = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews/current");

  if (res.ok) {
    const userReviews = await res.json();
    dispatch(getUserReview(userReviews));
  }
};

export const thunkPostReview = (spot, review, user) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const spotReview = await res.json();
    spotReview.User = user;
    dispatch(postReview(spotReview));
    return spotReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview));
    return updatedReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteReviewThunk = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(review));
    return review;
  } else {
    const errors = await res.json();
    return errors;
  }
};
/************************************************************************************ */
const initialState = { spot: {}, user: {} };
/************************************************************************************ */

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEW:
      newState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
      action.reviews.Reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });
      return newState;
    case GET_USER_REVIEW:
      newState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
      action.reviews.Reviews.forEach((review) => {
        newState.user[review.id] = review;
      });
      return newState;
    case UPDATE_REVIEW:
      newState = newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };
      return { ...state, user: { ...action.review } };
    case POST_REVIEW:
      newState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
      newState.spot[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      newState = { ...state, spot: { ...state.spot }, user: {} };
      delete newState.spot[action.review.id];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
