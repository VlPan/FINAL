import React from 'react';
import './arrow.scss';

const Arrow = (props) => {
        return (
            <div className="md-arrow
             md-arrow--black-body
              md-arrow--position-fixed
               md-arrow--big-left-margin"
            onClick={props.handleArrowMove}
            >
                {props.arrowState === 'down' && <i className="fa fa-arrow-down md-arrow__arrow" aria-hidden="true"></i>}
                {props.arrowState === 'up' && <i className="fa fa-arrow-up md-arrow__arrow" aria-hidden="true"></i>}
            </div>
        );
};

export default Arrow;
