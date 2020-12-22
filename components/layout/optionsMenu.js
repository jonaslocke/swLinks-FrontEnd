const optionsMenu = ({ options }) => {
  return (
    <div className="optionsMenu">
      <i className="fas fa-ellipsis-h"></i>
      <ul className="options">
        {options.map((item, id) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default optionsMenu;
