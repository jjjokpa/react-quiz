import { shuffleArray } from "./Utils";

import { DUMMY } from "./jsons/TEST_DUMMY";

export type Question = {
  category: string;
  correct_answers: string[];
  incorrect_answers: string[];
  question: string;
  type: string;
  checked_answers: string[];
  star: boolean;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async () => {
  const data = DUMMY

  const questionList = data.test_questions.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      ...question.correct_answers,
    ],)
  }));

  return {
    test_time: data.test_time, 
    questionList
  }
};
