import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const LinkListItem = ({ data }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);

  const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/links/${data.linkId}`;

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
        <a>{data.label}</a>
      </Link>
      <i
        className="fas fa-times-circle close"
        onClick={() => setConfirmDelete(true)}
      ></i>
      <div className={`confirmDelete${confirmDelete ? " show" : ""}`}>
        <span>Realmente deletar esse link?</span>
        <button onClick={() => deleteLink()}>sim</button>
        <button onClick={() => setConfirmDelete(false)}>não</button>
      </div>
    </li>
  );
};

export default LinkListItem;
