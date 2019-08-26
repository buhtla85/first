import * as React from "react";
import * as ReactDOM from "react-dom";

import { TextComponent } from "./components/hello";
import { Bye } from "./components/bye";

ReactDOM.render(
    <div>
        <TextComponent />
        <Bye compiler="Typescript" framework= "React" />
    </div>,
    document.getElementById("root")
);