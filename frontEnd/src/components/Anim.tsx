import React from "react";
import { motion } from "framer-motion";

export const Anim = () => {
    return (
        <div className="box-container">
            <motion.div
                className="box"
                initial={{ opacity: 0.2 }}
                animate={{
                    x: "50vw",
                    rotate: 90,
                    opacity: 1,
                    type: "spring",
                }}
                transition={{
                    duration: 2,
                }}></motion.div>
        </div>
    );
};
