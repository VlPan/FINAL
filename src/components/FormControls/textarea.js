import React from 'react';

export const TextArea = (props) => {
    return (
        <textarea onKeyUp={props.onKeyUpHandler}
                  onChange={props.onChangeHandler}
                  type="text"
                  name={props.name}
                  placeholder={props.placeholder}
                  className={props.className}
                  value={props.value}
        />
    );
};