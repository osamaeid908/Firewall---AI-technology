import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = `https://5cltihqao9.execute-api.eu-west-1.amazonaws.com/dev/check_url?url=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        if (jsonData.message.includes("phishing")) {
          this.setState({ result: "phishing" });
        }else {
          this.setState({ result: "safe" });
        }
      });
  };

  render() {
    return (
      <div id="main">
        <h1>find-my-Phish</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.result ? (
          <div id="result-container">
            <div id="result-wrapper">
              {this.state.result === "phishing" ? (
                <div id="result-phishing">
                  <p>Phishing Site Found</p>
                </div>
              ) : (
                <div id="result-safe">
                  <p>Seems to be a Safe Site</p>
                </div>  
              )}
            </div>
          </div>
        ) : (
          <p>Try searching for a URL</p>
        )}
      </div>
    );
  }
}

export default Search;
