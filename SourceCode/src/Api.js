
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Map from "./Map";



function Api() {






  const [CityName, setName] = useState('Amman');
  const [content, setContent] = useState([]);
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 32.0392,
      lng: 35.7272
    },
    zoom: 6
  })








  // useEffect(() => {
  const getData = (e) => {
    e.preventDefault();

    // var api_url_map = `http://api.positionstack.com/v1/forward?query=${CityName}&access_key=84234e0c37d3cb0dca4fd9f32a839be1`;
    var api_url_weather = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;



    axios.get(api_url_weather)
      .then((response) => {
        setContent(response.data);
        console.log(response);
        var iconWether = response.data['weather'][0]['icon'];
        document.getElementById('Icon').src = "http://openweathermap.org/img/wn/" + iconWether + "@2x.png";

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        document.getElementById('ToDate').innerHTML = date;
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        document.getElementById("Day-Now").innerHTML = days[today.getDay()];


        setDefaultProps({
          center: {
            lat: response.data.coord.lat,
            lng: response.data.coord.lon
          },
          zoom: 11
        })

        document.getElementById('error').innerHTML = '';
      })

      .catch(() => document.getElementById('error').innerHTML = "Can't find this location");
    // }, [CityName]);
  }

  return (
    <div className="all">
              
      <div className="container">
        <div className="weather-side">
          <div className="weather-gradient" />
          <Map defaultProps={defaultProps} />
        </div>
        <div className="info-side">

          {/* searche  section ********** */}
          <div className="location-container">
          <div className="alertx" id="error"></div>
            <div id="LocButton" className="location-button"> <i data-feather="map-pin" />
              {/* *********************************************** */}
              <form onSubmit={getData} className="input-group formcenter">
                <input onChange={(e) => setName(e.target.value)} placeholder="Searche the map" type="text" className="searcheBox" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-dark" type="submit" id="button-addon2">Go</button>
              </form>
              {/* *********************************************** */}
            </div>
          </div>



          {/* weather section ********** */}
          <div className="week-container">
            <ul className="week-list">
              <li className="active"><i className="day-icon" data-feather="sun" /><span className="day-name" />
                <div className="humidity"> <span className="title">HUMIDITY</span>    <br />
                  <div className="value" id="humi" ><br />
                    {content.main ? <p className='bold'>{content.main.humidity}%</p> : null}
                  </div>
                  <br />
                </div>
              </li>
              <li><i className="day-icon" data-feather="cloud" /><span className="day-name" />
                <div className="wind"> <span className="title">WIND</span>    <br />
                  <div className="value" id="wSpeed" ><br />
                    {content.main ? <p className='bold'>{content.wind.speed / 0.8689762.toFixed()} MPH</p> : null}
                  </div>
                  <br />
                </div>
              </li>
              <li><i className="day-icon" data-feather="cloud-snow" /><span className="day-name" />
                <div className="precipitation"> <span className="title">PRECIPITATION  </span>    <br />
                  <div className="value"><br />
                    {content.main ? <p className='bold'>{content.clouds.all}%</p> : null}
                  </div>
                  <br />
                </div>
              </li>

              <div className="clear" />
            </ul>
          </div>


          <div className="date-container">
            {/* Date *********  and  locationName ********** */}
            <h2 id="Day-Now" className="date-dayname">{ }</h2><span className="date-day" id="ToDate">-- -- ----</span><i className="location-icon" data-feather="map-pin" /><span className="location" id="ContryName">{content.name}</span>
          </div>


          {/* Wether Describtion ********** */}
          <div className="weather-container">
            <img src id="Icon" className="weather-icon" alt="" />
            {content.main ? <h1 id="WeatherTemp" className="weather-temp">{Math.round(content.main.temp)} °C</h1> : null}
            {content.main ? <h3 id="WetherDescription" className="weather-desc">{content.weather[0].description}</h3> : null}

          </div>






        </div>
      </div>

    </div>
  );

}

export default Api