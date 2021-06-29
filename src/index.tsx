import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuizContextProvider } from './store/quiz-context';


ReactDOM.render(
  <QuizContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QuizContextProvider>,
  document.getElementById('root')
);
