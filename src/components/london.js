import React, { Component } from "react";
import "../App.scss";

class London extends Component {
  constructor() {
    super();
    this.state = {
      weather: []
    };
  }

  componentDidMount() {
    const woeid = 44418;
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
    let London = this.state.weather;
    London = London.slice(0, 3);

    var AvgTemp = [];

    London.map(details => {
      AvgTemp.push(details.min_temp, details.max_temp);
    });

    let result =
      AvgTemp.reduce(function(a, b) {
        return a + b;
      }, 0) / AvgTemp.length;

    return (
      <>
        <div className="card">
          <h2>London</h2>

          <div className="card-body">
            {London.slice(0, 3).map(details => (
              <>
                <img
                  className="imageIcon"
                  src={`https://www.metaweather.com/static/img/weather/${details.weather_state_abbr}.svg`}
                ></img>
                <div className="temps">
                  <h5>{details.applicable_date}</h5>
                  <h5>Temperature Max: {Math.floor(details.max_temp)}</h5>
                  <h5>Temperature Min: {Math.floor(details.min_temp)}</h5>
                </div>
              </>
            ))}
            <h5>Average Temp of 3 days: {Math.floor(result)} </h5>
          </div>
        </div>
      </>
    );
  }
}

export default London;
