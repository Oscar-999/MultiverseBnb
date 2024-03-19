import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot } from "../../../store/spots";
import { thunkAllReviews } from "../../../store/review";
import SpotInfoHeader from "./SpotInfoHeader/SpotInfoHeader";
import HostInfo from "./HostInfo/HostInfo";
import HostedBy from "./HostedBy/HostedBy";
import ThingsToKnow from "./ThingsToKnow/ThingsToKnow";
import SpotInfoFooter from "./SpotFooter/SpotFooter";
import CreateBooking from "../../Bookings/ManagerComponents/Create/CreateBooking";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import SpotReview from "../SpotReviews/SpotReviews";
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
                  <HostInfo spot={spot} />
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
              <h1>★ New</h1>
            </div>
            <HostedBy spot={spot} userId={userId} />
            <ThingsToKnow />
            <SpotInfoFooter />
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <div className="box">
            <div className="spot-box">
              <SpotInfoHeader spot={spot} />
              <div className="reserve-box">
                <div className="reserve-wrap">
                  <HostInfo spot={spot} />
                </div>
                <div className="review">
                  <div className="reserve">
                    <div className="money">
                      <div>$ {spot.price} night</div>
                      {/* {newReviewList.length === 1 && (
                        <div>
                          ★ {spot.avgStarRating}.0 · {newReviewList.length}{" "}
                          review
                        </div>
                      )}
                      {newReviewList.length > 1 && (
                        <div>
                          ★ {spot.avgStarRating.toFixed(1)} ·{" "}
                          {newReviewList.length} reviews
                        </div>
                      )} */}
                    </div>
                    <CreateBooking />
                  </div>
                </div>
              </div>
              {newReviewList.length === 1 && (
                <h1>
                  ★ {spot.avgStarRating}.0 · {newReviewList.length} review
                </h1>
              )}
              {newReviewList.length > 1 && (
                <h1>
                  ★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length}{" "}
                  reviews
                </h1>
              )}
              <SpotReview
                spot={spot}
                newReviewList={newReviewList}
                userReview={userReview}
              />
            </div>
            <HostedBy spot={spot} userId={userId} />

            <ThingsToKnow />
          </div>

          <SpotInfoFooter />
        </section>
      );
    }
  }
  if (userId !== spot.ownerId) {
    if (!userReview && userId && numReviewsList.length === 0) {
      return (
        <section>
          <div className="box">
            <div className="spot-box">
              <SpotInfoHeader spot={spot} />
              <div className="reserve-box">
                <div className="reserve-wrap">
                  <HostInfo spot={spot} />
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
            <div className="new-post">
              <h1>★ New</h1>
              <div className="modal-review">
                <OpenModalMenuItem
                  buttonText="Post Your Review"
                  onItemClick={closeMenu}
                  modalComponent={<CreateReview spot={spot} />}
                />
                <h4>Be the first to post a review!</h4>
              </div>
            </div>
            <HostedBy spot={spot} userId={userId} />

            <ThingsToKnow />
          </div>
          <SpotInfoFooter />
        </section>
      );
    }
    if (!userReview && userId && newReviewList > 0) {
      return (
        <section>
          <div className="box">
            <div className="spot-box">
              <SpotInfoHeader spot={spot} />
              <div className="reserve-box">
                <div className="reserve-wrap">
                  <HostInfo spot={spot} />
                </div>
                <div className="review">
                  <div className="reserve">
                    <div className="money">
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 1 && (
                        <div>
                          ★ {spot.avgStarRating}.0 · {newReviewList.length}{" "}
                          review
                        </div>
                      )}
                      {newReviewList.length > 1 && (
                        <div>
                          ★ {spot.avgStarRating.toFixed(1)} ·{" "}
                          {newReviewList.length} reviews
                        </div>
                      )}
                    </div>
                    <CreateBooking />
                  </div>
                </div>
              </div>
              {newReviewList.length === 1 && (
                <h1>
                  ★ {spot.avgStarRating}.0 · {newReviewList.length} review
                </h1>
              )}
              {newReviewList.length > 1 && (
                <h1>
                  ★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length}{" "}
                  reviews
                </h1>
              )}
              <div className="new-post">
                <div className="modal-review">
                  <OpenModalMenuItem
                    buttonText="Post Your Review"
                    onItemClick={closeMenu}
                    modalComponent={<CreateReview spot={spot} />}
                  />
                </div>
              </div>
            </div>
            <SpotReview
              spot={spot}
              newReviewList={newReviewList}
              userReview={userReview}
            />
            <HostedBy spot={spot} userId={userId} />

            <ThingsToKnow />
          </div>
          <ThingsToKnow />
        </section>
      );
    }
    if (!userReview && userId && newReviewList.length > 0) {
      return (
        <section>
          <div className="box">
            <div className="spot-box">
              <SpotInfoHeader spot={spot} />
              <div className="reserve-box">
                <div className="reserve-wrap">
                  <HostInfo spot={spot} />
                </div>
                <div className="review">
                  <div className="reserve">
                    <div className="money">
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 1 && (
                        <div>
                          ★ {spot.avgStarRating}.0 · {newReviewList.length}{" "}
                          review
                        </div>
                      )}
                      {newReviewList.length > 1 && (
                        <div>
                          ★ {spot.avgStarRating.toFixed(1)} ·{" "}
                          {newReviewList.length} reviews
                        </div>
                      )}
                    </div>
                    <CreateBooking />
                  </div>
                </div>
                {newReviewList.length === 1 && (
                  <h1>
                    ★ {spot.avgStarRating}.0 · {newReviewList.length} review
                  </h1>
                )}
                {newReviewList.length > 1 && (
                  <h1>
                    ★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length}{" "}
                    reviews
                  </h1>
                )}
              </div>
              <div className="new-post">
                <div className="modal-review">
                  <OpenModalMenuItem
                    buttonText="Post Your Review"
                    onItemClick={closeMenu}
                    modalComponent={<CreateReview spot={spot} />}
                  />
                </div>
              </div>
            </div>
            <SpotReview
              spot={spot}
              newReviewList={newReviewList}
              userReview={userReview}
            />
            <HostedBy spot={spot} userId={userId} />

            <ThingsToKnow />
          </div>
          <SpotInfoFooter />
        </section>
      );
    } else {
      return (
        <section>
          <div className="box">
            <div className="spot-box">
              <SpotInfoHeader />
              <div className="reserve-box">
                <div className="reserve-wrap">
                  <HostInfo spot={spot} />
                </div>
                <div className="review">
                  <div className="reserve">
                    <div className="money">
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 0 && <div>★ New</div>}
                      {newReviewList.length === 1 && (
                        <div>
                          ★ {spot.avgStarRating}.0 · {newReviewList.length}{" "}
                          review
                        </div>
                      )}
                      {newReviewList.length > 1 && (
                        <div>
                          ★ {spot.avgStarRating.toFixed(1)} ·{" "}
                          {newReviewList.length} reviews
                        </div>
                      )}
                    </div>
                    <CreateBooking />
                  </div>
                </div>
              </div>
              {newReviewList.length === 1 && (
                <h1>
                  ★ {spot.avgStarRating}.0 · {newReviewList.length} review
                </h1>
              )}
              {newReviewList.length > 1 && (
                <h1>
                  ★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length}{" "}
                  reviews
                </h1>
              )}
              <SpotReview
                spot={spot}
                newReviewList={newReviewList}
                userReview={userReview}
                userId={userId}
              />
            </div>
            <HostedBy spot={spot} userId={userId} />

            <ThingsToKnow />
          </div>
          <SpotInfoFooter />
        </section>
      );
    }
  } else if (userId === spot.ownerId) {
    return (
      <section>
        <div className="box">
          <div className="spot-box">
            <SpotInfoHeader spot={spot} />
            <div className="reserve-box">
              <div className="reserve-wrap">
                <HostInfo spot={spot} />
              </div>
              <div className="review">
                <div className="reserve">
                  <div className="money">
                    <div>$ {spot.price} night</div>
                    {newReviewList.length === 0 && <div>★ New</div>}
                    {newReviewList.length === 1 && (
                      <div>
                        ★ {spot.avgStarRating}.0 · {newReviewList.length} review
                      </div>
                    )}
                    {newReviewList.length > 1 && (
                      <div>
                        ★ {spot.avgStarRating.toFixed(1)} ·{" "}
                        {newReviewList.length} reviews
                      </div>
                    )}
                  </div>
                  <CreateBooking />
                </div>
              </div>
            </div>
            {newReviewList.length === 0 && <h1>★ New</h1>}
            {newReviewList.length === 1 && (
              <h1>
                ★ {spot.avgStarRating}.0 · {newReviewList.length} review
              </h1>
            )}
            {newReviewList.length > 1 && (
              <h1>
                ★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length}{" "}
                reviews
              </h1>
            )}
            {newReviewList.length > 0 && (
              <SpotReview
                spot={spot}
                newReviewList={newReviewList}
                userReview={userReview}
                userId={userId}
              />
            )}
          </div>
          <HostedBy spot={spot} userId={userId} />

          <ThingsToKnow />
        </div>
        <SpotInfoFooter />
      </section>
    );
  }
};

export default SpotPage;
