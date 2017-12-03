import React from 'react';
import './db-sidebar.scss';


export const Sidebar = (props) => {
    return (
        <div className="db-sidebar">
            <div className="db-sidebar__column">
                {props.children}
                {props.itemsToRender && props.itemsToRender.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="db-sidebar__line">
                            <i className={`fa fa-${item.iconClass} db-sidebar__icon`} aria-hidden="true"></i>
                            {props.openSidebar &&
                            <div className="db-sidebar__label">
                                {item.name} {item.count && <div className="db-sidebar__count">({item.count})</div>}
                            </div>
                            }
                        </ div>
                    );
                })}
            </div>
        </div>

    );
};
