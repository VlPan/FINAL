import React from 'react';
import './../shared-style/app.scss';
import {Link} from 'react-router-dom';
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
    filterMoviesAdvanced
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
            arrow: 'down'
        };
    }

    componentWillMount() {
        let films = LS.get('films') || [];
        let addedFilms = LS.get('addedFilms') || [];
        this.setState({dataArr: [...films, ...addedFilms]});
    }

    componentWillUnmount() {
        this.props.closeAddItemForm();
    }


    render() {

        return (
            <div className="md__flex-box">
                {
                    this.props.isOpenSidebar &&
                    <Arrow
                        arrowState={this.state.arrow}
                        handleArrowMove={this.handleArrowMove}
                        modificators={['md-arrow--black-body', 'md-arrow--position-fixed', 'md-arrow--big-left-margin']}
                    />
                }
                <div className="md__content">
                    <div className="md__navbarmd__navbar--white-text">
                        <div className="md__container">
                            <div className="md-search">
                                <Input onKeyUpHandler={this.filterItemsByName}
                                       className="md-search__input"
                                       placeholder="Search Movies"
                                />
                                <div className="md-search__box">
                                    <i className="fa fa-search md-search__icon"
                                       aria-hidden="true"
                                       onClick={this.props.toggleSearch}
                                    ></i>
                                </div>
                                <AdvancedSearch
                                    title="Advanced Search"
                                    filterItemsAdvanced = {this.props.filterMoviesAdvanced}
                                    rememberFrom={LS.get('filterOptionsMovies')}
                                />
                            </div>
                            <Navbar
                                modificators={['md-navbar--left-margin']}
                                itemsToRender={[
                                    {name: 'About'}, {name: 'Pricing'}, {name: 'Blog'}
                                ]}
                                openAddMovieForm={this.props.openAddItemForm}
                                isOpenAddMovieForm={this.props.isOpenAddItemForm}
                            >
                                <li
                                    className={['md-navbar__nav-item',
                                        this.props.isOpenAddItemForm && 'md-navbar__nav-item--red-text'].join(' ')}
                                    onClick={this.props.openAddItemForm}>
                                    Add Movie
                                </li>
                            </Navbar>
                        </div>
                    </div>

                    <div
                        className={['md__content-container',
                            'md__films-container--white-text', 'md__content-container--flex'].join(' ')}
                        ref={(filmsContainer) => {
                            this.filmsContainer = filmsContainer;
                        }}
                    >
                        <div className="md__add-movie">
                            {this.props.genres &&
                            <AddItemForm
                                title="Movie"
                                addNewItemToArray={this.props.addMovie}
                                arrToRender={LS.get('genres')}
                            />
                            }
                        </div>
                        {this.props.movies.map((item, index) => {
                            let isAlreadySaved = LS.get('savedItems').filter((savedItem) => savedItem.id === item.id).length > 0;
                            console.log(isAlreadySaved);
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
    const isOpenSearchForm = state.layout.isOpenSearch;
    const movies = state.movieControl.movies;
    const fullMovies = state.movieControl.fullMovies;
    const genres = state.genresControl.genres;
    const savedItems = state.myLib.savedItems;
    return {
        isOpenSidebar,
        isOpenAddItemForm,
        movies,
        genres,
        savedItems,
        fullMovies
    };
};

const mapDispatchToProps = (dispatch) => ({
    openAddItemForm: () => dispatch(openAddItemForm()),
    toggleSearch: () => dispatch(toggleSearch()),
    closeAddItemForm: () => dispatch(closeAddItemForm()),
    filterMoviesByName: (string) => dispatch(filterMoviesByName(string)),
    addMovie: (movie) => dispatch(addMovie(movie)),
    saveItem: (item) => dispatch(saveItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    filterMoviesAdvanced: (searchOptions) => dispatch(filterMoviesAdvanced(searchOptions))
});

export const MovieView = connect(mapStateToProps, mapDispatchToProps)(MovieViewComponent);