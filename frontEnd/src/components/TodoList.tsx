import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { ITodo } from "../types/data";
import { TodoItem } from "./TodoItem";

interface ITodoListProps {
    todos: ITodo[];
    choiceForUpdate(id: number): void;
    moveToHistory(id: number): void;
}

export const TodoList: React.FC<ITodoListProps> = ({ todos, choiceForUpdate, moveToHistory }) => {
    return (
        <>
            <ul className={todos.length > 8 ? "todo-list scroll" : "todo-list"}>
                {todos.map((todo, i) => {
                    return (
                        <TodoItem
                            {...todo}
                            i={i}
                            key={todo.id}
                            choiceForUpdate={choiceForUpdate}
                            moveToHistory={moveToHistory}
                        />
                    );
                })}
            </ul>
        </>
    );
};
