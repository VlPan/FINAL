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

    const hintInfo = ()=>{

        return <h1>Hello World</h1>;
    };

    return (
        <div className={props.modificators ? ['db-film', ...props.modificators].join(' ') : 'db-film'}>
            {props.imagePath && !props.item.custom &&
            <div className="db__content-container--flex db__content-container--full-height">
                <ImageLoader
                    src={props.imagePath || '../../assets/img/logo.jpg'}
                >
                    <img src={props.imagePath || '../../assets/img/logo.jpg'} className="db-film__image"/>
                    <div>Error!</div>

                    <Loader type="line-scale" color="#f4df42" active/>
                </ImageLoader>
            </div>
            }
            {props.item.custom &&
            <img src={props.item.posterImg} alt="Not found" className="db-film__image"/>
            }


            {props.name && <h1 className="db-film__desc">
                <ClickableIcon icon="info"
                               className="db-poster__icon-info db-poster__icon--red"
                               onMouseOverHandler={hintInfo}/>
                <div className="db-film__desc-text">{props.item.desc}</div>
                {props.saved ?
                    <ClickableIcon icon="trash" className="db-poster__icon db-poster__icon--red"
                                   onClickHandler={deleteItem}/>
                    :
                    <ClickableIcon icon="plus"
                                   className="db-poster__icon db-poster__icon--green"
                                   onClickHandler={saveItem}/>}
                {props.name}
            </h1>}

        </div>
    );
};




