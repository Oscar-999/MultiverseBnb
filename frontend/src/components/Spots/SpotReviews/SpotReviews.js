import React from "react";
import DeleteReview from "../../Reviews/ManageReviews/DeleteReview";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { useEffect, useRef, useState } from "react";
import "./SpotReview.css";
const SpotReview = ({ spot, newReviewList, userReview, userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  if (!newReviewList) {
    return null;
  }
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const sortedReviews = newReviewList.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <ul className="spot-review-list">
        {sortedReviews.map((review) => (
          <li key={review.id} className="spot-review-item">
            <div className="spot-n-image">
            <div className="spot-review-name">{review.User?.username}</div>
            <img className="spot-review-pic"src={review.User?.profilePic}/>
            </div>
            <div className="spot-review-date">
              {getFormattedDate(review.createdAt)}
            </div>
            <div className="spot-review-description">{review.review}</div>

            {userReview && userId && review.userId === userId && (
              <div className="spot-review-modal">
                <OpenModalMenuItem
                  buttonText="Delete"
                  onItemClick={closeMenu}
                  modalComponent={<DeleteReview review={review} spot={spot} />}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SpotReview;
