import * as React from "react";
import * as ReactDOM from "react-dom";

import { TextComponent } from "./components/hello";
import { Bye } from "./components/bye";

ReactDOM.render(
    <div>
        <TextComponent />
        <Bye compiler="C++" framework= "Angular" />
    </div>,
    document.getElementById("example")
);