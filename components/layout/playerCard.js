import Image from "next/image";
import NatFiveIcon from "../layout/natFiveIcon";

const PlayerCard = ({ name, natFiveOwned, creationDate }) => {
  const getAccountAge = () => {
    let date1 = new Date(creationDate);
    let date2 = new Date();

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.floor(Difference_In_Days);
  };

  const getNat5PerDay = () => {
    return (natFiveOwned / getAccountAge()).toFixed(6);
  };

  return (
    <div className="playerCard">
      <div className="collumn left">
        <h3>{name}</h3>
        <Image
          src="/portaitDefault.jpg"
          alt="avatar"
          height="64px"
          width="64px"
        />
      </div>
      <div className="collumn right">
        <div className="line">{natFiveOwned} NAT 5!</div>
        <div className="line">Joga à {getAccountAge()} dias</div>
        <div className="line">Média de {getNat5PerDay()}</div>
        <div className="line">NAT 5 por dia!</div>
      </div>
      <div className="top-right">
        Criada em: <span>{new Date(creationDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
