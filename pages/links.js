import { useState, useEffect } from "react";
import SubTitle from "../components/layout/subTitle";
import Loading from "../components/layout/loading";
import axios from "axios";
import Link from "next/link";
import LinkListItem from "../components/linkListItem";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categories, setCategories] = useState([]);

  const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/links`;

  const deleteLink = (linkId) => {
    if (confirmDelete) {
      const fetchData = async () => {
        setBusy(true);
        await axios({
          method: "DELETE",
          url: `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/links/${linkId}`,
        });
        setBusy(false);
      };
      fetchData();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      setBusy(true);
      const result = await axios(api);
      setBusy(false);
      const uniqueCategories = [
        ...new Set(result.data.map((item) => item.category)),
      ];
      setCategories(
        uniqueCategories.map((item) => {
          return {
            name: item,
            links: [...result.data.filter((meti) => meti.category == item)],
          };
        })
      );
    };
    getCategories();
  }, []);

  return (
    <section className="links">
      {links ? (
        <>
          <SubTitle title="Links"></SubTitle>
          <div className="categories">
            {categories.map((category, categoryId) => (
              <div className="listLinks" key={categoryId}>
                <div className="title">
                  <i className={`badge-${(categoryId % 5) + 1}`}></i>
                  <h4>{category.name}</h4>
                </div>
                <ul>
                  {category.links.map((link, linkId) => (
                    <LinkListItem data={link} key={linkId}></LinkListItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
};

export default Links;
