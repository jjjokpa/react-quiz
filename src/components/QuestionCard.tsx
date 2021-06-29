// import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
import { List } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { AnswerObject } from '../pages/TestStart'
import Buttons from "./Buttons";
import ProgressBar from "./ProgressBar";
import Answer from "./Answer";

type Props = {
  question: string;
  answers: string[];
  callback: (number:number, answerList: Array<string>) => void;
  userAnswer: AnswerObject | undefined;
  changeAnswers: (oldAnswer: AnswerObject, newAnswers: Array<string>) => void;
  questionNr: number;
  totalQuestions: number;
  nextQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addStar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  stopTest: (stopTime:string) => void;
  maxTime: string;
  offsetTime: string;
  checkedAnswers: string[];
  isStar: boolean;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  changeAnswers,
  questionNr,
  totalQuestions,
  nextQuestion,
  prevQuestion,
  addStar,
  stopTest,
  maxTime,
  offsetTime,
  checkedAnswers,
  isStar,
}) => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (checkedAnswers.length > 0) {
      const selectCheckedItems = 
      checkedAnswers.reduce((pre, answer) => {
        return {...pre, [answer]: true}
      }, {});
      setCheckedItems(selectCheckedItems);
    } else {
      setCheckedItems({})
    }
    
  }, [questionNr])

  const checkboxHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const checkbox = event.currentTarget;
    setCheckedItems({
      ...checkedItems,
      [checkbox.value]: checkbox.checked
    })
  };

  const saveAnswer = () => {
    const dataArray = Object.entries(checkedItems).reduce((pre, [key, value]) => {
      value && pre.push(key)
      return pre
    },[] as string[])
    callback(questionNr, dataArray);
  };

  return (
    <React.Fragment>
      <p>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <List>
        {answers.map((answer, index) => (
          <Answer
            id={index}
            key={answer}
            userAnswer={userAnswer}
            answer={answer}
            onCheckHandler={checkboxHandler}
            checkedAnswers={checkedAnswers}
          />
        ))}
      </List>
      <hr />
      <ProgressBar maxTime={maxTime} offsetTime={offsetTime} />
      <Buttons
        saveAnswer={saveAnswer}
        nextQuestion={nextQuestion}
        prevQuestion={prevQuestion}
        addStar={addStar}
        stopTest={stopTest}
        maxTime={maxTime}
        offsetTime={offsetTime}
        isStar={isStar}
      />
    </React.Fragment>
  );
};

export default QuestionCard;
