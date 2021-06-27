import React, { ReactEventHandler, useState } from "react";
// components
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
// Types
import { QuestionState, Difficulty } from "./API";

// import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answerList: Array<string>;
  correct: boolean;
  correctAnswers: string[];
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [maxTime, setMaxTime] = useState("100");

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (answerList: Array<string>) => {
    const incorrects = questions[number].incorrect_answers;
    const correct = !answerList.some((answer) => incorrects.includes(answer));

    const answerObject = {
      question: questions[number].question,
      answerList,
      correct,
      correctAnswers: questions[number].correct_answers,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    // move on to next question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const prevQuestion = () => {
    const nextQuestion = number - 1;
    setNumber(nextQuestion);
  };

  const addStar = () => {};

  const stopTest = () => {};

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setMaxTime(e.currentTarget.value);
  };

  const changeAnswers = (oldAnswer:AnswerObject, newAnswers:string[]) => {
    const answerObject = {
      question: oldAnswer.question,
      answerList: oldAnswer.answerList,
      correct: oldAnswer.correct,
      correctAnswers: newAnswers,
    };
    console.log(answerObject)
    setUserAnswers((prev) =>(
      [...prev.filter(element => element.question === oldAnswer.question), answerObject] 
      )
    );
  }

  return (
    <React.Fragment>
      <h1>Simple Test</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <React.Fragment>
          <label htmlFor="maxTime">Test Time(Min)</label>
          <input
            id="maxTime"
            onChange={inputChangeHandler}
            type="text"
            value={maxTime}
          />
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        </React.Fragment>
      ) : null}
      {!gameOver ? <p className="score">Score:</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          changeAnswers={changeAnswers}
          callback={checkAnswer}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          addStar={addStar}
          stopTest={stopTest}
          maxTime={maxTime}
        />
      )}
    </React.Fragment>
  );
};

export default App;
