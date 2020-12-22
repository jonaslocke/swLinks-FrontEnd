import React, { useState, useEffect } from "react";

import Sidebar from "../components/sidebar";
import Players from "../components/sections/players";
import Calculators from "../components/sections/calculators";
import Links from "../components/sections/links";

export default function Home() {
  const [section, setSection] = useState(1);
  const getSection = () => {
    switch (section) {
      case 1: return <Players></Players>;
      case 2: return <Calculators></Calculators>;
      case 3: return <Links></Links>;
      default: <Players></Players>;
    }
  };
  return (
    <>
      <Sidebar section={section} setSection={setSection}></Sidebar>
      <div className="content">{getSection()}</div>
    </>
  );
}
