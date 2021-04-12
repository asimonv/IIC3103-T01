import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import EpisodeScreen from "./EpisodeScreen";

const EpisodesScreen = () => {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:episodeId`}>
          <EpisodeScreen />
        </Route>
        <Route path={match.path}>
          <h3>Please select an episode.</h3>
        </Route>
      </Switch>
    </div>
  );
};

export default EpisodesScreen;
