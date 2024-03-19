import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersBookingsThunk } from "../../../store/booking";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteBooking from "./Delete/DeleteBooking";
import UpdateBookingForm from "./Update/UpdateBooking";
import "./ManagerBooking.css";

const ManageBookings = () => {
  const dispatch = useDispatch();
  const bookingObj = useSelector((state) => state.bookings.user);
  const user = useSelector((state) => state.session.user);
  const list = Object.values(bookingObj);

  const userId = user ? user.id : null;

  const bookingList = list.filter((booking) => booking.userId === userId);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getAllUsersBookingsThunk());
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!bookingList) {
    return null;
  }

  return (
    <>
      <div className="manage-bookings">
        <div className="manages">
          <h1>Manage Bookings</h1>
        </div>
        <ul className="bookings-list">
          {bookingList.length > 0 &&
            bookingList.map((booking) => (
              <div key={booking.id} className="review">
                <h3>{booking.Spot?.name}</h3>
                <div>
                  $
                  {((new Date(booking.endDate).getTime() -
                    new Date(booking.startDate).getTime()) /
                    (1000 * 3600 * 24)) *
                    booking.Spot.price}
                </div>
                <div className="date">
                  <h4>Start: {formatDate(booking.startDate)}</h4>
                  <h4>End: {formatDate(booking.endDate)}</h4>
                </div>
                <div className="buttons">
                  <OpenModalMenuItem
                    buttonText="Update"
                    onItemClick={closeMenu}
                    modalComponent={
                      <UpdateBookingForm
                        booking={booking}
                        spot={booking.Spot}
                      />
                    }
                    className="update-button"
                  />
                  <OpenModalMenuItem
                    buttonText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteBooking booking={booking} />}
                    className="delete-button"
                  />
                </div>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ManageBookings;
