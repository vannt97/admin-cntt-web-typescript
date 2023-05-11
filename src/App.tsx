import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./pages/Header";

function App() {
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((result) => {
        console.log(process.env);
        // console.log("result: ", result);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Header />
    </div>
  );
}

export default App;
