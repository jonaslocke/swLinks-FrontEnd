import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddLink = () => {
  const { register, handleSubmit, errors } = useForm();
  const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/links`;
  const [busy, setBusy] = useState(false);
  const [categories, setCategories] = useState(null);

  const onSubmit = (data) => {
    const fecthData = async () => {
      setBusy(true);
      const result = await axios({
        method: "POST",
        url: api,
        data,
      });
      setBusy(false);
    };
    fecthData();
  };

  return (
    <>
      <div className={`addLink${busy ? " loading" : ""}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
