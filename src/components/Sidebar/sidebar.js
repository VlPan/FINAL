import React from 'react';
import './sidebar.scss';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

const Sidebar = (props) => {
    return (
        <div className="md-sidebar">
            <div className="md-sidebar__column">
                <div className="md-sidebar__line">
                    <i className="fa fa-th-list md-sidebar__icon md-sidebar__main"
                       aria-hidden="true"
                       onClick={props.toggleSidebar}
                    ></i>
                    {props.openSidebar &&
                    <div className="md-logo">
                        <div className="md-logo__logo-img"></div>
                        <div className="md-logo__logo-title">Logo</div>
                    </div>
                    }
                </div>

                <div className="md-sidebar__line">
                    <i className="fa fa-film md-sidebar__icon" aria-hidden="true"></i>
                    {props.openSidebar &&
                    <div className="md-sidebar__label">
                        Home
                        {/*< NavLink to="/navbar" activeClassName="blue-color">Home</ NavLink>*/}
                    </div>
                    }
                </div>

                <div className="md-sidebar__line">
                    <i className="fa fa-file-video-o md-sidebar__icon" aria-hidden="true"></i>
                    {props.openSidebar &&
                    <div className={['md-sidebar__label', !props.openSidebar && 'md-sidebar__label--hide'].join(' ')}>
                        Tv-Shows
                    </div>
                    }
                </div>

                <div className="md-sidebar__line">
                    <i className="fa fa-history      md-sidebar__icon" aria-hidden="true"></i>
                    {props.openSidebar &&
                    <div className={['md-sidebar__label', !props.openSidebar && 'md-sidebar__label--hide'].join(' ')}>
                        MyLibrary
                    </div>
                    }
                </div>

                <div className="md-sidebar__line">
                    <i className="fa fa-question     md-sidebar__icon" aria-hidden="true"></i>
                    {props.openSidebar &&
                    <div className={['md-sidebar__label', !props.openSidebar && 'md-sidebar__label--hide'].join(' ')}>
                        About
                    </div>
                    }
                </div>
            </div>

            <div className="md-sidebar__column">
                <div className="md-sidebar__labels">





                </div>
            </div>
        </div>

    );
};


export default Sidebar;