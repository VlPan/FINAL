import React from 'react';
import './db-page-not-found.scss';

export class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="md-page-not-found">
                <h1 className="md-page-not-found__title">Sorry, Page Was Not Found! :(</h1>
            </div>
        );
    }
}