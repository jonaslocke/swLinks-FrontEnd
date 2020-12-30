import { useState, useEffect, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { LinksContext } from "../src/LinksContext";

const AddLink = () => {
  const { register, handleSubmit, errors } = useForm();
  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/links`;
  const [busy, setBusy] = useState(false);
  const { getCategories } = useContext(LinksContext);
  const formEl = useRef();

  const onSubmit = (data) => {
    const fecthData = async () => {
      setBusy(true);
      const result = await axios({
        method: "POST",
        url: api,
        data,
      });
      setBusy(false);
      getCategories();
    };
    fecthData();
    formEl.current.reset();
  };

  return (
    <>
      <div className={`addLink${busy ? " loading" : ""}`}>
        <form ref={formEl} onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div>
              <label>Rótulo</label>
              <input
                name="label"
                id="label"
                ref={register({ required: true })}
                type="text"
              />
            </div>
            <div>
              <label>URL</label>
              <input
                name="url"
                id="url"
                ref={register({ required: true })}
                type="url"
              />
            </div>
            <div>
              <label>Categoria</label>
              <input
                name="category"
                id="category"
                ref={register({ required: true })}
                type="text"
              />
            </div>
          </div>

          <button>criar!</button>
        </form>
      </div>
    </>
  );
};

export default AddLink;
