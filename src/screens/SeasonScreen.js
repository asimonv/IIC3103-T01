import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import axiosRequest from "../services/axiosRequest";
import EpisodeScreen from "./EpisodeScreen";

const SeasonScreen = ({ seriesId }) => {
  const [episodes, setEpisodes] = useState([]);
  const { seasonId } = useParams();
  let match = useRouteMatch();

  useEffect(() => {
    (async () => {
      const seriesName = seriesId === 0 ? "Breaking+Bad" : "Better+Call+Saul";
      const { data } = await axiosRequest(`episodes?series=${seriesName}`);
      setEpisodes(data.filter(x => x.season === seasonId));
    })();
  }, [seasonId, seriesId]);

  const renderEpisodes = () => (
    <ul>
      {episodes.map(x => (
        <li key={x.episode_id}>
          <Link to={`${match.url}/episode/${x.episode_id}`}>{x.title}</Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      {episodes && renderEpisodes()}
      <Switch>
        <Route path={`${match.path}/episode/:episodeId`}>
          <EpisodeScreen />
        </Route>
      </Switch>
    </div>
  );
};

export default SeasonScreen;
