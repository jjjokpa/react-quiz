import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";
import QuizContext from "../../store/quiz-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function MainNavigation() {
  const favoritesCtx = useContext(QuizContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Title
          </Typography>
          <Button color="inherit" to="/" component={Link}>
            All Quizzes
          </Button>
          <Button color="inherit" to="/start" component={Link}>
            Start Quiz
          </Button>
          <Button color="inherit" to="/new-quiz" component={Link}>
            Add New
          </Button>
          <Button color="inherit" to="/result" component={Link}>
            result
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
