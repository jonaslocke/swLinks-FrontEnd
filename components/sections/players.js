import React, { useState, useEffect } from "react";
import axios from "axios";

import SubTitle from "../layout/subTitle";
import PlayerCard from "../layout/playerCard";
import AddPlayer from "../layout/addPlayer";

import { PlayersContext } from "../../src/PlayersContext";

const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players`;

const players = () => {
  const [playersList, setPlayersList] = useState([]);
  const [actionManagement, setActionManagement] = useState([
    { action: "menu", startAction: false },
    { action: "addPlayer", startAction: false },
  ]);

  const getActionStatus = (action) => {
    const target = actionManagement.find((item) => item.action == action);
    if (!target) return;
    return actionManagement.find((item) => item.action == action).startAction;
  };
  const changeActionStatus = (action) => {
    const target = actionManagement.find((item) => item.action == action);
    if (!target) return;
    actionManagement.splice(actionManagement.indexOf(target), 1);
    setActionManagement([
      ...actionManagement,
      {
        action: target.action,
        startAction: !target.startAction,
      },
    ]);
  };
  const fetchData = async () => {
    const result = await axios(api);
    setPlayersList(result.data);
  };

  useEffect(() => {
    fetchData();
    console.warn("rendered!!!");
  }, []);
  return (
    <PlayersContext.Provider
      value={{
        fetchData,
        getActionStatus,
        changeActionStatus,
      }}
    >
      <section>
        <SubTitle title="Jogadores da Trindade"></SubTitle>
        <div className={`optionsMenu${getActionStatus("menu") ? " show" : ""}`}>
          <i
            className="fas fa-ellipsis-h"
            onClick={() => changeActionStatus("menu")}
          ></i>
          <ul>
            <li onClick={() => changeActionStatus("addPlayer")}>
              Adicionar jogador
            </li>
          </ul>
        </div>
        <AddPlayer></AddPlayer>
        <div className="cards">
          {playersList.map((item, id) => (
            <PlayerCard
              name={item.name}
              natFiveOwned={item.natFiveOwned}
              creationDate={item.creationDate}
              id={item._id}
              key={id}
            ></PlayerCard>
          ))}
        </div>
      </section>
    </PlayersContext.Provider>
  );
};

export default players;
