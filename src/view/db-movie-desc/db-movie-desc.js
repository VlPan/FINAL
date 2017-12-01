import React from 'react';
import './db-movie-desc.scss';
import './../shared-style/app.scss';
import {connect} from 'react-redux';
import {LS, customLib} from '../../services';
import {
    saveItem,
    deleteItem
} from '../../store/actions';
import {
    Navbar,
    Poster,
    SelectorBox
} from '../../components/';

import {EntityMovieService} from '../../services';
import {Link, NavLink} from 'react-router-dom';
import {Loader} from 'react-loaders';
import Slider from 'react-rangeslider';

export class MovieDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: {},
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        if (!props.custom) {
            const entityMovieService = new EntityMovieService();
            entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
                this.setState(() => ({
                    recommended: recommendedMovies
                }));
            });
        }
    }

    componentWillMount() {
        console.log('componentWillMount');
        let films = LS.get('films').filter((item) => {

            return item.id === parseInt(this.props.match.params.id);
        });
        if (customLib.arrayIsNotEmpty(films)) {
            console.log(true);
            this.setState(() => ({film: films[0]}));
        } else {
            if (LS.get('addedFilms')) {
                films = LS.get('addedFilms').filter((item) => {
                    return item.id === this.props.match.params.id;
                });
                if (customLib.arrayIsNotEmpty(films)) {
                    console.log(true);
                    this.setState(() => ({film: films[0]}));
                }
            }
        }

        if (customLib.arrayIsEmpty(films)) {
            console.log(true);
            const entityMovieService = new EntityMovieService();
            entityMovieService.getMovieById(this.props.match.params.id).then((movie) => {
                return entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
                    console.log(true);
                    this.setState(() => ({
                        recommended: recommendedMovies,
                        film: movie
                    }));
                });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        let films = LS.get('films').filter((item) => {

            return item.id === parseInt(nextProps.match.params.id);
        });
        if (customLib.arrayIsNotEmpty(films)) {
            console.log(true);
            this.setState(() => ({film: films[0]}));
        } else {
            if (LS.get('addedFilms')) {
                films = LS.get('addedFilms').filter((item) => {
                    return item.id === nextProps.match.params.id;
                });
                if (customLib.arrayIsNotEmpty(films)) {
                    console.log(true);
                    this.setState(() => ({film: films[0]}));
                }
            }
        }

        if (customLib.arrayIsEmpty(films)) {
            console.log(true);
            const entityMovieService = new EntityMovieService();
            entityMovieService.getMovieById(nextProps.match.params.id).then((movie) => {
                return entityMovieService.getRecommended(nextProps.match.params.id).then((recommendedMovies) => {
                    console.log(true);
                    this.setState(() => ({
                        recommended: recommendedMovies,
                        film: movie
                    }));
                });
            });
        }
    }

    render() {
        if (this.state.film.id) {
            console.log('RENDER');
            let genres = this.state.genresFromServer.filter((genre) => {

                return this.state.film.genreIds.includes(genre.id);
            });
            return (
                <div className="md__content">
                    <div className="md__nav-container">
                        <Navbar>
                            <NavLink
                                to="/about"
                                activeClassName="md-about--red-color"
                                className="md-navbar__nav-item">
                                About
                            </NavLink>
                        </Navbar>
                    </div>
                    <div className="md__content-container">
                        <div className="db-movie">
                            <div className="db-movie__container">
                                <div className="db-movie__flex">
                                    <div className="db-movie__image">
                                        {this.state.film.poster &&
                                        <img src={this.state.film.poster} alt="Not found"/>
                                        }
                                        {this.state.film.custom &&
                                        <img src="assets/img/logo.jpg" alt="Not found"/>
                                        }

                                    </div>
                                    <div className="db-movie__info">
                                        <div className="db-movie__name">
                                            {this.state.film.name}
                                        </div>
                                        <div className="db-movie__desc">
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
                                <div className="db-movie__flex">
                                    <SelectorBox
                                        array={LS.get('genres')}
                                        chunk={4}
                                        compareArray={genres.map(genre => genre.name)}
                                        readOnly={true}
                                    />
                                    {!this.state.film.custom &&
                                    <div className="db-movie__flex db-movie__flex--column">
                                        <div className="db-movie__container ">
                                            <div>Popularity</div>
                                            <div className="slider slider--yellow">
                                                <Slider
                                                    min={0}
                                                    max={1000}
                                                    step={50}
                                                    value={this.state.film.popularity}
                                                />
                                            </div>
                                            <div> Vote Average</div>
                                            <div className="slider slider--green">
                                                <Slider
                                                    min={0}
                                                    max={10}
                                                    step={0.3}
                                                    value={this.state.film.vote}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <div className="db-movie__recommended">
                                    {this.state.recommended.map((item, index) => {
                                        let isAlreadySaved = LS.get('savedItems').filter((savedItem) => savedItem.id === item.id).length > 0;
                                        return (
                                            <Link to={`/movies/${item.id}`} key={index}>
                                                <Poster
                                                    item={item}
                                                    name={item.name}
                                                    imagePath={item.poster}
                                                    key={item}
                                                    saveItem={this.props.saveItem}
                                                    deleteItem={this.props.deleteItem}
                                                    saved={isAlreadySaved}
                                                    modificators={isAlreadySaved && ['md-poster--green-border']}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <h1>Loading...</h1>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.layout.isOpenSidebar;
    const genres = state.genresControl.genres;
    const savedItems = state.myLib.savedItems;
    return {isOpenSidebar, genres, savedItems};
};

const mapDispatchToProps = (dispatch) => ({
    saveItem: (item) => dispatch(saveItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item))
});

export const MovieDescription = connect(mapStateToProps, mapDispatchToProps)(MovieDescriptionComponent);
