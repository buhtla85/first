import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Bye } from "./components/bye";

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <Bye compiler="C++" framework= "Angular" />
    </div>,
    document.getElementById("example")
);