import React from 'react';
import './db-selector-box.scss';
import chunk from 'chunk';

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
                                    <input
                                        type="checkbox"
                                        name="genre"
                                        value={item.name}
                                        readOnly={props.readOnly}
                                        checked={
                                            props.compareArray &&
                                            props.compareArray.map((propsItem) => {
                                                return propsItem.name === item.name;
                                            }).includes(true)
                                        }/>
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
