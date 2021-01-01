import Link from "next/link";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const NavItem = ({ label, icon, to }) => {
  return (
    <Link href={`/${to}`}>
      <a>
        <ListItem button>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      </a>
    </Link>
  );
};

export default NavItem;
