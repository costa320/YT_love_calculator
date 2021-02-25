import React, { Component } from "react";
import axios from "axios";
/* Styles */
import "../assets/styles/main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    // Non chiamre this.setState() qui!
    this.state = {
      hisName: "",
      herName: "",
      result: null,
    };
  }

  SetState(state, value) {
    this.setState({ [state]: value }, () => {
      /* console.log(this.state.herName, this.state.hisName); */
    });
  }

  CalculateLove = () => {
    let s = this.state;
    var options = {
      method: "GET",
      url: "https://love-calculator.p.rapidapi.com/getPercentage",
      params: { fname: s.hisName, sname: s.herName },
      headers: {
        "x-rapidapi-key": "d7a554ec82msh964bfb0ade3d5e6p187171jsn31037980a840",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
      },
    };
    let self = this;
    axios
      .request(options)
      .then(function (response) {
        let data = response.data;
        self.SetState("result", data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  render() {
    let s = this.state;
    return (
      <div>
        <div className="App-logo mb-5 pb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="250"
            viewBox="0 0 24 24"
            fill="red"
          >
            <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
          </svg>
        </div>

        <div className="container mt-5 pt-5">
          <div className="row d-flex">
            <div className="col">
              <div className="input-group flex-nowrap">
                <input
                  onChange={(e) => this.SetState("hisName", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="His name"
                  aria-label="His name"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <div className="col">
              <input
                onChange={(e) => this.SetState("herName", e.target.value)}
                type="text"
                className="form-control"
                placeholder="Her name"
                aria-label="Her name"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <button
                onClick={this.CalculateLove}
                type="button"
                className="btn btn-danger"
              >
                Calculate
              </button>
            </div>
          </div>
          <div className="row mt-5" style={{ display: s.result ? "" : "none" }}>
            <div className="col">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: s.result ? s.result.percentage + "%" : "0" }}
                  aria-valuenow={s.result ? s.result.percentage : ""}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {s.result ? s.result.percentage + "%" : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
