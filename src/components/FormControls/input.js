import React from 'react';
import './db-search.scss';

export const Input = (props) => {
    return (
        <input onKeyUp={props.onKeyUpHandler}
               onChange = {props.onChangeHandler}
               type="text"
               name={props.name}
               value={props.value}
               placeholder={props.placeholder}
               className={props.className}
               />
    );
};
