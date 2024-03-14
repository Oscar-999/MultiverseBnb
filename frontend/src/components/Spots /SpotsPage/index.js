import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot } from "../../../store/spots";
import { thunkAllReviews } from "../../../store/review";
import SpotInfoHeader from "./SpotInfoHeader/SpotInfoHeader";
import SpotDescription from "./SpotDescription/SpotDescription";
import HostInfo from "./HostInfo/HostInfo";
const SpotPage = () => {
  const dispatch = useDispatch();

  let { spotId } = useParams();
  spotId = Number(spotId);

  const spot = useSelector((state) => state.spots.singleSpot);
  const userId = useSelector((state) => state.session.user?.id);

  const reviewObj = useSelector((state) => state.reviews.spot);

  const reviewList = Object.values(reviewObj);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(thunkAllReviews(spotId));
    dispatch(thunkOneSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (!spot) {
    return null;
  }

  if (!reviewObj) {
    return null;
  }

  if (!spot.Owner) {
    return null;
  }

  const newReviewList = reviewList.filter(
    (review) => review.spotId === spot.id
  );

  const [userReview] = newReviewList.filter(
    (review) => review.userId === userId
  );

  if (!newReviewList) {
    return null;
  }

  if (!userId) {
    if (newReviewList.length === 0) {
      return (
        <section>
          <div className="box">
            <div className="spot-box">
              <SpotInfoHeader spot={spot} />
              <div className="reserve-box">
                <div className="reserve-wrap">
                  <HostInfo />
                </div>
                <div className="review">
                  <div className="reserve">
                    <div className="money">
                      <div>$ {spot.price} night</div>
                      <div>★ New</div>
                    </div>
                    <CreateBooking />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      
    }
  }
  return <div></div>;
};

export default SpotPage;
