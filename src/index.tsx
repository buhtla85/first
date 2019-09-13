import * as React from "react";
import * as ReactDOM from "react-dom";

import { TextComponent } from "./components/hello";
import { Bye } from "./components/bye";

ReactDOM.render(
    <div>
        <TextComponent />
        <Bye color="red" url="https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json" />
        <Bye color="blue" url="https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json" />
    </div>,
    document.getElementById("root")
);