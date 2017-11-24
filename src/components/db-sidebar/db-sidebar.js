import React from 'react';
import './db-sidebar.scss';
import {NavLink} from 'react-router-dom';

export const Sidebar = (props) => {
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


                {props.itemsToRender.map((item, index) => {
                    return (
                        <NavLink to={item.linkTo}
                                 key={index}
                                 activeClassName="md-sidebar__line--active"
                                 className="md-sidebar__line">
                            <i className={`fa fa-${item.iconClass} md-sidebar__icon`} aria-hidden="true"></i>
                            {props.openSidebar &&
                            <div className="md-sidebar__label">
                                {item.name} {item.count && <div className="md-sidebar__count">({item.count})</div>}
                            </div>
                            }
                        </ NavLink>
                    );
                })}
                {props.children}
            </div>
        </div>

    );
};
