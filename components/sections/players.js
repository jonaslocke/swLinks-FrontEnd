import React, { useState, useEffect } from "react";
import axios from "axios";

import SubTitle from "../layout/subTitle";
import PlayerCard from "../layout/playerCard";
import AddPlayer from "../layout/addPlayer";

const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/players`;

const players = () => {
  const [playersList, setPlayersList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [opAddPlyer, setOpAddPlyer] = useState(false);
  useEffect(() => {
    const playersList = async () => {
      const result = await axios(api);
      setPlayersList(result.data);
    };
    playersList();
  }, [playersList]);
  return (
    <section>
      <SubTitle title="Jogadores da Trindade"></SubTitle>
      <div className={`optionsMenu ${showMenu ? "show" : ""}`}>
        <i
          className="fas fa-ellipsis-h"
          onClick={() => setShowMenu(!showMenu)}
        ></i>
        <ul>
          <li
            onClick={() => {
              setOpAddPlyer(true);
              setShowMenu(!showMenu);
            }}
          >
            Adicionar jogador
          </li>
        </ul>
      </div>
      <div className={opAddPlyer ? 'show' : ''}><AddPlayer></AddPlayer></div>
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
