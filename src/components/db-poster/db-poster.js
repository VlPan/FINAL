import React from 'react';
import './db-poster.scss';
import {ClickableIcon} from '../FormControls';


export const Poster = (props) => {

    const saveItem = (event) => {
        event.preventDefault();
        props.saveItem(props.item);
    };

    const deleteItem = (event) => {
        event.preventDefault();
        props.deleteItem(props.item);
    };

    return (
        <div className={props.modificators ? ['md-film', ...props.modificators].join(' ') : 'md-film'}>
            <div className="md-film__image"
                 style={{backgroundImage: `url(${props.imagePath})`}}
            />
            {props.name && <h1 className="md-film__desc">
                {props.saved ?
                    <ClickableIcon icon="trash" className="md-poster__icon md-poster__icon--red"
                                   onClickHandler={deleteItem}/>
                    :
                    <ClickableIcon icon="plus"
                                   className="md-poster__icon md-poster__icon--green"
                                   onClickHandler={saveItem}/>}
                {props.name}
            </h1>}

        </div>
    );
};




