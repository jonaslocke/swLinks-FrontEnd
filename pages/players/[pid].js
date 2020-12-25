import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import SubTitle from "../../components/layout/subTitle";
import BackButton from "../../components/layout/backButton";
import Loading from "../../components/layout/loading";
import Form from "./form";

const pid = () => {
  const router = useRouter();
  const { pid } = router.query;
  const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/players/${pid}`;
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
          <SubTitle title={"Editar jogador"}></SubTitle>
          <BackButton></BackButton>
          <Form preloadedValues={playerData} playerId={pid}></Form>
        </>
      )}
    </section>
  );
};

export default pid;
