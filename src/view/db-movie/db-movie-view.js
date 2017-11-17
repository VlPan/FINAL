import React from 'react';
import './../shared-style/app.scss';
import {Link} from 'react-router-dom';
import LS from '../../services/LS';
import { connect } from 'react-redux';

import {
    Arrow,
    Poster,
    Navbar,
    SearchInput,
    AddMovie
} from './../../components';

class MovieViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleArrowMove = this.handleArrowMove.bind(this);
        this.filterItemsByTitle = this.filterItemsByTitle.bind(this);
        this.addNewFilm = this.addNewFilm.bind(this);
        this.state = {
            arrow: 'down',
            dataArr: []
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
                            <SearchInput filterItemsByTitle={this.filterItemsByTitle}/>
                            <Navbar
                                isFilmPage={true}/>
                        </div>
                        <div className="md__add-movie">
                            <AddMovie
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

const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const isOpenAddMovieForm = state.addMovieForm.isOpen;
    return { isOpenSidebar, isOpenAddMovieForm };
};

export const MovieView = connect(mapStateToProps)(MovieViewComponent);