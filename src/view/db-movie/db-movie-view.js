import React from 'react';
import './../shared-style/app.scss';
import {Link} from 'react-router-dom';
import {LS} from '../../services';
import {connect} from 'react-redux';
import {
    openAddMovieForm,
    filterMoviesByName,
    addMovie
} from '../../store/actions';
import {Input} from '../../components/FormControls';
import {
    Arrow,
    Poster,
    Navbar,
    AddMovie
} from './../../components';

class MovieViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleArrowMove = this.handleArrowMove.bind(this);
        this.filterItemsByTitle = this.filterItemsByTitle.bind(this);
        //this.addNewFilm = this.addNewFilm.bind(this);
        this.state = {
            arrow: 'down'
        };
    }

    componentWillMount() {
        let films = LS.get('films') || [];
        let addedFilms = LS.get('addedFilms') || [];
        this.setState({dataArr: [...films, ...addedFilms]});
    }

    render() {
        return (
            <div className="md__flex-box">
                {
                    this.props.isOpenSidebar &&
                    <Arrow arrowState={this.state.arrow} handleArrowMove={this.handleArrowMove}/>
                }
                <div className="md__content">
                    <div className="md__navbarmd__navbar--white-text">
                        <div className="md__container">
                            <div className="md-search">
                                <Input onKeyUpHandler={this.filterItemsByTitle}
                                       className="md-search__input"
                                       placeholder="Search Movies"
                                />
                                <div className="md-search__box">
                                    <i className="fa fa-search md-search__icon" aria-hidden="true"></i>
                                </div>
                            </div>
                            <Navbar
                                whatToAdd={'Add movie'}
                                itemsToRender={[
                                    {name: 'About'}, {name: 'Pricing'}, {name: 'Blog'}
                                ]}
                                openAddMovieForm={this.props.openAddMovieForm}
                                isOpenAddMovieForm={this.props.isOpenAddMovieForm}
                            >
                                <li
                                    className={['md-navbar__nav-item',
                                        this.props.isOpenAddMovieForm && 'md-navbar__nav-item--red-text'].join(' ')}
                                    onClick={this.props.openAddMovieForm}>
                                    Add Movie
                                </li>
                            </Navbar>
                        </div>
                        <div className="md__add-movie">
                            {this.props.genres &&
                                <AddMovie
                                    addNewItemToArray={this.props.addMovie}
                                    arrToRender={LS.get('genres')}
                                />
                            }
                        </div>
                    </div>

                    <div
                        className={['md__content-container',
                            'md__films-container--white-text', 'md__content-container--flex'].join(' ')}
                        ref={(filmsContainer) => {
                            this.filmsContainer = filmsContainer;
                        }}
                    >
                        {this.props.movies.map((item, index) => {
                            return (
                                <Link to={`/movies/${item.id}`} key={index}>
                                    <Poster
                                        name={item.name}
                                        imagePath={item.poster}
                                        key={item}
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

    // addNewFilm(film) {
    //     this.setState((prevState) => ({
    //         dataArr: prevState.dataArr.concat(film)
    //     }));
    // }

    filterItemsByTitle(e) {
        let string = e.target.value;
        this.props.filterMoviesByName(string);
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const isOpenAddMovieForm = state.addMovieForm.isOpen;
    const movies = state.movieControl.movies;
    const genres = state.genresControl.genres;
    return {isOpenSidebar, isOpenAddMovieForm, movies, genres};
};

const mapDispatchToProps = (dispatch) => ({
    openAddMovieForm: () => dispatch(openAddMovieForm()),
    filterMoviesByName: (string) => dispatch(filterMoviesByName(string)),
    addMovie: (movie) => dispatch(addMovie(movie))
});

export const MovieView = connect(mapStateToProps, mapDispatchToProps)(MovieViewComponent);