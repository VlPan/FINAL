import React from 'react';

export const Selector = (props) => {
    return (
        <input
            type="checkbox"
            name={props.name}
            value={props.value}
            readOnly={props.readOnly}
            checked={props.checked}
            onChange={props.onChangeHandler}
        />
    );
};