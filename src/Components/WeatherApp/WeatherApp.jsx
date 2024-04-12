import React, { useState } from "react";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  let api_key = "af162c12cd849b761474670f7fb1c0e8";

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = data.wind.speed + "km/h";
    temprature[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(snow_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else {
      setWicon(clear_icon);
    }
  };
  return (
    <div className="container w-full h-screen mx-auto mt-75 rounded-lg bg-purple-800">
      <div className="top-bar flex justify-center items-center gap-8 pt-10">
        <input
          type="text"
          className="cityInput flex w-96 h-16 bg-white border-none outline-none rounded-full pl-10 text-gray-600 text-lg font-normal"
          placeholder="Search for city"
        />
        <div
          className="search_icon flex justify-center items-center w-16 h-16 bg-white rounded-full cursor-pointer"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="Search Icon" className="" />
        </div>
      </div>
      <div className="weather-image mt-10 flex justify-center">
        <img src={wicon} alt="Weather Icon" />
      </div>
      <div className="weather-temp flex justify-center text-white text-6xl font-normal">
        24°C
      </div>
      <div className="weather-location flex justify-center text-white text-4xl font-normal">
        London
      </div>
      <div className="data-container mt-10 text-white flex justify-center gap-10">
        <div className="element flex items-center gap-4">
          <img src={humidity_icon} alt="Humidity Icon" className="icons" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text-base font-normal">Humidity</div>
          </div>
        </div>
        <div className="element flex items-center gap-4">
          <img src={wind_icon} alt="Wind Icon" className="icons" />
          <div className="data">
            <div className="wind-rate">18km/h</div>
            <div className="text-base font-normal">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherApp;
