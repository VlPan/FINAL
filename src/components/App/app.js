import React from 'react';
import './app.scss';
import Arrow from './../Arrow/arrow';
import Film from './../Film/film';
import Navbar from './../Navbar/navbar';
import Search from './../Search/serach';
import AddMovie from '../Add_movie/addMovie';
import filmsArr from './../../../data.json';
import FilmService from './../../../film-SERVICE';

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleArrowMove = this.handleArrowMove.bind(this);
        this.filterFilmsByTitle = this.filterFilmsByTitle.bind(this);
        this.handleOpenAddMovieForm = this.handleOpenAddMovieForm.bind(this);
        this.handleCloseAddMovieForm = this.handleCloseAddMovieForm.bind(this);
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.addNewFilm = this.addNewFilm.bind(this);
        this.state = {
            arrow: 'down',
            filmsArr: [],
            openAddMovieForm: false
        };
    }

    componentWillMount() {
        FilmService.getData().then(response => {
            let FilmsArr = JSON.parse(response).results;
            let FilmsArrFiltered = FilmsArr.map((film) => {
                film.poster_path = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
                return film;
            });
            localStorage.setItem('films', JSON.stringify(FilmsArrFiltered));
            let addedFilms = [];
            if (localStorage.getItem('addedFilms')) {
                addedFilms = JSON.parse(localStorage.getItem('addedFilms'));
            }
            this.setState({filmsArr: [...FilmsArrFiltered, ...addedFilms]});
        });
    }

    render() {

        return (
            <div className="md__flex-box">
                {
                    this.props.isOpenSidebar &&
                    <Arrow arrowState={this.state.arrow} handleArrowMove={this.handleArrowMove}/>
                }

            <div className="md__content">
                <div className={['md__navbar',
                    'md__navbar--white-text'
                ].join(' ')}>
                    <div className="md__container">
                        <Search filterFilmsByTitle={this.filterFilmsByTitle}/>
                        <Navbar
                            openAddMovieForm={this.state.openAddMovieForm}
                            filterFilmsByTitle={this.filterFilmsByTitle}
                            handleOpenAddMovieForm={this.handleOpenAddMovieForm}/>
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
                    {this.state.filmsArr.map((film, index) => {
                        return (
                            <Film key={index} title={film.title} imagePath={film.poster_path}/>
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
        console.log(this.state.openAddMovieForm);
    }

    // handleMouseMove(event) {
    //     let rect = this.filmsContainer.getBoundingClientRect();
    //     console.log(rect.top, rect.right, rect.bottom, rect.left);
    //     if (event.pageY > this.filmsContainer.clientHeight) {
    //         this.setState(() => ({arrow: 'up'}));
    //     } else {
    //         this.setState(() => ({arrow: 'down'}));
    //     }
    // }

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
            filmsArr: prevState.filmsArr.concat(film)
        }));
    }

    filterFilmsByTitle(title) {
        if (title.length === 0) {
            this.setState(() => ({
                filmsArr: filmsArr
            }));
        }
        this.setState(() => ({
            filmsArr: filmsArr.filter((item) => {
                return item.title.indexOf(title) !== -1;
            })
        }));
    }
}

export default App;