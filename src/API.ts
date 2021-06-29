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

  const response = await fetch("https://react-http-f3146-default-rtdb.firebaseio.com/tests.json")
  const data2 = await response.json();
  console.log(data2);

  const questionList2 = [];

  for (const key in data2){
    console.log(key);
    console.log(data2[key])
    // questionList2.push({
    //   test_questions:

    // })
  }

    const data = DUMMY[0]

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
