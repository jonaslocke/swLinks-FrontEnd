import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { UserContext } from "../src/UserContext";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/login`;
  //   const [logged, setLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [busy, setBusy] = useState(false);
  const [triedLogin, setTriedLogin] = useState(false);
  const { logged, setLogged } = useContext(UserContext);

  const onSubmit = (data) => {
    const fecthData = async () => {
      setBusy(true);
      const result = await axios({
        method: "POST",
        url: api,
        data,
      });
      setBusy(false);
      if (result.data.logged) {
        localStorage.setItem("logged", result.data.logged);
        localStorage.setItem("user", result.data.user);
        setLogged(true);
        setShowLogin(false);
      } else {
        setTriedLogin(true);
      }
    };
    fecthData();
    clearForm();
    setTimeout(() => {
      setTriedLogin(false);
    }, 3000);
  };

  const clearForm = () => {
    return document
      .querySelectorAll(".input-text")
      .forEach((item) => (item.value = ""));
  };

  const logout = () => {
    localStorage.clear();
    clearForm();
    setLogged(false);
  };

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      setUser({ logged: true, user: localStorage.getItem("user") });
      setLogged(true);
    }
  }, [logged]);
  return (
    <>
      <div className={`login${showLogin ? " show" : ""}`}>
        {logged ? (
          <div className="doLogin">
            <span>{`logado como ${user.user}`}</span>
            <i
              className="fas fa-times-circle close"
              onClick={() => logout()}
            ></i>
          </div>
        ) : (
          <div className="doLogin" onClick={() => setShowLogin(!showLogin)}>
            clique pra logar
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={busy ? "loading" : ""}
        >
          <i
            className="fas fa-times-circle close"
            onClick={() => setShowLogin(false)}
          ></i>
          <div className="inputs">
            <div>
              <label>Login</label>
              <input
                disabled={busy}
                name="login"
                id="login"
                ref={register({ required: true })}
                type="text"
                className="input-text"
              />
            </div>
            <div>
              <label>Senha</label>
              <input
                disabled={busy}
                name="password"
                id="password"
                ref={register({ required: true })}
                type="password"
                className="input-text"
              />
            </div>
            <div>
              <input disabled={busy} type="submit" value="Logar!" />
            </div>
            <div className={`failed-login${triedLogin ? " show" : ""}`}>
              algo deu errado, tente de novo
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
