import * as React from "react";

export interface ByeProps { 
    compiler: string; 
    framework: string; 
}

interface ByeState { 
    message: string 
}

// 'ByeProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Bye extends React.Component<ByeProps, ByeState> {

    constructor(props: ByeProps) {
        super(props);
        this.state = { message: "bye" };
    }

    render() {
        return <div><input type="text" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value})}/><h1>{this.state.message} from {this.props.compiler} and {this.props.framework}!</h1></div>;
    }
}