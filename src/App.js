import { useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <HomeScreen />
      </div>
    </Router>
  );
}

export default App;
