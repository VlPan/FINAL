import React from 'react';
import './tvShowDescription.scss';
import FilmService from './../../../film-SERVICE';
import LS from './../../../LS';



class TvShowDescription extends React.Component {
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
                {this.props.match.params.id}
                <img src={this.state.tvShow.poster_path} alt="Not found"/>
                <h1>{this.state.tvShow.overview}</h1>
            </div>
        );
    }
}


export default TvShowDescription;