import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";

import { ITodo } from "../types/data";

interface IHistoryCardProps {
  setDeletedTodo: (todo: ITodo) => void;
  isVisibleNotification: boolean;
  setIsVisibleNotification: (isVisible: boolean) => void;
}

export const HistoryCard: React.FC<IHistoryCardProps> = ({
  setDeletedTodo,
  isVisibleNotification,
  setIsVisibleNotification,
}) => {
  const [historyTodos, setHistoryTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/todos").then((response: any) => {
      setHistoryTodos(
        response.data.filter((todo: ITodo) => todo.visible === false)
      );
    });
  }, []);

  const deleteTodo = async (id: number) => {
    if (!isVisibleNotification) {
      await axios({
        method: "delete",
        url: `http://localhost:3001/api/todos/${id}`,
      })
        .then((response) => {
          setHistoryTodos(
            response.data.filter((todo: ITodo) => todo.visible === false)
          );
        })
        .then(() => {
          const todo = historyTodos.find((_) => _.id === id);
          if (todo) {
            console.log(todo);
            setDeletedTodo(todo);
            setIsVisibleNotification(true);
            setTimeout(() => {
              setIsVisibleNotification(false);
            }, 3000);
          }
        });
    }
  };

  return (
    <div className="history-card">
      <h2 className="history-title">
        {historyTodos.length ? "Completed tasks" : "History list is empty"}
      </h2>
      <ul
        className={
          historyTodos.length > 8 ? "history-list scroll" : "history-list"
        }
      >
        {historyTodos.length
          ? historyTodos.map((todo) => (
              <li className="history-item" key={todo.id}>
                <h4>{todo.title}</h4>
                <Button
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  {<DeleteOutlined />}
                </Button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
