import { createContext, useState } from 'react';

const QuizContext = createContext({
  quizId: '',
  changeQuizId: (quizId:string) => {}
});

type Props = {
  children: React.ReactNode
}

export function QuizContextProvider(props:Props) {
  const [quizId, setQuizId] = useState('');

  const changeQuizIdHandler = (newQuizId:string) => {
    setQuizId(newQuizId)
  }

  const context = {
    quizId: quizId,
    changeQuizId: changeQuizIdHandler
  };

  return (
    <QuizContext.Provider value={context}>
      {props.children}
    </QuizContext.Provider>
  );
}

export default QuizContext;
