import { useState } from "react";
import "./index.css";
import night from "./assets/night.svg";
import light from "./assets/light.svg";
import wind from "./assets/wind_icon.svg";
import direction from "./assets/arrow.png";
import humidity from "./assets/humidity.svg";
import pressure from "./assets/pressure.svg";
import { AnimatePresence, motion } from "framer-motion";
import searchIcon from "./assets/search.svg";

const api = {
  key: "9ebd222b1147219970a793e3f797b221",
  baseUrl: "http://api.openweathermap.org/data/2.5/",
  iconUrl: "http://openweathermap.org/img/w/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState();
  const floor = (arg) => Math.floor(arg);

  const fetchFn = () => {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
      });
  };

  const search = (event) => {
    if (event.key === "Enter") {
      fetchFn();
    }
  };

  const getterIcon = (arg) => {
    return `${api.iconUrl}${arg}.png`;
  };

  const bgColorChooser = (currentTemp) => {
    if (currentTemp >= 20 && currentTemp < 28) {
      return `bg_cold_1`;
    } else if (currentTemp >= 15 && currentTemp < 20) {
      return `bg_cold_2`;
    } else if (currentTemp >= 10 && currentTemp < 15) {
      return `bg_cold_3`;
    } else if (currentTemp >= 5 && currentTemp < 10) {
      return `bg_cold_4`;
    } else if (currentTemp >= 0 && currentTemp < 5) {
      return `bg_cold_5`;
    } else if (currentTemp < 0) {
      return `bg_cold_6`;
    } else if (currentTemp >= 28) {
      return `bg_hot_1`;
    } else {
      return ``;
    }
  };

  const dataBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "Mary",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minut = d.getMinutes();

    return `${hour}:${minut} ${day} ${date} ${month} ${year} `;
  };

  return (
    <div
      className={`container ${bgColorChooser(
        weather?.main?.temp,
        weather?.clouds?.all,
        weather?.main?.humidity
      )}`}
    >
      <AnimatePresence>
        <motion.div
          className="headerText"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span></span>
          <p>weather app</p>
        </motion.div>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          id="input"
        >
          <input
            autoFocus
            type="text"
            name=""
            placeholder="Where you wanna know"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <img
            onClick={() => fetchFn()}
            className="searchIcon"
            src={searchIcon}
            alt=""
          />
        </motion.div>
      </AnimatePresence>
      {weather?.message != "city not found" ? (
        <>
          {typeof weather != "undefined" ? (
            <section className="location_box">
              <AnimatePresence>
                <motion.section
                  key={weather.name}
                  initial={{ y: -15 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="location_title"
                >
                  <h3 className="location_name">{weather?.name} </h3>

                  {weather?.sys?.country ? <span>-</span> : <span></span>}
                  <h1 className="location_country">{weather?.sys?.country}</h1>
                </motion.section>
              </AnimatePresence>
              <section className="current_time">
                <AnimatePresence>
                  <motion.h1
                    key={weather.name}
                    initial={{ y: -15 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {dataBuilder(new Date())}
                  </motion.h1>
                </AnimatePresence>
              </section>
              <section className="temp_box">
                <AnimatePresence>
                  <motion.div
                    key={weather.name}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="night"
                  >
                    <img className="night_temp_icon" src={night} alt="???" />
                    <h1 className="night_temp">
                      {weather?.main?.temp_min
                        ? `${floor(weather?.main?.temp_min)}°C`
                        : "--"}
                    </h1>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                  <motion.div
                    key={weather.name}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                    className="current"
                  >
                    <img
                      className="temp_icon"
                      src={getterIcon(weather?.weather?.[0].icon)}
                    />
                    <h1 className="temp">
                      {weather?.main?.temp
                        ? `${floor(weather?.main?.temp)}°C`
                        : "--"}
                    </h1>
                    <span className="temp_status">
                      {weather?.weather?.[0]?.main}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                  <motion.div
                    key={weather.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="light"
                  >
                    <img className="light_temp_icon" src={light} alt="" />
                    <h1 className="light_temp">
                      {weather?.main?.temp_max
                        ? `${floor(weather?.main?.temp_max)}°C`
                        : "--"}
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </section>
              <AnimatePresence>
                <motion.section
                  key={weather.name}
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="wind_box"
                >
                  <div className="humidity">
                    <img src={humidity} alt="" />
                    <span>{weather?.main?.humidity}%</span>
                  </div>
                  <div className="pressure">
                    <img src={pressure} alt="" />
                    <span>{Math.floor(weather?.main?.pressure / 10)}%</span>
                  </div>

                  <div className="shamol">
                    <img src={wind} alt="" />
                    <span>{floor(weather?.wind?.speed)} km/h</span>

                    <img
                      className="direction"
                      src={direction}
                      alt=""
                      style={{ transform: `rotate(${weather?.wind?.deg}deg)` }}
                    />
                  </div>
                </motion.section>
              </AnimatePresence>
            </section>
          ) : (
            ""
          )}
        </>
      ) : (
        <AnimatePresence>
          <motion.section
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            className="notFound"
          >
            City not found
          </motion.section>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
