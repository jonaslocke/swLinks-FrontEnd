const Link = ({ data }) => {
  return (
    <li>
      <span>
        <i className="fas fa-cog"></i> {data.category}
      </span>
      <span>
        <i className="fas fa-list"></i> {data.label}
      </span>
      <span>
        <i className="fas fa-external-link-alt"></i> {data.url}
      </span>
    </li>
  );
};

export default Link;
