import React from 'react';
import './db-arrow.scss';

export const Arrow = (props) => {
    return (
        <div className={props.modificators ? ['md-arrow', ...props.modificators]. join(' ') : 'md-arrow'}
             onClick={props.handleArrowMove}
        >
            {props.arrowState === 'down' && <i className="fa fa-arrow-down md-arrow__arrow" aria-hidden="true"></i>}
            {props.arrowState === 'up' && <i className="fa fa-arrow-up md-arrow__arrow" aria-hidden="true"></i>}
        </div>
    );
};

