import React from "react";
import { motion } from "framer-motion";

export interface IButtonProps {
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    buttonValue: string;
}

const buttonVatiants = {
    hidden: { x: "100vw" },
    visible: { x: 0, transition: { delay: 0.2, type: "spring", stiffness: 50 } },
    whileHover: { boxShadow: "0px 0px 5px  rgb(146, 142, 142)" },
};

export const HistoryButton: React.FC<IButtonProps> = props => {
    return (
        <motion.button
            className="history-button"
            onClick={props.handleClick}
            variants={buttonVatiants}
            initial="hidden"
            animate="visible"
            whileHover="whileHover">
            {props.buttonValue}
        </motion.button>
    );
};
