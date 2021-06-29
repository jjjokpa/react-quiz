import React, { useEffect } from "react";
import { DUMMY } from "../jsons/TEST_DUMMY";

import QuizList from "../components/quizzes/QuizList";

const AllTests = () => {
  const allTests = DUMMY.map((quiz)=>(
    {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      test_questions: quiz.test_questions
    }
  ))
  
  return (
    <section>
      <h1>All Tests</h1>
      <QuizList tests={allTests} />
    </section>
  );
};

export default AllTests;
