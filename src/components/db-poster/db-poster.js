import React from 'react';
import './db-poster.scss';


export class Poster extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="md-film">
                <div className="md-film__image"
                     style={{backgroundImage: `url(${this.props.imagePath})`}}
                />
                {this.props.name && <h1 className="md-film__desc">{this.props.name}</h1>}
            </div>
        );
    }
}
