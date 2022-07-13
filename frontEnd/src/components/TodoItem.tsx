import React from "react";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { ITodo } from "../types/data";

export interface ITodoItemProps extends ITodo {
    choiceForUpdate(id: number): void;
    moveToHistory(id: number): void;
    i: number;
}

const animation = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.03,
        },
    }),
};

export const TodoItem: React.FC<ITodoItemProps> = props => {
    const { id, title, choiceForUpdate, moveToHistory, i } = props;

    return (
        <motion.li className="todo-item" key={id} variants={animation} initial="hidden" animate="visible" custom={i}>
            <h4 className="todo-title">{title}</h4>
            <div className="settings-block">
                <button className="update-button" onClick={() => choiceForUpdate(id)}>
                    {<EditOutlined />}
                </button>
                <button className="update-button" onClick={() => moveToHistory(id)}>
                    {<CheckOutlined />}
                </button>
            </div>
        </motion.li>
    );
};
