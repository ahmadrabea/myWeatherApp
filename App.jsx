import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [flag, setFlag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const flagApi = `https://countryflagsapi.com/png/${flag}`;
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=17036eed7a6923b64930779b25773663`;
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=17036eed7a6923b64930779b25773663`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      axios
        .get(apiUrl)
        .then((response) => {
          setLat(response.data[0].lat);
          setLon(response.data[0].lon);
          setIsLoading(false);
        })
        .catch(() => {
          console.log("City Not Found");
        });
    }
  };
  const searchLocationMobile = () => {
    setIsLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setLat(response.data[0].lat);
        setLon(response.data[0].lon);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("City Not Found");
      });
  };

  useEffect(() => {
    if (lat && lon) {
      axios
        .get(weatherApi)
        .then((response) => {
          setData(response.data);
          setFlag(response.data.sys.country);
        })
        .catch(() => {
          console.log("City Not Found");
        });
    }
  }, [lat, lon]);

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}

      <div className="search">
        <div className="search-container">
          <div className="icon" onClick={searchLocationMobile}></div>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            onKeyPress={searchLocation}
          />
        </div>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? (
              <p>
                {data.name} - {data.sys.country}
                <img className="flag" src={flagApi} alt="here" />
              </p>
            ) : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.main ? (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}°F</p>
              ) : null}

              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}

              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}

              <p>Wind Speed</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
