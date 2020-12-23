import Image from "next/image";
import { useState } from "react";

const axios = require("axios");

const PlayerCard = ({ name, natFiveOwned, creationDate, id }) => {
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const getAccountAge = () => {
    let date1 = new Date(creationDate);
    let date2 = new Date();

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.floor(Difference_In_Days);
  };
  const getNat5PerDay = () => {
    return (natFiveOwned / getAccountAge()).toFixed(6);
  };
  const deletePlayer = async () => {
    if (confirmDelete) {
      setBusy(true);
      const hit = await axios({
        method: "delete",
        url: `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/players/${id}`,
      });
      setBusy(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div
      className={`playerCard${confirmDelete ? " confirmDelete" : ""}${
        busy ? " loading" : ""
      }`}
    >
      <div className="collumn left">
        <h3>{name}</h3>
        <Image
          src="/portaitDefault.jpg"
          alt="avatar"
          height="64px"
          width="64px"
        />
      </div>
      <div className="collumn right">
        <div className="line">{natFiveOwned} NAT 5!</div>
        <div className="line">Joga à {getAccountAge()} dias</div>
        <div className="line">Média de {getNat5PerDay()}</div>
        <div className="line">NAT 5 por dia!</div>
      </div>
      <div className="top-right">
        Criada em: <span>{new Date(creationDate).toLocaleDateString()}</span>
      </div>
      <i
        className="fas fa-times-circle close"
        onClick={() => deletePlayer()}
      ></i>
      <div className="dichotomy">
        <div>Realmente deseja deletar esse jogador?</div>
        <div>
          <button
            className="confirm"
            onClick={() => {
              setConfirmDelete(true);
              deletePlayer();
            }}
          >
            Sim
          </button>
          <button
            className="cancel"
            onClick={() => {
              setConfirmDelete(false);
            }}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
