import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import BackButton from "../../components/layout/backButton";
import Loading from "../../components/layout/loading";
import Form from "./form";

const pid = () => {
  const router = useRouter();
  const { pid } = router.query;
  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/players/${pid}`;
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api);
      setPlayerData(result.data);
    };
    fetchData();
  }, []);

  return (
    <section>
      {!playerData ? (
        <Loading></Loading>
      ) : (
        <>
          <div>Editar jogador</div>
          <BackButton></BackButton>
          <Form preloadedValues={playerData} playerId={pid}></Form>
        </>
      )}
    </section>
  );
};

export default pid;
