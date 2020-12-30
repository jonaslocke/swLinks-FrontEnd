import "../styles/globals.css";
import "../assets/styles/app.scss";
import { useState } from "react";
import Sidebar from "../components/sidebar";

import { UserContext } from "../src/UserContext";

function MyApp({ Component, pageProps }) {
  const [logged, setLogged] = useState(false);
  return (
    <UserContext.Provider
      value={{
        logged,
        setLogged,
      }}
    >
      <Sidebar array={["home", "calculators", "links"]}></Sidebar>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
