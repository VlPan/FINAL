import React from 'react';
import './movieDescription.scss';
import FilmService from './../../../film-SERVICE';
import LS from './../../../LS';



class MovieDescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            film: {}
        };
    }

    componentWillMount(){
        if(this.props.match.params.mod !== 'custom'){
            const film = LS.get('films').filter((item)=>{
                return item.id === parseInt(this.props.match.params.id);
            });
            this.setState(()=>({film: film[0]}));
        }else{
            let customFilm = LS.get('addedFilms').filter((item)=>{
                        return item.id === this.props.match.params.id;
                    });
            this.setState(()=>({film:customFilm[0]}));
        }
    }

    render() {
        return (
            <div>
                TITLE: <h1>{this.state.film.title}</h1>
                OVERVIEW: <h1>{this.state.film.overview}</h1>
                {this.props.match.params.mod}
                <img src={this.state.film.poster_path} alt="Not Found"/>
            </div>
        );
    }
}


export default MovieDescription;