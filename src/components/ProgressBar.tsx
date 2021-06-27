import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress } from "@material-ui/core";

type Props = {
  maxTime: string;
};

const ProgressBar: React.FC<Props> = ({ maxTime }) => {
	let numMaxTime = 100
  if (maxTime) {
	  numMaxTime = (+maxTime) * 60
  }

  const countDownDate = new Date().getTime() + 1000 * numMaxTime;
  const [progress, setProgress] = useState(100 / numMaxTime);
  const [displayTime, setDisplayTime] = useState("00:00:00");

  useEffect(() => {
    let distance;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      distance = countDownDate - now;
      if (distance <= 0) {
        return;
      }
      // console.log(100 - Math.floor(((distance/ 1000)/DUMMY_TIME)*100))
      setProgress((prevProgress) => {
        // console.log(prevProgress)
        if (prevProgress >= 100) {
          return 100;
        } else {
          // const diff = Math.floor(((DUMMY_TIME - (distance / 1000)) / DUMMY_TIME) * 100)
          const diff = 100 / numMaxTime;
          return prevProgress + diff;
        }
      });
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDisplayTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${displayTime}`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
