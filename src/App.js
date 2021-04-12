import { useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const [name, setName] = useState();
  const history = useHistory();
  const handleOnChange = event => {
    const {
      target: { value },
    } = event;
    setName(value);
  };

  const handleOnClick = () => {
    history.push(`/search/${name.replace("", "+")}`);
  };
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <label for="name">Search character</label>
          <input
            type="text"
            name="name"
            onChange={handleOnChange}
            value={name}
          ></input>
          <button onClick={handleOnClick}>Search</button>
        </nav>

        <HomeScreen />
      </div>
    </Router>
  );
}

export default App;
