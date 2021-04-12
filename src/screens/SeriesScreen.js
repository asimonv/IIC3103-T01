import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import SeasonScreen from "./SeasonScreen";

const SeriesScreen = () => {
  let match = useRouteMatch();
  const { seriesId } = useParams();
  return (
    <Switch>
      <Route path={`${match.path}/season/:seasonId`}>
        <SeasonScreen seriesId={seriesId} />
      </Route>
      <Route path={match.path}>
        <h3>Please select a topic.</h3>
      </Route>
    </Switch>
  );
};

export default SeriesScreen;
