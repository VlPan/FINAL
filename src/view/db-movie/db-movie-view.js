import React from 'react';
import './../shared-style/app.scss';
import {Link} from 'react-router-dom';
import LS from '../../services/LS';

import {
    Arrow,
    Poster,
    Navbar,
    SearchInput,
    AddMovie
} from './../../components';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        this.handleArrowMove = this.handleArrowMove.bind(this);
        this.filterItemsByTitle = this.filterItemsByTitle.bind(this);
        this.handleOpenAddMovieForm = this.handleOpenAddMovieForm.bind(this);
        this.handleCloseAddMovieForm = this.handleCloseAddMovieForm.bind(this);
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.addNewFilm = this.addNewFilm.bind(this);
        this.state = {
            arrow: 'down',
            dataArr: [],
            openAddMovieForm: false
        };
    }

    componentWillMount() {
        let films = LS.get('films') || [];
        let addedFilms = LS.get('addedFilms') || [];
        this.setState({dataArr: [...films, ...addedFilms]});
    }


    // componentWillReceiveProps(nextProps){
    //     switch (nextProps.data) {
    //         case 'films':
    //             let films = LS.get('films') || [];
    //             let addedFilms = LS.get('addedFilms') || [];
    //             this.setState({dataArr: [...films, ...addedFilms]});
    //             break;
    //         case 'tvShows':
    //             let tvShows = LS.get('tvShows') || [];
    //             let addedTvShows = LS.get('addedTvShows') || [];
    //             this.setState({dataArr: [...tvShows, ...addedTvShows]});
    //             break;
    //         default:
    //             films = LS.get('films') || [];
    //             this.setState({dataArr: films});
    //     }
    // }

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
                            <SearchInput filterItemsByTitle={this.filterItemsByTitle}/>
                            <Navbar
                                openAddMovieForm={this.state.openAddMovieForm}
                                handleOpenAddMovieForm={this.handleOpenAddMovieForm}
                                isFilmPage={true}/>
                        </div>
                        <div className="md__add-movie">
                            <AddMovie handleOpenAddMovieForm={this.handleOpenAddMovieForm}
                                      handleCloseAddMovieForm={this.handleCloseAddMovieForm}
                                      isOpen={this.state.openAddMovieForm}
                                      addNewFilm={this.addNewFilm}
                            />
                        </div>
                    </div>

                    <div
                        className={['md__films-container',
                            'md__films-container--white-text'].join(' ')}
                        ref={(filmsContainer) => {
                            this.filmsContainer = filmsContainer;
                        }}
                    >
                        {this.state.dataArr.map((item, index) => {
                            return (
                                <Link to={`/movies/${item.id}`} key={index}>
                                    <Poster
                                        name={item.name}
                                        imagePath={item.poster}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    handleToggleSidebar() {
        this.setState((prevState) => ({
            openSidebar: !prevState.openSidebar
        }));
    }

    handleOpenAddMovieForm() {
        this.setState(() => ({
            openAddMovieForm: true
        }));
    }

    handleCloseAddMovieForm() {
        this.setState(() => ({
            openAddMovieForm: false
        }));
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

    addNewFilm(film) {
        this.setState((prevState) => ({
            dataArr: prevState.dataArr.concat(film)
        }));
    }

    filterItemsByTitle(string) {
        if (string.length === 0) {
            this.setState(() => ({
                dataArr: LS.get('films')
            }));
        }
        this.setState(() => ({
            dataArr: LS.get('films').filter((item) => {
                return item.title.indexOf(string) !== -1;
            })
        }));
    }
}
