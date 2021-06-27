import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Fab } from '@material-ui/core'

// Icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import StarIcon from '@material-ui/icons/Star';
import StopIcon from '@material-ui/icons/Stop';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		top: 'auto',
		bottom: 30,
		left: 'auto',
		position: 'fixed',
	}
}))

type Props = {
	saveAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
	nextQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
	prevQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
	addStar: (e: React.MouseEvent<HTMLButtonElement>) => void;
	stopTest: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };

const Buttons: React.FC<Props> = ({
	saveAnswer,
	nextQuestion,
	prevQuestion,
	addStar,
	stopTest
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Fab color='primary'>
				<NavigateBeforeIcon />
			</Fab>
			<Fab color='secondary'>
				<NavigateNextIcon />
			</Fab>
			<Fab>
				<StarIcon />
			</Fab>
			<Fab>
				<StopIcon />
			</Fab>
		</div>
	)
}

export default Buttons
