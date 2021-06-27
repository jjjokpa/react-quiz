// import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
import { Card, CardContent, List, ListItem, Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { AnswerObject } from "../App";
import Buttons from "./Buttons";
import ProgressBar from "./ProgressBar";

type Props = {
  question: string;
  answers: string[];
  callback: (answerList: Array<string>) => void;
  userAnswer: AnswerObject | undefined;
  changeAnswers: (oldAnswer:AnswerObject, newAnswers: Array<string>) => void;
  questionNr: number;
  totalQuestions: number;
  nextQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addStar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  stopTest: (e: React.MouseEvent<HTMLButtonElement>) => void;
  maxTime: string;
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
}) => {
  const [answerList, setAnswerList] = useState<string[]>([]);
  const checkboxHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const checkbox = event.currentTarget;

    // oncheck
    checkbox.checked && setAnswerList([...answerList, checkbox.value]);

    // uncheck
    if (!checkbox.checked) {
      setAnswerList((prev) =>
        prev.filter((answer) => answer !== checkbox.value)
      );
      userAnswer && changeAnswers(userAnswer, userAnswer.answerList.filter((answer) => answer !== checkbox.value))
    }
  };

  const saveAnswer = () => {
    callback(answerList);
    setAnswerList([]);
  };

  return (
    <React.Fragment>
      <p>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <List>
        {answers.map((answer) => (
          <ListItem key={answer} style={{ display: "inline-block" }}>
            <Card style={{ display: "flex" }}>
              <Checkbox
                checked={
                  userAnswer &&
                  !!userAnswer.answerList.find((el) => el === answer)
                }
                // disabled={!!userAnswer}
                value={answer}
                onChange={checkboxHandler}
                // onClick={callback}
              ></Checkbox>
              <CardContent>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <button
        onClick={(event) => {
          saveAnswer();
          nextQuestion(event);
        }}
      >
        Next Question
      </button>
      <button
        onClick={(event) => {
          prevQuestion(event);
        }}
      >
        Prev Question
      </button>
      <hr />
      <ProgressBar maxTime={maxTime} />
      <Buttons
        saveAnswer={saveAnswer}
        nextQuestion={nextQuestion}
        prevQuestion={prevQuestion}
        addStar={addStar}
        stopTest={stopTest}
      />
    </React.Fragment>
  );
};

export default QuestionCard;
