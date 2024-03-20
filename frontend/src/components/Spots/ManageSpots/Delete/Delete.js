import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { thunkDeleteSpot } from "../../../../store/spots";
import "./Delete.css";

const Delete = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const submitHandler = (e) => {
    e.preventDefault();
    return dispatch(thunkDeleteSpot(spot)).then(closeModal);
  };

  return (
    <>
      <div className="delete">
        <h1>Confirm Delete</h1>
        <h4>Are you sure you want to remove this spot from the listings?</h4>
        <form onSubmit={submitHandler}>
          <div className="confirm">
            <button type="submit">Yes(Delete Spot)</button>
          </div>
          <div className="cancel">
            <button onClick={closeModal}>No(Keep Spot)</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Delete;
