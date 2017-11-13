import React from 'react';
import './app.scss';
import Arrow from './../Arrow/arrow';
import Film from './../Film/film';
import Navbar from './../Navbar/navbar';
import Search from './../Search/serach';
import AddMovie from '../Add_movie/addMovie';
import {Link} from 'react-router-dom';
import LS from './../../../LS';



class App extends React.Component {

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

    componentWillMount(){
        switch (this.props.data) {
            case 'films':
                let films = LS.get('films') || [];
                let addedFilms = LS.get('addedFilms') || [];
                this.setState({dataArr: [...films, ...addedFilms]});
                break;
            case 'tvShows':
                let tvShows = LS.get('tvShows') || [];
                let addedTvShows = LS.get('addedTvShows') || [];
                this.setState({dataArr: [...tvShows, ...addedTvShows]});
                break;
            default:
                films = LS.get('films');
                this.setState({dataArr: films});
        }
    }


    componentWillReceiveProps(nextProps){
        switch (nextProps.data) {
            case 'films':
                let films = LS.get('films') || [];
                let addedFilms = LS.get('addedFilms') || [];
                this.setState({dataArr: [...films, ...addedFilms]});
                break;
            case 'tvShows':
                let tvShows = LS.get('tvShows') || [];
                let addedTvShows = LS.get('addedTvShows') || [];
                this.setState({dataArr: [...tvShows, ...addedTvShows]});
                break;
            default:
                films = LS.get('films') || [];
                this.setState({dataArr: films});
        }
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
                        <Search filterItemsByTitle={this.filterItemsByTitle}/>
                        <Navbar
                            openAddMovieForm={this.state.openAddMovieForm}
                            handleOpenAddMovieForm={this.handleOpenAddMovieForm}
                            isFilmPage = {this.props.data === 'films'}/>
                    </div>
                    <div className="md__add-movie">
                        {this.props.data === 'films' && <AddMovie handleOpenAddMovieForm={this.handleOpenAddMovieForm}
                                    handleCloseAddMovieForm={this.handleCloseAddMovieForm}
                                    isOpen={this.state.openAddMovieForm}
                                    addNewFilm={this.addNewFilm}
                    /> }
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
                        if(item.custom){
                            return(
                            <Link to={`/movies/${item.id}/custom`} key={index}>
                                <Film
                                    title={item.title}
                                    name={item.name}
                                    imagePath={item.poster_path}
                                />
                            </Link>
                            );
                        }
                        let link;
                        switch (this.props.data){
                            case 'films': link = `/movies/${item.id}`;
                            break;
                            case 'tvShows': link = `/tvshows/${item.id}`;
                            break;
                            default: throw new Error('Invalid data');
                        }
                        return (
                            <Link to={link} key={index}>
                            <Film
                                  title={item.title}
                                  name={item.name}
                                  imagePath={item.poster_path}
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
            switch (this.props.data) {
                case 'films':
                    this.setState(() => ({
                        dataArr: LS.get('films')
                    }));
                    break;
                case 'tvShows':
                    this.setState(() => ({
                        dataArr: LS.get('tvShows')
                    }));
                    break;
                default:
                    this.setState(() => ({
                        dataArr: LS.get('films')
                    }));
            }
        }

        switch(this.props.data){
            case 'films':
                this.setState(() => ({
                    dataArr: LS.get('films').filter((item) => {
                        return item.title.indexOf(string) !== -1;
                    })
                }));
                break;
            case 'tvShows':
                this.setState(() => ({
                    dataArr: LS.get('tvShows').filter((item) => {
                        return item.name.indexOf(string) !== -1;
                    })
                }));
                break;
            default: throw new Error('Invalid Data');
        }
    }
}

export default App;