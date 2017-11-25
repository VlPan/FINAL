import React from 'react';
import './db-movie-desc.scss';
import './../shared-style/app.scss';
import {connect} from 'react-redux';
import {LS} from '../../services';
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
import {Link} from 'react-router-dom';


export class MovieDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: {},
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        const entityMovieService = new EntityMovieService();
        entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
            this.setState(() => ({
                recommended: recommendedMovies
            }));
        });

    }

    componentWillMount() {
        let film = LS.get('films').filter((item) => {
            return item.id === parseInt(this.props.match.params.id);
        });
        if (film.length === 0) {
            if (LS.get('addedFilms')) {
                film = LS.get('addedFilms').filter((item) => {
                    return item.id === this.props.match.params.id;
                });
                this.setState(() => ({film: film[0]}));
            } else {
                const entityMovieService = new EntityMovieService();
                entityMovieService.getMovieById(this.props.match.params.id).then((movie) => {
                    return entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
                        console.log('SET STATE');
                        this.setState(() => ({
                            recommended: recommendedMovies,
                            film: movie
                        }));
                    });
                });
            }
        } else {
            this.setState(() => ({film: film[0]}));
        }
    }

    componentWillReceiveProps(nextProps) {
        const entityMovieService = new EntityMovieService();
        entityMovieService.getMovieById(nextProps.match.params.id).then((movie) => {
            return entityMovieService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
                this.setState(() => ({
                    recommended: recommendedMovies,
                    film: movie
                }));
            });
        });
    }

    render() {
        if (this.state.film.id) {
            console.log('RENDER');
            console.log(this.state.film);
            let genres = this.state.genresFromServer.filter((genre) => {
                return this.state.film.genreIds.includes(genre.id);
            });
            if (this.state.film.custom) {
                genres = this.state.film.genreIds;
            }
            return (
                <div className="md__view-container">
                    <div className="md__container">
                        <Navbar itemsToRender={[{name: 'About'}, {name: 'Pricing'}, {name: 'Blog'}]}/>
                    </div>
                    <div className="md__content-container">
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
                                    <SelectorBox
                                        array={LS.get('genres')}
                                        chunk={4}
                                        compareArray={genres}
                                        readOnly={true}
                                    />
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
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <h1>Loading...</h1>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const genres = state.genresControl.genres;
    const savedItems = state.myLib.savedItems;
    return {isOpenSidebar, genres, savedItems};
};

const mapDispatchToProps = (dispatch) => ({
    saveItem: (item) => dispatch(saveItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item))
});

export const MovieDescription = connect(mapStateToProps, mapDispatchToProps)(MovieDescriptionComponent);
