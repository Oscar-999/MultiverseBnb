import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot } from "../../../../store/spots";
import { createBookingThunk, getAllUsersBookingsThunk } from "../../../../store/booking";
import { useHistory } from "react-router-dom";
import "./CreateBooking.css";

import ReservationPopUP from "../ReservationPopUP.";

export default function CreateBooking() {
    const { spotId } = useParams();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot);
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        dispatch(thunkOneSpot(spotId));
    }, [dispatch, spotId]);

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors({});
        const currentDate = new Date().toJSON().slice(0, 10);

        if (startDate < currentDate) {
            setErrors({ startDate: "Cannot book in the past dates" });
            return;
        }

        if (endDate < startDate) {
            setErrors({ endDate: "End date should be after start dates" });
            return;
        }

        const newBooking = {
            spotId,
            startDate,
            endDate,
        };

        try {
            await dispatch(createBookingThunk(spot, newBooking));
            setStartDate("");
            setEndDate("");
            await dispatch(getAllUsersBookingsThunk());
            history.push('/bookings/current');
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
                history.push(`/spots/${spot.id}`);
            }
        }
    };

    const isUserOwner = spot && userId === spot.ownerId;

    return (
        <div className="create-booking-container">
            <div className="create-booking-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="start-date">Check-in</label>
                        <input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        {errors.startDate && <div className="error-message">{errors.startDate}</div>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="end-date">Check-out</label>
                        <input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                        {errors.endDate && <div className="error-message">{errors.endDate}</div>}
                    </div>

                    {!userId ? (
                        <>
                            <button
                                type="button"
                                className="reserve-button"
                                onClick={() => setShowPopUp(true)}
                            >
                                Reserve
                            </button>
                            {showPopUp && (
                                <ReservationPopUP onClose={() => setShowPopUp(false)} />
                            )}
                        </>
                    ) : !isUserOwner ? (
                        <button
                            type="submit"
                            className="reserve-button"
                            disabled={!userId}
                        >
                            Reserve
                        </button>
                    ) : (
                        <p className="cant-reserve-message">Can't reserve your own spot</p>
                    )}

                    <p id="no-charge">You won't be charged yet</p>
                </form>
            </div>
        </div>
    );
}
