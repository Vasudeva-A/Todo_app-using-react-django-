import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CompletedTasks from "./CompletedTasks";

const Todos = () => {
  let [todos, setTodos] = useState([]);
  let [title, setTitle] = useState("");

  // fetch todos from backend
  let loadTodos = async () => {
    let res = await fetch("http://127.0.0.1:8000/api/list/");
    let data = await res.json();
    setTodos(data);
  };
  useEffect(() => {
    loadTodos();
  }, []);
  // add todo function
  let addTodo = async () => {
    await fetch("http://127.0.0.1:8000/api/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    setTitle("");
    loadTodos();
  };
  // update
  let updateTodo = async (id, title, completed) => {
    await fetch(`http://127.0.0.1:8000/api/update/${id}/`, {
      method: "PUT",
    });
    if (!completed) {
      alert(`✔ "${title}" marked as completed`);
    } else {
      alert(`↩ "${title}"  marked as not completed`);
    }
    loadTodos();
  };
  // delete todo
  let deleteTodo = async (id, title) => {
    await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
      method: "DELETE",
    });
    alert(`🗑 "${title}"  deleted successfully!`);

    loadTodos();
  };
  return (
    <div>
      <Paper
        elevation={20}
        style={{
          padding: "20px",
          margin: "auto",
          width: "300px",
          marginTop: "50px",
          background: "#e0d3d3ff",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Todo App</h1>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          {/* Center TextField */}
          <TextField
            sx={{
              marginBottom: "30px",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
              "& .MuiOutlinedInput-input": {
                textAlign: "center", // ⭐ Center text
              },
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a Task"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />

          <Paper
            elevation={10}
            style={{
              padding: "10px",

              margin: "auto",
              background: "#e0d3d3ff",
            }}
          >
            <h3 style={{textAlign:'left'}}>Your Tasks</h3>
            {/* Empty state */}
            {todos.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "gray",
                  padding: "10px",
                  margin: 0,
                }}
              >
                No data — please add something 🙂
              </p>
            )}

            <ol style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {todos.map((todo, index) => (
                <li
                  key={todo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 5px",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  {/* Number + Text aligned left */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>{index + 1})</span>
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.title}
                    </span>
                  </div>

                  {/* Buttons aligned right */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      onClick={() =>
                        updateTodo(todo.id, todo.title, todo.completed)
                      }
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: "40px",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {todo.completed ? "↩" : "✔"}
                    </Button>

                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{
                        minWidth: "40px",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      🗑
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          </Paper>
        </div>
        <CompletedTasks
          completed={todos.filter((todo) => todo.completed === true)}
        />
      </Paper>
    </div>
  );
};

export default Todos;
