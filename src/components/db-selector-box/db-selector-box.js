import React from 'react';
import './db-selector-box.scss';
import chunk from 'chunk';
import {Selector} from '../FormControls';

export const SelectorBox = (props) => {
    const arr = props.array;
    const chunkedArrays = chunk(arr, props.chunk);
    return (
        <div className="md-genre-box" onClick={props.onClickHandler}>
            {chunkedArrays.map((array, index) => {
                return (
                    <div className="md-genre-box__column" key={index}>
                        {array.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Selector
                                        name="genre"
                                        value={item.name}
                                        readOnly={props.readOnly}
                                        checked={
                                            props.compareArray &&
                                            props.compareArray.map((propsItem) => {
                                                return propsItem === item.name;
                                            }).includes(true)
                                        }
                                        onChangeHandler={props.onChangeHandler}
                                    />
                                    <label>{item.name}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
