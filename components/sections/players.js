import React, { useState, useEffect } from "react";
import axios from "axios";

import SubTitle from "../layout/subTitle";
import PlayerCard from "../layout/playerCard";
import OptionsMenu from "../layout/optionsMenu";

const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/players`;

const players = () => {
  const [playersList, setPlayersList] = useState([]);
  useEffect(() => {
    const playersList = async () => {
      const result = await axios(api);
      setPlayersList(result.data);
    };
    playersList();
  }, []);
  return (
    <section>
      <SubTitle title="Jogadores da Trindade"></SubTitle>
      <OptionsMenu options={[1,2,3]}></OptionsMenu>
      <div className="cards">
        {playersList.map((item, id) => (
          <PlayerCard
            name={item.name}
            natFiveOwned={item.natFiveOwned}
            creationDate={item.creationDate}
            key={id}
          ></PlayerCard>
        ))}
      </div>
    </section>
  );
};

export default players;
