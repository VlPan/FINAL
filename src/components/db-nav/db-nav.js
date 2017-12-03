import React from 'react';
import './db-nav.scss';


export const Navbar = (props) => {
    return (
        <div className={props.modificators ? ['db-navbar', ...props.modificators].join(' ') : 'db-navbar'}>
            <ul className="db-navbar__container">
                {props.children}
                {props.itemsToRender && props.itemsToRender.map((item, index) => {
                    return (
                        <li className='db-navbar__nav-item' key={index}>{item.name}</li>
                    );
                })}
            </ul>
        </div>
    );
};
