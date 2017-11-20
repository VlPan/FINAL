import React from 'react';
import './db-movie-desc.scss';
import LS from '../../services/LS';
import {Navbar} from '../db-nav/db-nav';
import {Poster} from '../db-poster/db-poster';
import {Genrebox} from '../db-genrebox/db-genrebox';
import {EntityMovieService} from '../../services/movie-entity.service';
import {Link} from 'react-router-dom';


export class MovieDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: {},
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        const entityMovieService = new EntityMovieService();
        entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
            this.setState(()=>({
                recommended:recommendedMovies
            }));
        });

    }

    componentWillMount() {
        let film = LS.get('films').filter((item) => {
            return item.id === parseInt(this.props.match.params.id);
        });
        console.log(film);
        if (film.length === 0) {
            film = LS.get('addedFilms').filter((item) => {
                return item.id === this.props.match.params.id;
            });
            console.log(film);
        }
        this.setState(() => ({film: film[0]}));
    }

    componentWillReceiveProps(nextProps){
        const entityMovieService = new EntityMovieService();
        entityMovieService.getMovieById(nextProps.match.params.id).then((movie)=>{
            this.setState(() => ({film: movie}));
            return entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
                this.setState(()=>({recommended:recommendedMovies}));
            });
        });
    }

    render() {
        let genres = this.state.genresFromServer.filter((genre) => {
            return this.state.film.genreIds.includes(genre.id);
        });
        if(this.state.film.custom){
            genres = this.state.film.genreIds;
        }
        return (
            <div className="md-view-content">
                <Navbar/>
                <div className="db-tv-show">
                    <div className="db-tv-show__container">
                        <div className="db-tv-show__flex">
                            <div className="db-tv-show__image">
                                <img src={this.state.film.poster} alt="Not found"/>
                            </div>
                            <div className="db-tv-show__info">
                                <div className="db-tv-show__name">
                                    {this.state.film.name}
                                </div>
                                <div className="db-tv-show__desc">
                                    <p>{this.state.film.desc}</p>
                                    <p>{this.state.film.desc}</p>
                                    <p>{this.state.film.desc}</p>
                                    <p>{this.state.film.desc}</p>
                                    <p>{this.state.film.desc}</p>
                                    <p>{this.state.film.desc}</p>
                                    <p>{this.state.film.desc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="db-tv-show__flex">
                            <Genrebox genres={genres}/>
                            <div className="db-tv-show__flex db-tv-show__flex--column">
                                <div className="db-tv-show__container">
                                    <div>Popularity</div>
                                    <div> Vote Average</div>
                                </div>
                            </div>
                        </div>
                        {this.state.recommended &&
                        <div className="db-tv-show__recommended">
                            {this.state.recommended.map((item, index) => {
                                return (
                                    <Link to={`/movies/${item.id}`} key={index}>
                                        <Poster
                                            name={item.name}
                                            imagePath={item.poster}
                                        />
                                    </Link>
                                );
                            })}
                        </div> }
                    </div>
                </div>
            </div>
        );
    }
}
