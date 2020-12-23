import { useState } from "react";
import axios from "axios";
import e from "cors";
const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/players`;

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [natFiveOwned, setNatFiveOwned] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [alert, setAlert] = useState("");
  const [busy, setBusy] = useState(false);

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
    }
  };
  return (
    <>
      <div className={`addPlayer${!alert ? "" : " alert"}`}>
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
        <i class="fas fa-times-circle close"></i>
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
