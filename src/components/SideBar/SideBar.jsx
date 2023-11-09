import React, { useEffect, useReducer, useState } from "react";
import "./SideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { remove, search } from "../../redux/searchSlice";
import { useQuery } from "react-query";
import axios from "axios";
import useFetch from "../useFetch";
import Image from "../Image/Image";
import newRequest from "../../utils/newRequest";


const SideBar = ({ latitude, longitude }) => {
  const [destination, setDestinations] = useState("Kerala");

  const [open, setOpen] = useState(false);
  let componentMounted = true;
  const [weather, setWeather] = useState([]);
  const { datas, loading, error } = useFetch(
    `https://vloguider-backend.onrender.com/api/pins?title=${destination}`
  );

  const dispatch = useDispatch();

  const { isLoading, errors, data } = useQuery({
    queryKey: ["getDetails"],
    queryFn: () =>
      newRequest
        .get(
          `/destData?latitude=${latitude}&longitude=${longitude}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((errorData) => {
          console.log("error" + errorData);
        }),
  });
  const photos = data?.[0]?.photos;
  console.log(datas)



  // Create an object to store unique values based on the 'sim' field
  const uniqueValues = {};

  // Filter and keep only the first occurrence of each 'sim' value
  const filteredData = data?.filter((item) => {
    if (!uniqueValues[item?.sim]) {
      uniqueValues[item?.sim] = true;
      return true;
    }
    return false;
  });

  // const dataEntries = Object?.entries(data);

  //   useEffect(() => {
  //    const data = axios.get(`http://localhost:3001/api/pins?title=${destination}`)
  //          .then((res) => {
  //           //  return res.data;
  // setData(res.data)
  //          })
  //          .catch((errorData) => {
  //            console.log("error" + errorData);
  //          })

  //   }, [data])

  // console.log("data[0]", data?.[0]);
  const handleChange = (e) => {
    setDestinations(e.target.value);
  };

  const handleCLick = (e) => {
    e.preventDefault();

    dispatch(search(datas?.[0]));
    // dispatch(remove())
    window.location.reload();
  };
  useEffect(() => {
    const featchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${data?.[0]?.title}&appid=46f6fc7394e4f1c866ced4a2836a323c`
      );
      if (componentMounted) {
        setWeather(await response.json());
      }
      return () => {
        componentMounted = false;
      };
    };
    featchWeather();
  }, [data?.[0]?.title]);

  let temp = (weather?.main?.temp - 273.15).toFixed(2);


  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="sidebar">
      <div className="container">
        <marquee>Lets search</marquee>

        <label>Search Place</label>
        <br />
        <input type="text" onChange={handleChange} />
        <button onClick={handleCLick}>Search</button>
        <br />

        <h3>
          Details about <span>{data?.[0]?.title}</span>
        </h3>
        <h3>(within 10km)</h3>

        <br />
        <label>Internet/Connection availability</label>

        {filteredData?.map((d) => (

          <h3>{d?.sim}</h3>

        ))}
        <br />
        <label>Weather</label>
        {
        temp === "NaN" ?
        <>
        <br />
        <span>Weather Details not avbailable</span>
        </>
        :
        <>

        <br />
        <h3>
          <span>{temp}</span> degree celsius
        </h3>
        </>
        }

        <br />
        <br/>
        <label>Images</label>

        <br />

        {photos?.length === 0 ? (
          <div>Images Not available</div>
        ) : (
          <div>
            <button onClick={() => handleOpen()}>
              Click Here to see Images
            </button>
            {open && <Image img={photos} open={setOpen} />}
          </div>
        )}
        <br />
        <label>Nearest Tourist Location</label>
        {data?.map((item) => {
          if (item?.category === "Tourist Place") {
            return <h3>{item?.title}</h3>;
          }
          return null; // Skip items that don't match the category
        })}
        <br />
        <label>Nearest Workshops</label>
        {data?.map((item) => {
          if (item?.category === "Workshop") {
            return <h3>{item?.title}</h3>;
          }
          return null; // Skip items that don't match the category
        })}
        <br />
        <label>Nearest Restaurants</label>
        {data?.map((item) => {
          if (item?.category === "Restaurant") {
            return <h3>{item?.title}</h3>;
          }
          return null; // Skip items that don't match the category
        })}
        <br />

        <label>Nearest Petrol Bunks</label>
        <br />
        {data?.map((item) => {
          if (item?.category === "Petrol Bunk") {
            return <h3>{item?.title}</h3>;
          }
          return null; // Skip items that don't match the category
        })}
        <br />
        <label>Nearest Hospital</label>
        <br />
        {data?.map((item) => {
          if (item?.category === "Hospital") {
            return <h3>{item?.title}</h3>;
          }
          return null; // Skip items that don't match the category
        })}
        <br />
        <label>Nearest Police Station</label>
        <br />
        {data?.map((item) => {
          if (item?.category === "Police Station") {
            return <h3>{item?.title}</h3>;
          }
          return null; // Skip items that don't match the category
        })}
        <br />
      </div>
    </div>
  );
};

export default SideBar;
