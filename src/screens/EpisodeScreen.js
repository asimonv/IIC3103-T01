import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosRequest from "../services/axiosRequest";

const EpisodeScreen = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axiosRequest(`episodes/${episodeId}`);
      setEpisode(data[0]);
    })();
  }, [episodeId]);

  const renderData = () => {
    const {
      title,
      season,
      episode: episodeNumber,
      air_date: airDate,
      characters,
      series,
    } = episode;
    return (
      <div>
        <h1>{`S${season}E${episodeNumber} - ${title}`}</h1>
        <h4>{`Air date: ${airDate}`}</h4>
        <h4>Series: {series}</h4>
        {characters && (
          <ul>
            {characters.map(x => (
              <li key={x}>
                <Link to={`/character/${x.replace(" ", "+")}`}>{x}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  return <div>{episode && renderData()}</div>;
};

export default EpisodeScreen;
