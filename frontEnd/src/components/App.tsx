import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ITodo } from "../types/data";
import { Todo } from "./Todo";
import { HistoryCard } from "./HistoryCard";
import { HistoryButton } from "./HistoryButton";
import { Notification } from "./Notification";

export const App = () => {
  const [visibleHistory, setVisibleHistory] = useState<boolean>(false);
  const [buttonValue, setButtonValue] = useState<string>("history");
  const [deletedTodo, setDeletedTodo] = useState<ITodo | null>();
  const [isVisibleNotification, setIsVisibleNotification] =
    useState<boolean>(false);

  const historyAnimation = {
    key: "his",
    initial: { x: "-5000px", y: "40%" },
    animate: { x: 0 },
    exit: {
      x: "-5000px",
      y: 0,
      transition: { duration: 1 },
    },
    transition: { duration: 1, typ: "anticipate" },
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    setVisibleHistory(!visibleHistory);

    if (buttonValue === "history") {
      setButtonValue("todoList");
    } else {
      setButtonValue("history");
    }
  };

  return (
    <>
      <div>
        <Notification
          deletedTodo={deletedTodo}
          isVisibleNotification={isVisibleNotification}
          setIsVisibleNotification={setIsVisibleNotification}
        />
        <Todo visibleHistory={visibleHistory} />

        <AnimatePresence>
          {visibleHistory && (
            <motion.div {...historyAnimation}>
              <HistoryCard
                setDeletedTodo={setDeletedTodo}
                isVisibleNotification={isVisibleNotification}
                setIsVisibleNotification={setIsVisibleNotification}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <HistoryButton buttonValue={buttonValue} handleClick={handleClick} />
      </div>
    </>
  );
};
