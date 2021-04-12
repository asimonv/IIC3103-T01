import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosRequest from "../services/axiosRequest";

const CharacterScreen = () => {
  const [character, setCharacter] = useState();
  const [quotes, setQuotes] = useState();
  const { characterName } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axiosRequest(`characters?name=${characterName}`);
      setCharacter(data[0]);
      const { data: quotes } = await axiosRequest(
        `quote?author=${characterName}`
      );
      setQuotes(quotes);
    })();
  }, [characterName]);

  const renderData = () => {
    const {
      img,
      name,
      nickname,
      portrayed,
      status,
      occupation,
      category,
      appearance,
      better_call_saul_appearance: bcsAppearance,
    } = character;

    return (
      <div>
        <img height={150} width={150} src={img} alt={`${nickname} img`} />
        <h5>Name: {name}</h5>
        <h5>Nickname: {nickname}</h5>
        <h5>portrayed: {portrayed}</h5>
        <h5>status: {status}</h5>
        <h5>category: {category}</h5>
        <h5>occupation: {occupation}</h5>
        <h5>Breaking Bad appearences</h5>
        {appearance &&
          appearance.map(x => (
            <li key={`bb-${x}`}>
              <Link to={`/series/0/season/${x}`}>{x}</Link>
            </li>
          ))}
        <h5>Better Call Saul appearences</h5>
        {bcsAppearance &&
          bcsAppearance.map(x => (
            <li key={`bcs-${x}}`}>
              <Link to={`/series/1/season/${x}`}>{x}</Link>
            </li>
          ))}
        <h5>Quotes</h5>
        {quotes && quotes.map(x => <li key={x.quote_id}>{x.quote}</li>)}
      </div>
    );
  };
  return <div>{character && renderData()}</div>;
};

export default CharacterScreen;
