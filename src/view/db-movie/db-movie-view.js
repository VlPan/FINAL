import React from 'react';
import './../shared-style/app.scss';
import {Link, NavLink} from 'react-router-dom';
import {LS} from '../../services';
import {connect} from 'react-redux';
import {
    openAddItemForm,
    filterMoviesByName,
    addMovie,
    closeAddItemForm,
    saveItem,
    deleteItem,
    toggleSearch,
    filterMoviesAdvanced,
    closeSearch
} from '../../store/actions';
import {Input} from '../../components/FormControls';
import {
    Arrow,
    Poster,
    Navbar,
    AddItemForm,
    AdvancedSearch
} from './../../components';


class MovieViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleArrowMove = this.handleArrowMove.bind(this);
        this.filterItemsByName = this.filterItemsByName.bind(this);
        this.state = {
            arrowIsDown: true
        };
    }

    scrollingHandler() {
        let div = this.filmsContainer;
        let currentScroll = div.scrollTop;
        if (currentScroll === 0) {
            this.setState({arrowIsDown: true});
        }
        if (currentScroll > 0) {
            this.setState({arrowIsDown: false});
        }

    }

    changingArrow() {
        let div = this.filmsContainer;
        let currentScroll = div.scrollTop;

        if (currentScroll !== 0) {
            this.setState({arrowIsDown: !this.state.arrowIsDown});
            div.scrollTo(0, 0);
        } else {
            div.scrollTo(0, this.filmsContainer.scrollHeight);
        }

    }

    componentWillMount() {
        let films = LS.get('films') || [];
        let addedFilms = LS.get('addedFilms') || [];
        this.setState({dataArr: [...films, ...addedFilms]});
    }

    componentWillUnmount() {
        this.props.closeAddItemForm();
        this.props.closeSearch();
        this.props.filterMoviesByName('');
    }


    render() {

        return (
            <div className="db__flex-box">
                {
                    this.props.isOpenSidebar &&
                    <Arrow
                        arrowIsDown={this.state.arrowIsDown}
                        onClick={this.changingArrow.bind(this)}
                        modificators={['db-arrow--black-body', 'db-arrow--position-fixed', 'db-arrow--big-left-margin']}
                    />
                }
                <div className="db__content">
                    <div className="db__navbardb__navbar--white-text">
                        <div className="db__nav-container">
                            <div className="db-search">
                                <Input onKeyUpHandler={this.filterItemsByName}
                                       className="db-search__input"
                                       placeholder="Search Movies"
                                />
                                <div className="db-search__container">
                                    <div className="db-search__box" onClick={this.props.toggleSearch}>
                                        <i className="fa fa-search db-search__icon"
                                           aria-hidden="true"
                                        ></i>
                                    </div>
                                    <AdvancedSearch
                                        title="Advanced Search"
                                        filterItemsAdvanced={this.props.filterMoviesAdvanced}
                                        rememberFrom={LS.get('filterOptionsMovies')}
                                    />
                                    {LS.get('filterOptionsMovies') &&
                                    <div className="db-search__box db-search__box--black-box" onClick={() => {
                                        localStorage.removeItem('filterOptionsMovies');
                                        this.props.filterMoviesAdvanced({});
                                    }}>
                                        <i className="fa fa-ban db-search__icon db-search__icon--red-icon"
                                           aria-hidden="true"
                                        ></i>
                                    </div>
                                    }
                                </div>
                            </div>
                            <Navbar
                                modificators={['db-navbar--left-margin']}
                                openAddMovieForm={this.props.openAddItemForm}
                                isOpenAddMovieForm={this.props.isOpenAddItemForm}
                            >
                                <li
                                    className={['db-navbar__nav-item',
                                        this.props.isOpenAddItemForm && 'db-navbar__nav-item--red-text'].join(' ')}
                                    onClick={this.props.openAddItemForm}>
                                    Add Movie
                                </li>
                                <NavLink
                                    to="/about"
                                    activeClassName="db-about--red-color"
                                    className="db-navbar__nav-item">
                                    About
                                </NavLink>
                            </Navbar>
                        </div>
                    </div>

                    <div
                        className={['db__content-container',
                            'db__films-container--white-text', 'db__content-container--flex'].join(' ')}
                        ref={(filmsContainer) => {
                            this.filmsContainer = filmsContainer;
                        }}
                        onScroll={this.scrollingHandler.bind(this)}
                    >
                        <div className="db__add-movie">
                            {this.props.genres &&
                            <AddItemForm
                                title="Movie"
                                addNewItemToArray={this.props.addMovie}
                                arrToRender={LS.get('genres')}
                            />
                            }
                        </div>
                        {this.props.movies.map((item, index) => {
                            let isAlreadySaved = LS.get('savedItems') && LS.get('savedItems').filter((savedItem) => savedItem.id === item.id).length > 0;

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
                </div>
            </div>
        );
    }

    handleArrowMove() {
        if (this.state.arrow === 'up') {
            this.filmsContainer.scrollTo(0, 0);
            this.setState(() => ({arrow: 'down'}));
        } else {
            this.filmsContainer.scrollTo(0, this.filmsContainer.scrollHeight);
            this.setState(() => ({arrow: 'up'}));
        }
    }

    filterItemsByName(e) {
        let string = e.target.value;
        this.props.filterMoviesByName(string);
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.layout.isOpenSidebar;
    const isOpenAddItemForm = state.layout.isOpenAddForm;
    const movies = state.movieControl.movies;
    const genres = state.genresControl.genres;
    const savedItems = state.myLib.savedItems;
    return {
        isOpenSidebar,
        isOpenAddItemForm,
        movies,
        genres,
        savedItems
    };
};

const mapDispatchToProps = (dispatch) => ({
    openAddItemForm: () => dispatch(openAddItemForm()),
    toggleSearch: () => dispatch(toggleSearch()),
    closeSearch: () => dispatch(closeSearch()),
    closeAddItemForm: () => dispatch(closeAddItemForm()),
    filterMoviesByName: (string) => dispatch(filterMoviesByName(string)),
    addMovie: (movie) => dispatch(addMovie(movie)),
    saveItem: (item) => dispatch(saveItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    filterMoviesAdvanced: (searchOptions) => dispatch(filterMoviesAdvanced(searchOptions))
});

export const MovieView = connect(mapStateToProps, mapDispatchToProps)(MovieViewComponent);