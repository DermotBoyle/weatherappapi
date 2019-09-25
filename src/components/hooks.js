import React, { Component, useState, useEffect } from "react";
import "./App.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";

function Hooks() {
  const [stateDropdown, setDropdown] = useState(false);
  const [url, setUrl] = useState("");
  const [weather, setWeather] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setWeather(result.data.consolidated_weather);
    };
    fetchData();
  }, [url]);

  console.log(weather);

  const result =
    weather !== [] ? null : console.log(weather.map(item => item.id));

  console.log(result);

  /* handleAverageTemp = () => {
    let AvgTemp = [];
    this.state.weather.map(details => {
      AvgTemp.push(details.min_temp, details.max_temp);
    });
    let result =
      AvgTemp.reduce(function(a, b) {
        return a + b;
      }, 0) / AvgTemp.length;

    this.setState({
      AvgTemp: result
    });
  }; */

  /*render() {
    const city = this.state.weather;
    console.log(city);
    const result = this.state.AvgTemp;
*/
  return (
    <div className="container">
      <p>text here!</p>
      <Dropdown
        isOpen={stateDropdown}
        toggle={() => setDropdown(!stateDropdown)}
      >
        <DropdownToggle caret>Cities</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Select a city</DropdownItem>
          <DropdownItem
            onClick={() =>
              setUrl(`https://www.metaweather.com/api/location/615702/`)
            }
          >
            {" "}
            Paris
          </DropdownItem>
          <DropdownItem>London</DropdownItem>
          <DropdownItem>Madrid</DropdownItem>
          <DropdownItem>Berlin</DropdownItem>
          <DropdownItem>Belfast</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div className="card-body">
        {weather === []
          ? weather.map(item => (
              <>
                <img
                  className="imageIcon"
                  src={`https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`}
                ></img>
                <div className="temps">
                  <h5>{console.log(item)}</h5>
                  <h5>Temperature Max: {Math.round(item.max_temp)}</h5>
                  <h5>Temperature Min: {Math.round(item.min_temp)}</h5>
                </div>
              </>
            ))
          : console.log(null)}
      </div>
    </div>
  );
}

export default Hooks;
