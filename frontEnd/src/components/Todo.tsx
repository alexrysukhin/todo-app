import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { ITodo } from "../types/data";

import { TodoList } from "./TodoList";

export interface ITodoProps {
  visibleHistory: boolean;
}
const showTodoVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const hideTodoVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const Todo: React.FC<ITodoProps> = ({ visibleHistory }) => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [updatedIdentifier, setUpdatedIdentifier] = useState<number | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/todos").then((response: any) => {
      setTodos(response.data.filter((todo: ITodo) => todo.visible === true));
    });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !updatedIdentifier) {
      addValue();
    } else if (e.key === "Enter" && updatedIdentifier) {
      updateTodo();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const addValue = async () => {
    if (value) {
      await axios({
        method: "POST",
        url: "http://localhost:3001/api/todos",
        data: {
          id: Date.now(),
          title: value,
        },
      }).then((response: any) =>
        setTodos(response.data.filter((todo: ITodo) => todo.visible === true))
      );
      setValue("");
    }
  };

  const choiceForUpdate = (id: number) => {
    setValue(todos.filter((todo) => todo.id === id)[0].title);
    inputRef.current?.focus();
    setUpdatedIdentifier(id);
  };

  const updateTodo = async () => {
    // eslint-disable-next-line array-callback-return
    todos.map((todo) => {
      if (todo.id === updatedIdentifier) {
        axios({
          method: "put",
          url: `http://localhost:3001/api/todos`,
          data: {
            ...todo,
            title: value,
          },
        }).then((response) =>
          setTodos(response.data.filter((todo: ITodo) => todo.visible === true))
        );
      }
    });
    setUpdatedIdentifier(null);
    setValue("");
  };

  const moveToHistory = async (id: number) => {
    // eslint-disable-next-line array-callback-return
    todos.map((todo) => {
      if (todo.id === id) {
        axios({
          method: "put",
          url: `http://localhost:3001/api/todos`,
          data: {
            ...todo,
            visible: false,
          },
        }).then((response) =>
          setTodos(response.data.filter((todo: ITodo) => todo.visible === true))
        );
      }
    });
  };

  const showConsole = (e: any) => {
    if (!updatedIdentifier) return;
    else if (e.target.id === "root") {
      setUpdatedIdentifier(null);
      setValue("");
    }
  };

  return (
    <motion.div
      className="todo"
      variants={visibleHistory ? hideTodoVariants : showTodoVariants}
      initial="hidden"
      animate="visible"
    >
      {window.addEventListener("click", showConsole)}
      <div className="input-block">
        <input
          className="input"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        {updatedIdentifier ? (
          <button className="input-button" onClick={updateTodo}>
            Update
          </button>
        ) : (
          <button className="input-button" onClick={addValue}>
            Add
          </button>
        )}
      </div>

      <TodoList
        todos={todos}
        moveToHistory={moveToHistory}
        choiceForUpdate={choiceForUpdate}
      />
    </motion.div>
  );
};
