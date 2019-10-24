import React from 'react';

interface IPropsFooter {
    content: string;
}

const Footer = (props: IPropsFooter): JSX.Element => {
    return (
        <footer className="my-footer">
            <div className="container">
                <p>{props.content}</p>
            </div>
        </footer>
    )
}

export default Footer;
