import { csrfFetch } from "./csrf";

export const CREATE_BOOKING = "bookings/CREATE_BOOKING";
export const GET_ALL_USERS_BOOKING = "bookings/GET_ALL_USERS_BOOKING";
export const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
export const DELETE_BOOKING = "bookings/DELETE_BOOKING";

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const currentUsersBooking = (bookings) => ({
  type: GET_ALL_USERS_BOOKING,
  bookings,
});

export const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking,
});

export const deleteBooking = (booking) => ({
  type: DELETE_BOOKING,
  booking,
});

export const createBookingThunk = (spot, booking) => async (dispatch) => {
  try {
    console.log("createBookingThunk: spot", spot);
    console.log("createBookingThunk: spot.id", spot.id);
    console.log("createBookingThunk: booking", booking);

    const res = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    if (res.ok) {
      const newBooking = await res.json();
      console.log("createBookingThunk - Response from API:", newBooking);
      dispatch(createBooking(newBooking));
      return newBooking;
    } else {
      const errors = await res.json();
      console.log("createBookingThunk - Error Response from API:", errors);
      return errors;
    }
  } catch (error) {
    console.log("createBookingThunk - Error:", error);
    return error;
  }
};

export const getAllUsersBookingsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/bookings/current");
    console.log("getAllUsersBookingsThunk: res", res);
    if (res.ok) {
      const usersBookings = await res.json();
      console.log("getAllUsersBookingsThunk: usersBookings", usersBookings);
      dispatch(currentUsersBooking(usersBookings));
      console.log(
        "getAllUsersBookingsThunk: usersBookings dispatched",
        usersBookings
      );
    }
  } catch (error) {
    console.log("getAllUsersbookingsThunk error", error);
    return error;
  }
};

export const updateBookingThunk = (booking, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (res.ok) {
    const updatedBooking = await res.json();
    updatedBooking.Spot = spot;
    dispatch(updateBooking(updatedBooking));
    return updatedBooking;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteBookingThunk = (booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteBooking(booking));
    return booking;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { user: {}, spot: {} };
const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_BOOKING:
      console.log("Reducer - CREATE_BOOKING action:", action);
      console.log("Reducer - Current state:", state);
      console.log("Reducer - action.spot:", action.spot);
      // console.log("createBooking Reducer - newState", newState)

      newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
      newState.spot[action.booking.id] = action.booking;
      return newState;

    case GET_ALL_USERS_BOOKING:
      console.log("Reducer - GET_ALL_USERS_BOOKING action:", action);
      console.log("Reducer - Current state:", state);
      console.log("Reducer - action.spot:", action.spot);
      // console.log("GET_ALL_USERS_BOOKING Reducer - newState", newState)

      newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
      action.bookings.Bookings.forEach((booking) => {
        newState.user[booking.id] = booking;
      });
      return newState;

    case UPDATE_BOOKING:
      newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
      newState.user[action.booking.id] = action.booking;
      return newState;

    case DELETE_BOOKING:
      newState = { ...state, user: { ...state.user }, spot: {} };
      delete newState.user[action.booking.id];
      return newState;

    default:
      return state;
  }
};

export default bookingReducer;
