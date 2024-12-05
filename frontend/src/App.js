// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotPage from "./components/Spots/SpotsPage";
import ManageSpots from "./components/Spots/ManageSpots/ManageSpots";
import ManageReviews from "./components/Reviews/ManageReviews/EditReview";
import CreateSpot from "./components/Spots/ManageSpots/CreateSpot/CreateSpot";
import EditSpot from "./components/Spots/ManageSpots/EditSpot/EditSpot";
import ManageBookings from "./components/Bookings/ManagerComponents/ManagerBooking";
import CreateBooking from "./components/Bookings/ManagerComponents/Create/CreateBooking";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  // Page switch implementation
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/spots/new"} component={CreateSpot} />
          <Route exact path={"/spots/current"} component={ManageSpots} />
          <Route exact path={"/spots/:spotId"} component={SpotPage} />
          <Route exact path={"/reviews/current"} component={ManageReviews} />
          <Route exact path={"/spots/:spotId/edit"} component={EditSpot} />
          <Route exact path={"/bookings/current"} component={ManageBookings} />
          <Route
            exact
            path={"/spots/bookings/:spotId"}
            component={CreateBooking}
          />
        </Switch>
      )}
    </>
  );
}

export default App;
