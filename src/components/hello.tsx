import * as React from "react";

export interface QuoteAuthor { 
    quote: string; 
    author: string;
}

export class TextComponent extends React.Component<QuoteAuthor, {}> {
    render() {
        return (
        <div>
            <q>{this.props.quote}</q>
            <section>{this.props.author}</section>
        </div>
        );
    }
}