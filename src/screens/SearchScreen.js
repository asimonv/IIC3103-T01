import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosRequest from "../services/axiosRequest";

const SearchScreen = () => {
  const [characters, setCharacters] = useState();
  const { query } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axiosRequest(`characters?name=${query}`);
      setCharacters(data);
    })();
  }, [query]);

  const renderData = () => {
    return (
      <ul>
        {characters.map(x => (
          <li>
            <Link to={`/character/${x.name.replace(" ", "+")}/`}>{x.name}</Link>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <h4>Results for {query}</h4>
      {characters && renderData()}
    </div>
  );
};

export default SearchScreen;
