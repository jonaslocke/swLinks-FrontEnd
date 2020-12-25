import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import Loading from "../../components/layout/loading";

const Form = ({ preloadedValues, playerId }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: preloadedValues,
  });
  const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/players/${playerId}`;
  const [busy, setBusy] = useState(false);
  const [updated, setUpdated] = useState(false);

  const onSubmit = (data) => {
    const fecthData = async () => {
      setBusy(true);
      const result = await axios({
        method: "PATCH",
        url: api,
        data,
      });
      setBusy(false);
      setUpdated(true);
    };
    fecthData();
  };

  return (
    <>
      <form
        className={`edit-player${busy ? " loading" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="collumn avatar">
          <h1>{preloadedValues.name}</h1>
          <div className="avatar-input-group">
            <Image
              src="/portaitDefault.jpg"
              alt="avatar"
              height="110px"
              width="110px"
            />
            <label htmlFor="avatar">
              <i className="fas fa-edit"></i>
            </label>
            <input type="hidden" name="avatar" id="avatar" />
            <div className="ring"></div>
          </div>
        </div>
        <div className="collumn inputs">
          <div className="input-group">
            <label htmlFor="name">nome</label>
            <input
              className={errors.name ? "error" : ""}
              name="name"
              id="name"
              ref={register({ required: true })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="natFiveOwned"># NAT5!</label>
            <input
              className={errors.natFiveOwned ? "error" : ""}
              name="natFiveOwned"
              id="natFiveOwned"
              ref={register({ required: true })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="creationDate">data de criação</label>
            <input
              className={errors.creationDate ? "error" : ""}
              name="creationDate"
              id="creationDate"
              ref={register({ required: true })}
            />
          </div>
          <input
            type="submit"
            disabled={busy}
            value={busy ? "Carregando..." : "Atualizar"}
          />
        </div>
        <Loading></Loading>
      </form>
      <div className={`updatedMessage${updated ? " show" : ""}`}>
        Atualizado com sucesso!
      </div>
    </>
  );
};

export default Form;
