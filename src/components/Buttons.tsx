import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Fab } from "@material-ui/core";

// Icons
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import StarIcon from "@material-ui/icons/Star";
import StopIcon from "@material-ui/icons/Stop";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    top: "auto",
    bottom: 30,
    left: "auto",
    position: "fixed",
  },
}));

type Props = {
  saveAnswer: () => void;
  nextQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addStar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  stopTest: (stopTime: string) => void;
  maxTime: string;
  offsetTime: string;
  isStar: boolean;
};

const Buttons: React.FC<Props> = ({
  saveAnswer,
  nextQuestion,
  prevQuestion,
  addStar,
  stopTest,
  maxTime,
  offsetTime,
  isStar,
}) => {
  let testedTime = +offsetTime;
  useEffect(() => {
    let counterInterval = setInterval(() => {
      if (+maxTime * 60 > testedTime) {
        testedTime++;
      } else {
        clearInterval(counterInterval);
      }
    }, 1000);
	return () => {
		clearInterval(counterInterval);
	  }
  }, [maxTime]);
  const classes = useStyles();
  const prevButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    saveAnswer();
    prevQuestion(e);
  };
  const nextButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    saveAnswer();
    nextQuestion(e);
  };
  const starButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const stopButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopTest(`${testedTime}`);
  };

  return (
    <div className={classes.root}>
      <Fab color="primary" onClick={prevButtonHandler}>
        <NavigateBeforeIcon />
      </Fab>
      <Fab color="secondary" onClick={nextButtonHandler}>
        <NavigateNextIcon />
      </Fab>
      <Fab disabled={isStar} >
        <StarIcon />
      </Fab>
      <Fab onClick={stopButtonHandler}>
        <StopIcon />
      </Fab>
    </div>
  );
};

export default Buttons;
