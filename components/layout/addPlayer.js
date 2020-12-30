import { useState, useContext } from "react";
import axios from "axios";
const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players`;

import { PlayersContext } from "../../src/PlayersContext";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [natFiveOwned, setNatFiveOwned] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [alert, setAlert] = useState("");
  const [busy, setBusy] = useState(false);

  const { fetchData, getActionStatus, changeActionStatus } = useContext(PlayersContext);

  const addPlayer = async () => {
    if (!name || !natFiveOwned || !creationDate) {
      setAlert("Preencha todos os campos");
    } else {
      setBusy(true);
      const hit = await axios({
        method: "post",
        url: api,
        data: {
          name: name || null,
          natFiveOwned: natFiveOwned || null,
          creationDate: creationDate || null,
        },
      });
      setName("");
      setNatFiveOwned("");
      setCreationDate("");
      setBusy(false);
      fetchData();
    }
  };
  return (
    <>
      <div
        className={`addPlayer${!alert ? "" : " alert"}${
          getActionStatus("addPlayer") ? " show" : ""
        }`}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputs">
            <div>
              <label>nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={busy}
              />
            </div>
            <div>
              <label># Nat5</label>
              <input
                type="text"
                value={natFiveOwned}
                onChange={(e) => setNatFiveOwned(e.target.value)}
                disabled={busy}
              />
            </div>
            <div>
              <label>criação da conta</label>
              <input
                type="date"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                disabled={busy}
              />
            </div>
          </div>

          <button onClick={() => addPlayer()} disabled={busy}>
            {busy ? "carregando..." : "criar!"}
          </button>
        </form>
        <i
          className="fas fa-times-circle close"
          onClick={() => changeActionStatus("addPlayer")}
        ></i>
      </div>
      <div
        className="alertLabel"
        onClick={() => {
          setAlert("");
        }}
      >
        {alert}
      </div>
    </>
  );
};

export default AddPlayer;
