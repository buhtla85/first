import * as React from "react";

export interface QuoteAuthor {
    quote: string;
    author: string;
}

export interface ByeState { 
    quotes: Array<QuoteAuthor>;
    index: number;
    url:string;
    color: string;
}

export interface ByeProp {
    url: string;
    color: string;
}

export class Bye extends React.Component<ByeProp, ByeState> {
    constructor(props: ByeProp){
        super(props);
        this.state = {
            quotes: [],
            index: 0,
            url: props.url,
            color: props.color
        }
    }

    componentDidMount() {
        this.fetchQuotes(this.state.url)
        .then(x => this.setState({
            quotes: x
        }))
        .then(()=> this.setRandomIndex());
    }

    fetchQuotes = (url: string): Promise<QuoteAuthor[]> => {
        return fetch(url) 
        .then(res => res.json());
    }

    setRandomIndex = () => {
        const randomIndex: number = Math.floor(Math.random() * this.state.quotes.length);
        this.setState({index: randomIndex});
    }

    getNextQuote = (): void => {
        this.setRandomIndex();
    }

    render() {
        const randomQuote = this.state.quotes[this.state.index];
        if(randomQuote !== undefined) {
        return (
            <div>
                <h1 style={ { color: this.state.color }}>Random Quote Generator</h1>
                <div>
                    <blockquote>
                        <q>{randomQuote.quote}</q>
                        <footer>--{randomQuote.author}</footer>
                    </blockquote>
                </div>
                <div>
                    <button onClick={this.getNextQuote}>Next Quote</button>
                    <button>
                        <a href={`https://twitter.com/intent/tweet?text=${randomQuote.quote} ${randomQuote.author}`} target="_blank" title="Post this quote on Twitter">Tweet Quote</a>
                    </button>
                </div>
            </div>
        )
        } else {
            return <div></div>
        }
    }
}