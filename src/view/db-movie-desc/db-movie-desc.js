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
        this.initMovieAndReccomended = this.initMovieAndReccomended.bind(this);
        this.state = {
            film: {},
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        this.baseState = this.state;
    }

    initMovieAndReccomended(id) {
        let films = LS.get('films').filter((item) => {
            return item.id === parseInt(id);
        });
        if (customLib.arrayIsNotEmpty(films)) {
            const entityMovieService = new EntityMovieService();
            entityMovieService.getRecommended(id).then((recommendedMovies) => {

                this.setState(() => ({
                    recommended: recommendedMovies,
                    film: films[0]
                }));
            });
            return;
        } else {
            if (LS.get('addedFilms')) {
                films = LS.get('addedFilms').filter((item) => {
                    return item.id === id;
                });
                if (customLib.arrayIsNotEmpty(films)) {

                    this.setState(() => ({film: films[0]}));
                    return;
                }
            }
        }

        if (customLib.arrayIsEmpty(films)) {

            const entityMovieService = new EntityMovieService();
            entityMovieService.getMovieById(id).then((movie) => {
                return entityMovieService.getRecommended(id).then((recommendedMovies) => {

                    this.setState(() => ({
                        recommended: recommendedMovies,
                        film: movie
                    }));
                });
            });
        }
    }

    componentWillMount() {
        this.initMovieAndReccomended(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.initMovieAndReccomended(nextProps.match.params.id);
    }


    render() {

        if (!customLib.objectIsEmpty(this.state.film)) {
            let genres = this.state.genresFromServer.filter((genre) => {
                return this.state.film.genreIds.includes(genre.id);
            });
            return (
                <div className="db__content">
                    <div className="db__nav-container">
                        <Navbar modificators={['db-navbar--left-margin']}>
                            <NavLink
                                to="/about"
                                activeClassName="db-about--red-color"
                                className="db-navbar__nav-item">
                                About
                            </NavLink>
                        </Navbar>
                    </div>
                    <div className="db__content-container">
                        <div className="db-movie">
                            <div className="db-movie__container">
                                <div className="db-movie__flex">
                                    <div className="db-movie__image">
                                        {this.state.film.poster &&
                                        <img src={this.state.film.poster} alt="Not found"/>
                                        }
                                        {this.state.film.custom &&
                                        <img src={this.state.film.posterImg || '../../assets/img/logo.jpg'}
                                             alt="Not found" className="db-film__image"/>
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
                                {customLib.arrayIsNotEmpty(this.state.recommended) ?
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
                                                        modificators={isAlreadySaved && ['db-poster--green-border']}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    :
                                    !this.state.film.custom &&
                                    <div className="db-tv-show__container">
                                        <div className="db__loading-container">
                                            <Loader type="line-scale" innerClassName="db-lod" color="#f4df42" active/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="db__loading-container">
                    <Loader type="line-scale" innerClassName="db-lod" color="#f4df42" active/>
                </div>
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
