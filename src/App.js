import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, editing: false },
      ]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, editing: true } : todo))
    );
  };

  const saveTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, editing: false } : todo
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold mb-6">Todo List</h1>
      <div className="flex items-center mb-6">
        <input
          className="border-2 border-gray-300 rounded w-full py-2 px-4 mr-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-4">
            {todo.editing ? (
              <input
                className="border-2 border-gray-300 rounded w-full py-2 px-4 mr-4"
                defaultValue={todo.text}
                onBlur={(e) => saveTodo(todo.id, e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && saveTodo(todo.id, e.target.value)
                }
              />
            ) : (
              <span className="flex-grow">{todo.text}</span>
            )}
            <button
              className="bg-green-500 text-white py-1 px-3 rounded mr-2"
              onClick={() => editTodo(todo.id)}
              disabled={todo.editing}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
