import React from 'react';

export const Button = (props) => {
    return (
        <button onClick={props.onClickHandler}
                className={props.className}
                disabled={props.disabled}
                value={props.value}>
            {props.value}
        </button>
    );
};