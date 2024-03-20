import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllUserSpots } from "../../../store/spots";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import Delete from './Delete/Delete'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import "./ManageSpot.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const spotObj = useSelector((state) => state.spots.allSpots);
  const user = useSelector((state) => state.session.user);
  const spotList = Object.values(spotObj);
  const newList = spotList.filter((spot) => spot.ownerId === user.id);
  const ulRef = useRef();
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkAllUserSpots());
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

  const create = () => {
    history.push("/spots/new");
  };

  if (!newList) {
    return null;
  }

  return (
    <main>
      <div className="manage">
        <h1>Manage Your Spots</h1>
        <button onClick={create}>Create a New Spot</button>
      </div>
      <ul>
        {newList.length > 0 &&
          newList.map((spot) => (
            <div key={spot.id} className="spot">
              <Link to={`/spots/${spot.id}`}>
                <div className="image">
                  <img src={spot.previewImage} alt="house"></img>
                </div>
                <div className="list">
                  <div className="star">
                    <li>
                      {spot.city}, {spot.state}
                    </li>
                    <li className="star-avg">★ {spot.avgRating !== 0 ? spot.avgRating.toString() : "New"}</li>
                  </div>
                  <li  className="price">${spot.price} night</li>
                </div>
              </Link>
              <div className="buttons">
                <button className="update-bttn" onClick={() => history.push(`/spots/${spot.id}/edit`)}>
                  Update
                </button>
                <OpenModalMenuItem
                  buttonText="Delete"
                  onItemClick={closeMenu}
                  modalComponent={<Delete spot={spot} />}
                />
              </div>
            </div>
          ))}
      </ul>
    </main>
  );
};
export default ManageSpots;
