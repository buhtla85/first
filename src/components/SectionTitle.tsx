import React from 'react';

interface IPropsTitle {
    title: string;
    styling: string;
}

const SectionTitle = (props: IPropsTitle): JSX.Element => {
    return (
    <div className={props.styling}>
        <h2>{props.title}</h2>
        <div></div>
    </div>
  );
}

export default SectionTitle;
