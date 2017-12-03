import React from 'react';
import './db-arrow.scss';

export class Arrow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div
                className={this.props.modificators ? ['db-arrow', ...this.props.modificators]. join(' ') : 'db-arrow'}
                onClick={this.props.onClick}
            >
                {this.props.arrowIsDown && <i className="fa fa-arrow-down db-arrow__arrow" aria-hidden="true"></i>}
                {!this.props.arrowIsDown && <i className="fa fa-arrow-up db-arrow__arrow" aria-hidden="true"></i>}
            </div>
        );
    }
}

