const sidebar = ({section, setSection}) => {
  return (
    <nav className="nav">
      <h1>SW LINKS</h1>
      <ul>
        <li onClick={() => setSection(1)}>home</li>
        <li onClick={() => setSection(2)}>calculators</li>
        <li onClick={() => setSection(3)}>links</li>
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
