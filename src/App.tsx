import React, { useState } from "react";
// components
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
// Types
import { QuestionState } from "./API";

export type AnswerObject = {
  number: number;
  question: string;
  answerList: Array<string>;
  correct: boolean;
  correctAnswers: string[];
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [maxTime, setMaxTime] = useState("10");
  const [offsetTime, setOffsetTime] = useState("");

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions();
    setQuestions(newQuestions.questionList);
    setOffsetTime(newQuestions.test_time);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const setAnswerList = (questionNr: number, answerList: Array<string>) => {
    const number = questionNr - 1;
    const questionObject: QuestionState = {
      ...questions[number],
      checked_answers: answerList,
    };
    const updateIndex = questions.findIndex(
      (el) => el.question === questionObject.question
    );
    let newQuestions = questions;
    newQuestions[updateIndex] = questionObject;

    setQuestions(newQuestions);
    // console.log(questions.splice(updateIndex, 0, questionObject))
  };

  const nextQuestion = () => {
    // move on to next question
    const nextQuestion = number + 1;
    if (nextQuestion === questions.length) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const prevQuestion = () => {
    const prevQuestion = number - 1;
    setNumber(prevQuestion);
  };

  const addStar = () => {};

  const stopTest = (stopTime: string) => {
    setOffsetTime(stopTime);
    setGameOver(true);
  };

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setMaxTime(e.currentTarget.value);
  };

  const changeAnswers = (oldAnswer: AnswerObject, newAnswers: string[]) => {
    const answerObject = {
      ...oldAnswer,
      correctAnswers: newAnswers,
    };
    setUserAnswers((prev) => [
      ...prev.filter((element) => element.question !== oldAnswer.question),
      answerObject,
    ]);
  };

  return (
    <React.Fragment>
      <h1>Simple Test</h1>
      {gameOver || userAnswers.length === questions.length ? (
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
      {/* {!gameOver ? <p className="score">Score:</p> : null} */}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={questions.length}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          changeAnswers={changeAnswers}
          callback={setAnswerList}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          addStar={addStar}
          stopTest={stopTest}
          maxTime={maxTime}
          offsetTime={offsetTime}
          checkedAnswers={questions[number].checked_answers}
          isStar={questions[number].star}
        />
      )}
    </React.Fragment>
  );
};

export default App;
