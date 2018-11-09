import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Projects from "./components/projects";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/projects")
      .then(res => this.setState({ projects: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.projects);
    return (
      <div>
        <h2>Projects</h2>
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
