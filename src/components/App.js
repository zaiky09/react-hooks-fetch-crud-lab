import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(questions => setQuestions(questions));
  },[])

  // post a question 
  function handleSubmitQuestion(postedQuestion) {
    setQuestions([...questions,postedQuestion]);
  }

  function onDeleteItem(deletedItem) {
    const updatedItems = questions.filter(question => question.id !== deletedItem.id);
    setQuestions(updatedItems);
    console.log("This is the deleted item", deletedItem)
  }
  
  function onUpdateItem(updatedItem){
    console.log('this is the updated item', updatedItem);
    const updatedItems = questions.map(question => {
      if(question.id === updatedItem.id){
        return updatedItem;
      }
      else {
        return question;
      }
    })
    setQuestions(updatedItems);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm 
              onSubmitQuestion={handleSubmitQuestion}
      /> : <QuestionList 
              questions={questions} 
              onDeleteItem={onDeleteItem} 
              onUpdateItem={onUpdateItem} 
      />}
    </main>
  );
}

export default App;