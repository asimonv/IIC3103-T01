import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import axiosRequest from "../services/axiosRequest";
import CharacterScreen from "./CharacterScreen";
import SearchScreen from "./SearchScreen";
import SeriesScreen from "./SeriesScreen";

const HomeScreen = () => {
  const [bcsData, setBcsData] = useState();
  const [bbData, setBbData] = useState();
  const [name, setName] = useState();
  const history = useHistory();
  const handleOnChange = event => {
    const {
      target: { value },
    } = event;
    setName(value);
  };

  const handleOnClick = () => {
    history.push(`/search/${name.replace(" ", "+")}`);
  };
  useEffect(() => {
    (async () => {
      const { data } = await axiosRequest(`episodes`);
      const groupedBySeries = _.groupBy(data, "series");
      const breakingBadData = groupedBySeries["Breaking Bad"];
      const bcsData = groupedBySeries["Better Call Saul"];

      const bbGrouped = _(breakingBadData)
        .groupBy(x => x.season)
        .map((value, key) => ({
          season: key,
          data: value,
          seasonName: value[0].series,
        }))
        .value();

      const bcsGrouped = _(bcsData)
        .groupBy(x => x.season)
        .map((value, key) => ({
          season: key,
          data: value,
          seasonName: value[0].series,
        }))
        .value();

      setBbData(bbGrouped);
      setBcsData(bcsGrouped);
    })();
  }, []);

  const renderData = (data, id) => (
    <ul>
      {data.map(x => (
        <li key={`${id}-${x.season}`}>
          <Link to={`/series/${id}/season/${x.season}`}>{x.season}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <label for="name">Search character</label>
      <input
        type="text"
        name="name"
        onChange={handleOnChange}
        value={name}
      ></input>
      <button onClick={handleOnClick}>Search</button>
      <h3>Breaking Bad seasons</h3>
      {bbData && renderData(bbData, 0)}
      <h3>Better Call Saul seasons</h3>
      {bcsData && renderData(bcsData, 1)}

      <Switch>
        <Route path="/series/:seriesId">
          <SeriesScreen />
        </Route>
        <Route path="/character/:characterName">
          <CharacterScreen />
        </Route>
        <Route path="/search/:query">
          <SearchScreen />
        </Route>
      </Switch>
    </div>
  );
};

export default HomeScreen;
