import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress } from "@material-ui/core";

type Props = {
  maxTime: string;
  offsetTime: string;
};

const ProgressBar: React.FC<Props> = ({ maxTime, offsetTime }) => {
	let numMaxTime = 100
  if (maxTime) {
	  numMaxTime = (+maxTime) * 60
  }

  let numOffsetTime = 0
  if (offsetTime.trim().length !== 0) {
    numOffsetTime = (+offsetTime) 
  }

  const countDownDate = new Date().getTime() + 1000 * numMaxTime;
  const [progress, setProgress] = useState((100 / numMaxTime) * numOffsetTime);
  const [displayTime, setDisplayTime] = useState("00:00:00");

  useEffect(() => {
    let distance;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      distance = countDownDate - now - (numOffsetTime * 1000);
      if (distance <= 0) {
        setProgress(100)
        clearInterval(timer);
        return;
      }
      setProgress((prevProgress) => {
        const diff = 100 / numMaxTime;
        return prevProgress + diff;
      });
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDisplayTime(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [maxTime]);
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
