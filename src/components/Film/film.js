import React from 'react';
import './film.scss';



class Films extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="md-film">
                <div className="md-film__image"
                     style={{backgroundImage: `url(${this.props.imagePath})`}}
                />
                {this.props.title && <h1 className="md-film__desc">{this.props.title}</h1>}
                {this.props.name && <h1 className="md-film__desc">{this.props.name}</h1>}
            </div>
        );
    }
}


export default Films;