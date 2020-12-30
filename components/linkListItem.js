import { useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";

import { LinksContext } from "../src/LinksContext";
import { UserContext } from "../src/UserContext";

const LinkListItem = ({ data }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const { getCategories } = useContext(LinksContext);
  const { logged } = useContext(UserContext);

  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/links/${data._id}`;

  const deleteLink = () => {
    if (confirmDelete) {
      setConfirmDelete(false);
      const fetchData = async () => {
        setBusy(true);
        await axios({
          method: "DELETE",
          url: api,
        });
        setBusy(false);
        getCategories();
      };
      fetchData();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <li className={`link-list-item${busy ? " loading" : ""}`}>
      <Link href={data.url}>
        <a target="_blank">{data.label}</a>
      </Link>

      {logged ? (
        <>
          <i
            className="fas fa-times-circle close"
            onClick={() => setConfirmDelete(true)}
          ></i>
          <div className={`confirmDelete${confirmDelete ? " show" : ""}`}>
            <span>Realmente deletar esse link?</span>
            <button onClick={() => deleteLink()}>sim</button>
            <button onClick={() => setConfirmDelete(false)}>não</button>
          </div>
        </>
      ) : null}
    </li>
  );
};

export default LinkListItem;
