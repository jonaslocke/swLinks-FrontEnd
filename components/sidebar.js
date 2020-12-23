import Link from "next/link";

const sidebar = ({ array }) => {
  return (
    <nav className="nav">
      <div className="content">
        <h1>SW LINKS</h1>
        <ul>
          {array.map((item, id) => (
            <li key={id}>
              <Link href={id == 0 ? "/" : `/${item}`}>
                <a>{id == 0 ? array[0] : item}</a>
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
      </div>
    </nav>
  );
};
export default sidebar;
