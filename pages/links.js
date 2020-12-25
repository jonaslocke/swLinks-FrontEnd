import { useState, useEffect } from "react";
import SubTitle from "../components/layout/subTitle";
import Loading from "../components/layout/loading";
import axios from "axios";
import Link from "../components/layout/link";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [busy, setBusy] = useState(false);
  const [categories, setCategories] = useState([]);

  const api = `https://epic-payne-6bb305.netlify.app/.netlify/functions/api/links`;

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios(api);
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
          <ul className="categories">
            {categories.map((category, categoryId) => (
              <div key={categoryId}>
                {category.name}
                <ul>
                  {category.links.map((link, linkId) => (
                    <li key={linkId}>
                      <div>{link.label}</div>
                      <div>{link.url}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
};

export default Links;
