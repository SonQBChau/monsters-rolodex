import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    //use a CORS proxy to get around “No Access-Control-Allow-Origin header” problems
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(proxyurl + url)
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
