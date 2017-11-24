import React from 'react';
import './db-nav.scss';


export const Navbar = (props) => {
    return (
        <div className="md-navbar md-navbar--left-margin">
            <ul className="md-navbar__container">
                {props.children}
                {props.itemsToRender.map((item, index) => {
                    return (
                        <li className='md-navbar__nav-item' key={index}>{item.name}</li>
                    );
                })}
            </ul>
        </div>
    );
};
