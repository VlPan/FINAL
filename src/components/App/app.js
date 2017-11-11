import React from 'react';
import './app.scss';
import Arrow from './../Arrow/arrow';
import Film from './../Film/film';
import Navbar from './../Navbar/navbar';
import Sidebar from './../Sidebar/sidebar';
import Search from './../Search/serach';
import AddMovie from '../Add_movie/addMovie';
import filmsArr from './../../../data.json';
import FilmService from './../../../film-SERVICE';
import MainPage from './../MainPage';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


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
            openAddMovieForm: false,
            openSidebar: false

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
            <Router>
            <div className="md__main-container">

                    <div className={['md__sidebar',
                        'md__sidebar--black-body',
                        'md__sidebar--white-text',
                        this.state.openSidebar && 'md__sidebar--big-width']
                        .join(' ')}>
                        <Sidebar toggleSidebar={this.handleToggleSidebar} openSidebar={this.state.openSidebar}/>

                    </div>
            <Route exact path="/" component={MainPage} />
        </div >
            </Router>
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