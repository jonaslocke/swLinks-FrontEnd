import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Loading from "../components/layout/loading";
import SubTitle from "../components/layout/subTitle";

import LinkListItem from "../components/linkListItem";
import AddLink from "../components/addLink";

import { LinksContext } from "../src/LinksContext";
import { UserContext } from "../src/UserContext";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [busy, setBusy] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showAddLink, setShowAddLink] = useState(false);
  const { logged } = useContext(UserContext);

  const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/links`;

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <LinksContext.Provider
      value={{
        getCategories,
      }}
    >
      <section className={`links${showAddLink ? " show-addLink" : ""}`}>
        {categories ? (
          <>
            <SubTitle title="Links"></SubTitle>
            {logged ? (
              <i
                className="fas fa-plus-square addLink-button"
                onClick={() => setShowAddLink(!showAddLink)}
              ></i>
            ) : null}
            <AddLink></AddLink>
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
    </LinksContext.Provider>
  );
};

export default Links;
