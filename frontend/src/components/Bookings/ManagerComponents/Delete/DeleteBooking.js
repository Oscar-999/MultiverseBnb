import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookingThunk } from "../../../../store/booking";
import { useModal } from "../../../../context/Modal";

const DeleteBooking =({ booking }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [errors, setErrors] = useState({})

    const handleDelete = async (e) => {
        e.preventDefault()
        setErrors({})
        return dispatch(deleteBookingThunk(booking))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            })

    }

    return (
        <>
            <div className="delete">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to delete this booking?</h4>
                <form onSubmit={handleDelete}>
                    <div className="red">
                      {errors.booking && <div className="errors">{errors.booking}</div>}
                        <button type='submit'>
                            Yes(Delete Booking)
                        </button>
                    </div>
                    <div className="grey">
                        <button onClick={closeModal}>
                            No(Keep Booking)
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default DeleteBooking;
