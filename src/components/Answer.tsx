import React, { useEffect } from "react";
import { ListItem, Card, Checkbox, CardContent } from "@material-ui/core";
import { AnswerObject } from "../pages/TestStart";

type Props = {
  id: number;
  userAnswer: AnswerObject | undefined;
  answer: string;
  onCheckHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  checkedAnswers: string[];
};

const Answer: React.FC<Props> = ({ id, userAnswer, answer, onCheckHandler, checkedAnswers }) => {
  const [checked, setChecked] = React.useState(false);

  const onCheck = (event: React.FormEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
    onCheckHandler(event);
  };

  useEffect(() => {
    if (checkedAnswers) {
      const foundItem = checkedAnswers.find(
        (el: string) => el === answer
      );
	  
	  if (foundItem) {
		setChecked(true)
	  } else {
		  setChecked(false)
	  }
    }
  }, [checkedAnswers, answer]);

  return (
    <ListItem key={answer} style={{ display: "inline-block" }}>
      <Card style={{ display: "flex" }}>
        <Checkbox
        id={`id_${id}`}
          checked={checked}
          value={answer}
          onChange={onCheck}
        ></Checkbox>
        <CardContent>
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default Answer;
