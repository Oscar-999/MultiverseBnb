import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUserReviews } from "../../../store/reviews";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteReview from "./DeleteReview";
import UpdateReviewForm from "./EditReview/index";
import "./ManageReviews.css";

export default function ManageReviews() {
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews.user);
  const user = useSelector((state) => state.session.user);
  const list = Object.values(reviewObj);

  const reviewList = list.filter((review) => review.userId === user.id);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(thunkUserReviews());
  }, [dispatch]);

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

  if (!reviewList) {
    return null;
  }
  // eslint-disable-next-line
  const sortedReviews = reviewList.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <div className="manage-reviews">
        <div className="manages">
          <h1>Manage Reviews</h1>
        </div>
        <ul>
          {reviewList.length > 0 &&
            reviewList.map((review) => (
              <div key={review.id} className="review">
                <h3>{review.Spot?.name}</h3>
                {review.createdAt?.split("-")[1] === "01" && (
                  <div className="date">
                    {" "}
                    Jan {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "02" && (
                  <div className="date">
                    {" "}
                    Feb {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "03" && (
                  <div className="date">
                    {" "}
                    March {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "04" && (
                  <div className="date">
                    {" "}
                    April {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "05" && (
                  <div className="date">
                    {" "}
                    May {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "06" && (
                  <div className="date">
                    {" "}
                    Jun {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "07" && (
                  <div className="date">
                    {" "}
                    July {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "08" && (
                  <div className="date">
                    {" "}
                    Aug {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "09" && (
                  <div className="date">
                    {" "}
                    Sept {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "10" && (
                  <div className="date">
                    {" "}
                    Sept {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "11" && (
                  <div className="date">
                    {" "}
                    Nov {review.createdAt?.split("-")[0]}
                  </div>
                )}
                {review.createdAt?.split("-")[1] === "12" && (
                  <div className="date">
                    {" "}
                    Dec {review.createdAt?.split("-")[0]}
                  </div>
                )}
                <div className="review-text">{review.review}</div>
                <div className="buttons">
                  <OpenModalMenuItem
                    buttonText="Update"
                    onItemClick={closeMenu}
                    modalComponent={
                      <UpdateReviewForm review={review} spot={review.Spot} />
                    }
                  />
                  <OpenModalMenuItem
                    buttonText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={
                      <DeleteReview review={review} spot={review.Spot} />
                    }
                  />
                </div>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}
