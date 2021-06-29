import React from 'react'
import QuizItem from './QuizItem'

export type Quiz = {
	id: string;
	title: string;
	description: string;
	test_questions: Array<Object>;
}

type Props = {
	tests: Array<Quiz>;
}

const QuizList = (props:Props) => {

	return (
		<ul>
		{props.tests.map((quiz) => (
		  <QuizItem
			key={quiz.id}
			id={quiz.id}
			title={quiz.title}
			description={quiz.description}
			size={quiz.test_questions.length}
		  />
		))}
	  </ul>
	)
}

export default QuizList
