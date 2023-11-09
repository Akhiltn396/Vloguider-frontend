import React, { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "./Feature.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { QueryClient, useMutation, useQuery } from "react-query";
import { format } from "timeago.js";
import newRequest from "../../utils/newRequest";
import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import upload from "../../components/utils/upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { search } from "../../redux/searchSlice";
import Location from "../../img/current-location-icon.png";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

const Feature = () => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const searched = useSelector((state) => state.search);
  const place = searched.destination;
  const [currentlat, setLat] = useState();
  const [currentlong, setLong] = useState();
  console.log(currentlat, currentlong);
  const [currentaddress, setAddress] = useState();

  const [viewPort, setViewport] = useState({
    latitude: searched.latitude ? searched.latitude : currentlat,
    longitude: searched.longitude ? searched.longitude : currentlong,
    zoom: searched.zoom || 4,
  });

  const latitude = viewPort.latitude;
  const longitude = viewPort.longitude;
  // useEffect(() => {

  //   }

  // }, [search]);

  const [showPopup, setShowPopup] = useState(true);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState({
    lat: 0,
    lng: 0,
  });
  console.log("newPlace", newPlace);
  const [category, setCategory] = useState(null);
  const [sim, setSim] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);

  const [star, setStar] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["getPin"],
    queryFn: () =>
      newRequest
        .get(`/`)
        .then((res) => {
          return res.data;
        })
        .catch((errorData) => {
          console.log("error" + errorData);
        }),
  });
  console.log(data);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewPort, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    console.log(lng, lat);
    setNewPlace({
      lat,
      lng,
    });
  };

  const mutation = useMutation({
    mutationFn: (pin) => {
      return newRequest
        .post("/", pin)
        .then((res) => {
          return res.data;
          // console.log(res.data);
        })
        .catch((errorData) => {
          console.log(errorData);
        });
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["createPin"]);
    },
  });

  //handleUpload

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const images = await Promise.all(
        [...photos].map(async (file) => {
          //[...photos is using because multiples files are stored as a file list in js.inorder to convert them into an array we can use this ]
          const url = await upload(file);
          return url;
        })
      );
      setPhotos(images);

      setUploading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser?.username,
      category,
      sim,
      photos,
      title,
      desc,
      rating: star,
      location: {
        type: "Point", // If you want to explicitly set it as a Point
        coordinates: [newPlace?.lng, newPlace?.lat], // Replace with your coordinates
      },
    };


    mutation.mutate(newPin);

    setNewPlace(null);
    setPhotos("");
  };
  const mutationDelete = useMutation((id) => {

    // return newRequest.delete(`/${id}`);

    return axios.delete(
      `https://vloguider-backend.onrender.com/api/pins/${id}`
    );

  });
  const handleDelete = (id) => {
    mutationDelete.mutate(id);

  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleCLick = (e) => {
    e.preventDefault();
    // setViewport({ ...viewPort, latitude: currentlat, longitude: currentlong });

    dispatch(search({ currentaddress, currentlat, currentlong }));
    // // dispatch(remove())
    window.location.reload();
  };
  return (
    <div className="feature" style={{ height: "100vh", width: "100vw" }}>
      <SideBar latitude={latitude} longitude={longitude} />
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYWtoaWwxMjM4OTAiLCJhIjoiY2xuZGI2ZWdyMDJ5OTJtcmxqbXM0MGc1eiJ9.cfe6FlxCcLvagq0Egp0Vmw"
        initialViewState={{
          ...viewPort,
        }}
        onLoad={() => setLoaded(true)}
        onContextMenu={handleAddClick}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data?.map((d) => (
            <>
              <Marker
                longitude={d.location.coordinates[0]}
                latitude={d.location.coordinates[1]}
                offset={[0 * viewPort.zoom, -2 * viewPort.zoom]}
                style={{}}
              >
                <RoomIcon
                  style={{
                    fontSize: viewPort.zoom * 6,
                    color: currentUser?.isAdmin ? "red" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(d._id, d.lat, d.long)}
                />
              </Marker>
              {d._id === currentPlaceId && (
                <Popup
                  longitude={d.location.coordinates[0]}
                  latitude={d.location.coordinates[1]}
                  anchor="left"
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  // offset={[30, -1650]}
                  maxWidth={"230px"}
                  style={{
                    height: "fit-content",
                    marginLeft: "20px",
                  }}
                  className="string"
                >
                  <div className="card">
                    {currentUser?.isAdmin && (
                      <DeleteIcon
                        className="delete"
                        onClick={() => handleDelete(d._id)}
                      />
                    )}
                    <label>Place</label>
                    <h4 className="place">{d.title}</h4>
                    <label>Review</label>
                    <p className="desc">{d.desc}</p>

                    <label>Information</label>
                    <span className="username">
                      Created by <b>{d.username}</b>
                    </span>
                    <span className="date">{format(d.createdAt)}</span>
                    <label style={{ marginTop: "10px" }}>Rating</label>
                    <div>
                      {Array(d.rating).fill(<StarIcon className="star" />)}
                    </div>
                  </div>
                </Popup>
              )}
            </>
          ))
        )}

        {newPlace &&
          (!currentUser?.isAdmin ? (
            <Popup
              longitude={newPlace?.lng}
              latitude={newPlace?.lat}
              anchor="left"
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              // offset={[30, -1650]}
              maxWidth={"230px"}
              style={{
                backgroundColor: "",
                height: "fit-content",
                marginLeft: "20px",
              }}
              // className="string"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          ) : (
            <Popup
              longitude={newPlace?.lng}
              latitude={newPlace?.lat}
              anchor="left"
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              // offset={[30, -1650]}
              maxWidth={"230px"}
              style={{
                backgroundColor: "",
                height: "320px",
                marginLeft: "20px",
              }}
              // className="string"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Category</label>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="Tourist Place">Tourist Place</option>
                    <option value="Petrol Bunk">Petrol Pump</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Police Station">Police Station</option>
                  </select>
                  <label>Sim/Connection Availability</label>
                  <select onChange={(e) => setSim(e.target.value)}>
                    <option value="Airtel">Airtel</option>
                    <option value="Jio">Jio</option>
                    <option value="VI">VI</option>
                    <option value="BSNL">BSNL</option>
                  </select>

                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ paddingBottom: "20px" }}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <div className="imag">
                    <div className="imagesInputs">
                      <label htmlFor="">Upload Images</label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setPhotos(e.target.files)}
                      />
                      <button onClick={handleUpload}>
                        {uploading ? "uploading" : "Upload"}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          ))}
      </Map>
      <div className="current" onClick={handleCLick}>
        <img src={Location} alt="" />
      </div>
    </div>
  );
};

export default Feature;
