import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot, thunkUpdateSpot } from "../../../../store/spots";
import { useHistory } from "react-router-dom";

const EditSpot = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const history = useHistory();
  const [country, setCountry] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkOneSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setStreet(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setLatitude(spot.lat);
      setLongitude(spot.lng);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
    }
  }, [spot]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const spotObj = {
      ...spot,
      country,
      address: street,
      city,
      state,
      lat: latitude,
      lng: longitude,
      description,
      name,
      price,
    };

    const errors = {};
    if (!country) {
      errors.country = "Country is required";
    }
    if (!street) {
      errors.street = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!latitude) {
      errors.latitude = "Latitude is required";
    }
    if (!longitude) {
      errors.longitude = "Longitude is required";
    }
    if (!description || description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    if (!price) {
      errors.price = "Price is required";
    }

    const editedSpot = await dispatch(thunkUpdateSpot(spotObj));

    if (Object.values(errors).length > 0) {
      setErrors(errors);
    } else {
      history.push(`/spots/${editedSpot.id}`);
    }
  };

  if (!spot) return null;

  if (spot.id === spotId) {
    return (
      Object.keys(spot).length > 1 && (
        <>
          <div className="spot-form">
            <form onSubmit={submitHandler}>
              <div className="location">
                <h2>Update Spot</h2>
                <h3>Where's your place located?</h3>
                <h5>
                  Guests will only get your exact address once they booked a
                  reservation.
                </h5>
                <label>
                  <div className="flex">
                    Country
                    <br></br>
                    <div className="errors">{errors.country}</div>
                  </div>
                  <input
                    type="text"
                    placeholder=" Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </label>
                <label>
                  <div className="flex">
                    Street Address
                    <div className="errors">{errors.street}</div>
                  </div>
                  <input
                    type="text"
                    placeholder=" Address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </label>
                <div className="city">
                  <label>
                    <div className="flex">
                      City
                      <div className="errors">{errors.city}</div>
                    </div>
                    <div className="city-input">
                      <div className="comma">
                        <input
                          type="text"
                          placeholder=" City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />{" "}
                        ,
                      </div>
                    </div>
                  </label>
                  <label>
                    <div className="flex">
                      State
                      <div className="errors">{errors.state}</div>
                    </div>
                    <input
                      type="text"
                      placeholder=" STATE"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </label>
                </div>
                <div className="lat">
                  <label>
                    <div className="flex">
                      Latitude
                      <div className="errors">{errors.latitude}</div>
                    </div>
                    <div className="lat-input">
                      <div className="comma">
                        <input
                          type="number"
                          placeholder="latitude"
                          min="-90"
                          max="90"
                          step="any"
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                        />{" "}
                        ,
                      </div>
                    </div>
                  </label>
                  <label>
                    <div className="flex">
                      Longitude
                      <div className="errors">{errors.longitude}</div>
                    </div>
                    <div className="lng-input">
                      <input
                        type="number"
                        step="any"
                        min="-180"
                        max="180"
                        placeholder="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="describe">
                <h3>Describe your place to guests</h3>
                <h6>
                  Mention the best features of your space, any special
                  amentities like fast wif or parking, and what you love about
                  the neighborhood.
                </h6>
                <textarea
                  value={description}
                  placeholder=" Please write at least 30 characters"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="errors">{errors.description}</div>
              </div>
              <div className="name">
                <h3>Create a title for your spot</h3>
                <h6>
                  Catch guests' attention with a spot title that highlights what
                  makes your place special.
                </h6>
                <input
                  type="text"
                  placeholder=" Name of your spot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="errors">{errors.name}</div>
              </div>
              <div className="cost">
                <h3>Set a base price for your spot</h3>
                <h6>
                  Competitive pricing can help your listing stand out and rank
                  higher in search results.
                </h6>
                <label>
                  <div className="price">
                    ${" "}
                    <input
                      type="number"
                      placeholder=" Price per night (USD)"
                      step="1"
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </label>
                <div className="errors">{errors.price}</div>
              </div>
              <button type="submit">Update Spot</button>
            </form>
          </div>
        </>
      )
    );
  }
};

export default EditSpot;
