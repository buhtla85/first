import * as React from "react";


const quotesArr: Array<{quote: string, author: string}> = [
    {quote: 'Nobody expects the Spanish Inquisition!', author: 'Michael Palin'},
    {quote: "Spam! Spam! Spam! Spam! Spam! Spam!", author: "Terry Jones"},
    {quote: "We're an anarcho-syndicalist commune.", author: "Michael Palin"},
    {quote: "Venezuelan beaver cheese?", author: "John Cleese"}, 
    {quote: "Your mother was a hamster and your father smelt of elderberries!", author: "John Cleese"},
    {quote: "My hovercraft is full of eels.", author: "John Cleese"},
    {quote: "He's not the Mesiah. He's a very naughty boy!", author: "Terry Jones"}
  ];

export interface IndexState {
    index: number;
}
  

export class TextComponent extends React.Component<{}, IndexState> {
    constructor(props: any) {
        super(props);
        this.state = {
            index: 0
        }
    }

    public moveToNext = (): void => {
        const randomInd: number = Math.floor(Math.random() * quotesArr.length);
        this.setState({index: randomInd})
    }
    public render() {
        const item: {quote: string, author: string} = quotesArr[this.state.index];
        return (
        <div id="quote-box">
            <h1>Monty Python Quotes</h1>
            <blockquote>
                <q>{item.quote}</q>
                <footer>{item.author}</footer>
            </blockquote>
            <button>
                <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${item.quote} ${item.author}`} target="_blank" title="Post this quote on Twitter!">Tweet Quote</a>
            </button>
            <button onClick={this.moveToNext}>Next Quote</button>
        </div>
        );
    }
}