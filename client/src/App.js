import React from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Landing />
    </React.Fragment>
  );
}

export default App;
