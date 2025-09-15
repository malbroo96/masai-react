import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Todos Pagination</h1>

      <ul>
        {currentTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.id}.</strong> {todo.title}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                margin: "0 5px",
                backgroundColor: currentPage === page ? "lightblue" : "white",
                border: "1px solid #ccc",
                padding: "5px 10px",
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
