import React, { Component } from "react";
import "../App.scss";

class Madrid extends Component {
  constructor() {
    super();
    this.state = {
      weather: []
    };
  }

  componentDidMount() {
    let woeid = 766273; //Madrid
    fetch(`https://www.metaweather.com/api/location/${woeid}/`, {
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
  }

  render() {
    let Madrid = this.state.weather;
    Madrid = Madrid.slice(0, 3);

    var AvgTemp = [];

    var Floor = Madrid.slice(0, 1).map(weather => {
      Math.floor(weather.max_temp);
    });

    Madrid.map(details => {
      AvgTemp.push(details.min_temp, details.max_temp);
    });

    let result =
      AvgTemp.reduce(function(a, b) {
        return a + b;
      }, 0) / AvgTemp.length;

    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <h2>Madrid</h2>

          <div className="card-body">
            {Madrid.slice(0, 3).map(details => (
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
            <h5>Average Temp of 3 days: {Math.round(result)} </h5>
          </div>
        </div>
      </>
    );
  }
}

export default Madrid;
