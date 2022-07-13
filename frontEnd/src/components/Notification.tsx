import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ITodo } from "../types/data";

interface INotificationProps {
    deletedTodo: ITodo | null | undefined;
    isVisibleNotification: boolean;
    setIsVisibleNotification: (visible: boolean) => void;
}

const notificationAnimation = {
    hidden: {
        x: "50vw",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
    },
};

export const Notification: React.FC<INotificationProps> = ({
    deletedTodo,
    isVisibleNotification,
    setIsVisibleNotification,
}) => {
    return (
        <AnimatePresence>
            {isVisibleNotification && (
                <motion.div
                    className="notificationCard"
                    variants={notificationAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden">
                    <p>
                        <span className="notification-item">Name: </span>
                        <span className="notification-title-underline">{deletedTodo?.title}</span>
                    </p>
                    <p>
                        <span className="notification-item">Was created: </span> {deletedTodo?.dateOfCreation}
                    </p>
                    <p>
                        <span className="notification-item">Was done: </span>
                        {deletedTodo?.dateOfCompletion}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
