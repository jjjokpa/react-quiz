import React, { useContext } from "react";
import Card from '../ui/Card'
import QuizContext from '../../store/quiz-context';

type Props = {
	id: string;
	title: string;
	description: string;
	size: number;
}

const QuizItem = ({
	id,
	title,
	description,
	size,
}:Props) => {
	const quizCtx = useContext(QuizContext)

	const quizIdChangeHandler = () => {
		quizCtx.changeQuizId(id)
	}

	return (
		<li>
			<Card>
				<div>
					<h3>{title}</h3>
				</div>
				<div>
					<h3>{description}</h3>
				</div>
				<div>
					<h3>{size}</h3>
				</div>
				<div>
					<button onClick={quizIdChangeHandler}>Select</button>
				</div>
			</Card>
		</li>
	)
};

export default QuizItem;
