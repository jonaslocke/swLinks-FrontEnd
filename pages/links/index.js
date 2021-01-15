import { useState, useEffect } from "react";
import axios from "axios";
import SubTitle from "../../components/subTitle";

import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DialpadIcon from "@material-ui/icons/Dialpad";
import LinkIcon from "@material-ui/icons/Link";
import AdbIcon from "@material-ui/icons/Adb";
import AirlineSeatFlatIcon from "@material-ui/icons/AirlineSeatFlat";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";

const api = `https://elegant-shannon-f859b4.netlify.app/.netlify/functions/api/links`;

const Links = () => {
  const [busy, setBusy] = useState(false);
  const [categories, setCategories] = useState([]);

  const listIcons = [
    <AdbIcon />,
    <AirlineSeatFlatIcon />,
    <BeachAccessIcon />,
    <BrightnessHighIcon />,
  ];

  const useStyles = makeStyles((theme) => ({
    listTitle: {
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    aTag: {
      textDecoration: "none",
      color: "#cb7be6",
    },
  }));

  const classes = useStyles();

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
    // getCategories();
    setCategories([
      {
        name: "react",
        links: [
          {
            _id: "5fec4b0dbdfe1b0008c71454",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "teste",
            category: "react",
            __v: 0,
          },
          {
            _id: "5fec4b45bdfe1b0008c71455",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "aaaa",
            category: "react",
            __v: 0,
          },
          {
            _id: "5fec4c80ccd4e80009c212b5",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "aaaa",
            category: "react",
            __v: 0,
          },
          {
            _id: "5fec66e4edfae20008f74d0e",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "qqqq",
            category: "react",
            __v: 0,
          },
          {
            _id: "5fec67a0dbbb510008a1e203",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "1",
            category: "react",
            __v: 0,
          },
          {
            _id: "5fec6802edfae20008f74d10",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "111",
            category: "react",
            __v: 0,
          },
        ],
      },
      {
        name: "3",
        links: [
          {
            _id: "5fec687cedfae20008f74d11",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "agoravai",
            category: "3",
            __v: 0,
          },
          {
            _id: "5fec6900dbbb510008a1e205",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "éserio?",
            category: "3",
            __v: 0,
          },
          {
            _id: "5fec6929dbbb510008a1e206",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "hmmn",
            category: "3",
            __v: 0,
          },
          {
            _id: "5fec693bdbbb510008a1e207",
            url:
              "https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback",
            label: "dhois",
            category: "3",
            __v: 0,
          },
        ],
      },
      {
        name: "sites",
        links: [
          {
            _id: "5ff89b03987c0f000891f967",
            url: "https://material-ui.com/",
            label: "material ui",
            category: "sites",
            __v: 0,
          },
        ],
      },
    ]);
  }, []);
  return (
    <>
      <SubTitle title="Links">
        <DialpadIcon fontSize="large" />
      </SubTitle>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={6} key={index}>
            <Paper>
              <Grid container alignItems="center" className={classes.listTitle}>
                <Grid item>
                  <ListItemIcon>{listIcons[index % 4]}</ListItemIcon>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="div">
                    {category.name}
                  </Typography>
                </Grid>
              </Grid>
              <List>
                {category.links.map((link) => {
                  return (
                    <Link href={link.url} target="_blank">
                      <a className={classes.aTag}>
                        <ListItem button key={link._id}>
                          <ListItemIcon>
                            <LinkIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={link.label}
                            secondary={link.url}
                          />
                        </ListItem>
                      </a>
                    </Link>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Links;
