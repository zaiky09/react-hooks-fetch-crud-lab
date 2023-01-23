import React, { useState } from "react";

function QuestionItem({ question, onDeleteItem , onUpdateItem }) {
  const { id, prompt, answers, correctIndex } = question;
  const [initialQuestion, setQuestion] =useState(question)


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${initialQuestion.id}`, {
      method:'DELETE'
    })
    .then(res => res.json())
    .then(() => onDeleteItem(question))
    .catch((error) => console.log(error))
  }

  function handleChangeAnswer(event) {
    const value = event.target.value;
    setQuestion({...initialQuestion, correctIndex:value})
    console.log(initialQuestion)

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method:'PATCH',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({correctIndex:value})
    })
    .then(res => res.json())
    .then(updatedItem => onUpdateItem(updatedItem))
    .catch(error => console.log(error));
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;