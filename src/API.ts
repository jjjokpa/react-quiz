import { shuffleArray } from "./Utils";

import { DUMMY } from "./jsons/TEST_DUMMY";

export type Question = {
  category: string;
  correct_answers: string[];
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // const data = await (await fetch(endpoint)).json();
  const data = DUMMY

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      ...question.correct_answers,
    ]),
  }));
};
