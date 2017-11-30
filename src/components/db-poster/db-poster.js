import React from 'react';
import ImageLoader from 'react-load-image';
import './db-poster.scss';
import {ClickableIcon} from '../FormControls';

import {Loader} from 'react-loaders';

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
            {props.imagePath &&
            <div className="md__content-container--flex md__content-container--full-height">
                <ImageLoader
                    src={props.imagePath || '../../assets/img/logo.jpg'}
                >
                    <img src={props.imagePath || '../../assets/img/tv.png'} className="md-film__image"/>
                    <div>Error!</div>

                    <Loader type="line-scale" color="#f4df42" active/>
                </ImageLoader>
            </div>
            }
            {props.item.custom && <img src="../../assets/img/logo.jpg" alt="Not found" className="md-film__image"/>}


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




