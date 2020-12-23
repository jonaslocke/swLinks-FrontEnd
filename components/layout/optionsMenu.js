import { useState, useEffect } from "react";

const optionsMenu = ({ options, section, setSection }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={`optionsMenu ${showMenu ? "show" : ""}`}>
      <i
        className="fas fa-ellipsis-h"
        onClick={() => setShowMenu(!showMenu)}
      ></i>
      <ul>
        {options.map((item, id) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default optionsMenu;
