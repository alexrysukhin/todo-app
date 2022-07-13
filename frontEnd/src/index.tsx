import React from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.min.css";

import "./index.scss";

import { App } from "./components/App";

ReactDom.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
