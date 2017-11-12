import React from 'react';
import './root.scss';
import Sidebar from './../Sidebar/sidebar';
import App from './../App/app';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';


class Root extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.state = {
            isOpenSidebar: false
        };
    }
    render() {
        return (
            <Router>
            <div className="md__main-container">
                    <div className={['md__sidebar',
                        'md__sidebar--black-body',
                        'md__sidebar--white-text',
                        this.state.isOpenSidebar && 'md__sidebar--big-width']
                        .join(' ')}>
                        <Sidebar toggleSidebar={this.handleToggleSidebar} openSidebar={this.state.isOpenSidebar}/>
                    </div>
            <Route exact path="/" render={()=><App isOpenSidebar={this.state.isOpenSidebar}/>}/>
        </div >
            </Router>
    );
    }

    handleToggleSidebar() {
        this.setState((prevState) => ({
            isOpenSidebar: !prevState.isOpenSidebar
        }));
    }
}

export default Root;