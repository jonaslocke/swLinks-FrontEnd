import Link from "next/link";

const sidebar = () => {
  const menuLinks = ["home", "calculators", "links"];
  return (
    <nav className="nav">
      <h1>SW LINKS</h1>
      <ul>
        {menuLinks.map((item, id) => (
          <li key={id}>
            <Link href={id == 0 ? "/" : item}>
              <a>{id == 0 ? "home" : item}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="copyright">
        <span>by JonasLocke</span>
        <div className="social">
          <a href="https://twitter.com/JnsLocke" target="_blank">
            <i className="fab fa-twitter-square"></i>
          </a>
          <a href="mailto:jonaslocke@gmail.com" target="_blank">
            <i className="fas fa-envelope-square"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};
export default sidebar;
