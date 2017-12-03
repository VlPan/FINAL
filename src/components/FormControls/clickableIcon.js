import React from 'react';

export const ClickableIcon = (props) => {
    return (
        <div
            className={props.className}
            onClick={props.onClickHandler}
        >
            <i className={`fa fa-${props.icon}`}
               aria-hidden="true"
            >
            </i>
        </div>
    );
};