import { useState } from "react";

const OptionsMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={`optionsMenu ${showMenu ? "show" : ""}`}>
      <i
        className="fas fa-ellipsis-h"
        onClick={() => setShowMenu(!showMenu)}
      ></i>
      <ul>
        <li>Adicionar jogador</li>
      </ul>
    </div>
  );
};

export default OptionsMenu;
