import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { thunkUserReviews, deleteReviewThunk } from "../../../../store/reviews";
import { thunkOneSpot } from "../../../../store/spots";

const DeleteReview = ({ review, spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const submitHandler = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(deleteReviewThunk(review));
    if (deleted.id === review.id) {
      dispatch(thunkOneSpot(spot.id));
      dispatch(thunkUserReviews());
      closeModal();
    }
  };
  return (
    //commit
    <>
      <div className="delete">
        <h1>Confirm Delete</h1>
        <h4>Are you sure you want to delete this review?</h4>
        <form onSubmit={submitHandler}>
          <div className="confirm">
            <button type="submit">Yes(Delete Review)</button>
          </div>
          <div className="cancel">
            <button onClick={closeModal}>No(Keep review)</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteReview;
