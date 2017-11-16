import React from 'react';
import './db-tv-show-desc.scss';
import FilmService from './../../../film-SERVICE';
import LS from '../../services/LS';



export class TvShowDescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tvShow: {}
        };
    }

    componentWillMount(){
        const tvShow = LS.get('tvShows').filter((item)=>{
            return item.id === parseInt(this.props.match.params.id);
        });
        this.setState(()=>({tvShow: tvShow[0]}));
    }

    render() {
        return (
            <div>
                <img src={this.state.tvShow.poster} alt="Not found"/>
                <h1>{this.state.tvShow.overview}</h1>
                <h1>{this.state.tvShow.desc}</h1>
            </div>
        );
    }
}