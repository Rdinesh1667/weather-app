import React, { useState } from "react";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";
import Alert from "./Alert";

function App() {

  const API_KEY = '21571e236ae1e7500c50aabca16ad13c';

  const [data, setData] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      axios.get(url).then(response => {
        setData(response?.data);
      })
        .catch((error) => {
          setError(error.response?.data?.message || 'An error occurred');
          setData(null);
        })
        .finally(() => {
          setIsLoading(false);
          setLocation('');
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    }
  }

  return (

    <div className="app">
      {isLoading && (
        <div className="loading-spinner">
          <MagnifyingGlass
            visible={true}
            height={80}
            width={80}
            ariaLabel="MagnifyingGlass-loading"
            glassColor="#bbc1c3"
            color="#394c54"
          />
        </div>
      )}

      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}

      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search Location"
          type="text" />
      </div>
      <div className="date">
        <p> {new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      {data ?
        <div className="container">
          <div className="top">
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{data.main.temp.toFixed()}°C</h1>
              <div className="icon">
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
              </div>
            </div>

            <div className="description">
              <p>{data.weather[0].main}</p> :
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="temp_max">
              <p className="bold">{data.main.temp_max.toFixed()}°C</p>
              <p>Max Temp</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed.toFixed()}m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
        : null}
      <footer className="footer">
        <h4>&copy; {new Date().getFullYear()} . All rights reserved.</h4>
      </footer>
    </div>
  );
}

export default App;
