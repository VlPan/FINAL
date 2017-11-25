import React from 'react';
import './db-sidebar.scss';


export const Sidebar = (props) => {
    return (
        <div className="md-sidebar">
            <div className="md-sidebar__column">
                {props.children}
                {props.itemsToRender && props.itemsToRender.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="md-sidebar__line">
                            <i className={`fa fa-${item.iconClass} md-sidebar__icon`} aria-hidden="true"></i>
                            {props.openSidebar &&
                            <div className="md-sidebar__label">
                                {item.name} {item.count && <div className="md-sidebar__count">({item.count})</div>}
                            </div>
                            }
                        </ div>
                    );
                })}
            </div>
        </div>

    );
};
