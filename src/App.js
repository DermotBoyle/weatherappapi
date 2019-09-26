import React, { Component } from "react";
import "./App.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

class WeatherWaavi extends Component {
  constructor() {
    super();
    this.state = {
      Dropdown: false,
      weather: [],
      city: "",
      AvgTemp: "",
      sortedNums: [],
      sortedNumsDown: []
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  handleFetch = (value, city) => {
    this.setState({
      city: city
    });
    console.log(value);
    fetch(`https://www.metaweather.com/api/location/${value}/`, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          weather: data.consolidated_weather
        })
      );
  };

  handleAverageTemp = () => {
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
  };

  handleSortAsc = () => {
    let Asc = [];
    this.state.weather.map(details => {
      Asc.push(details.max_temp);
    });
    let result = Asc.sort((a, b) => a - b);
    this.setState({
      sortedNums: result
    });
  };

  handleSortDesc = () => {
    let Asc = [];
    this.state.weather.map(details => {
      Asc.push(details.max_temp);
    });
    let result = Asc.sort((a, b) => b - a);
    this.setState({
      sortedNumsDown: result
    });
  };

  handleFilterClima = type => {
    const newArr = [...this.state.weather];
    var result = newArr.filter(obj => {
      return obj.weather_state_abbr === type;
    });
    this.setState({
      weather: result
    });
  };

  render() {
    const city = this.state.weather;
    const result = this.state.AvgTemp;
    const sortedNums = this.state.sortedNums;
    const sortedNumsDown = this.state.sortedNumsDown;
    console.log(city);
    return (
      <>
        <h1 style={{ textAlign: "center", paddingTop: "3rem" }}>Weather app</h1>
        <div className="container">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>Cities</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select a city</DropdownItem>
              <DropdownItem
                key={615702}
                city={"Paris"}
                onClick={() => this.handleFetch(615702, "Paris")}
              >
                Paris
              </DropdownItem>
              <DropdownItem
                value={44418}
                onClick={() => this.handleFetch(44418, "London")}
              >
                London
              </DropdownItem>
              <DropdownItem
                key={766273}
                onClick={() => this.handleFetch(766273, "Madrid")}
              >
                Madrid
              </DropdownItem>
              <DropdownItem
                key={638242}
                onClick={() => this.handleFetch(638242, "Berlin")}
              >
                Berlin
              </DropdownItem>
              <DropdownItem key={44544} onClick={() => this.handleFetch(44544)}>
                Belfast
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="sortBTN">
            <Button onClick={this.handleSortAsc} style={{ height: "3rem" }}>
              Sort Asc.
            </Button>
            <Button onClick={this.handleSortDesc} style={{ height: "3rem" }}>
              Sort Desc.
            </Button>
          </div>
          <div style={{ width: "min-content" }}>
            <Button onClick={() => this.handleFilterClima("c")}>
              Filter Clear days!
            </Button>
            <Button onClick={() => this.handleFilterClima("lr")}>
              Filter Light Rain days!
            </Button>
            <Button onClick={() => this.handleFilterClima("hr")}>
              filter Heavy Rain days!
            </Button>
            <Button onClick={() => this.handleFilterClima("s")}>
              filter days with showers!
            </Button>
            <Button onClick={() => this.handleFilterClima("lc")}>
              filter days with light cloud!
            </Button>
          </div>
          {/* <London />
          <Madrid />
          <Berlin /> */}
          <div
            className="card"
            style={{ width: "18rem", width: "max-content" }}
          >
            <h2>{this.state.city}</h2>

            <div className="card-body">
              {city.slice(0, 3).map(details => (
                <>
                  <img
                    className="imageIcon"
                    src={`https://www.metaweather.com/static/img/weather/${details.weather_state_abbr}.svg`}
                  ></img>
                  <div className="temps">
                    <h5>{details.applicable_date}</h5>
                    <h5>Temperature Max: {Math.round(details.max_temp)}</h5>
                    <h5>Temperature Min: {Math.round(details.min_temp)}</h5>
                  </div>
                </>
              ))}
              {/* <h5>Average Temp of 3 days: {Math.round(result)} </h5> */}
              {result ? (
                <Button className="avgBTN" onClick={this.handleAverageTemp}>
                  Average Temp : {Math.round(result)}{" "}
                </Button>
              ) : (
                <Button
                  className="avgBTN"
                  style={{ width: "auto" }}
                  onClick={this.handleAverageTemp}
                >
                  {" "}
                  Click here for Average Temperature
                </Button>
              )}
            </div>
          </div>
          <div style={{ display: "block", padding: "0 1rem" }}>
            <h5>ascending</h5>
            {sortedNums.map(num => (
              <p>Max-Temp :{Math.round(num)}</p>
            ))}
          </div>
          <div style={{ display: "block", padding: "0 1rem" }}>
            <h5>descending</h5>
            {sortedNumsDown.map(num => (
              <p>Max-Temp :{Math.round(num)}</p>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default WeatherWaavi;
