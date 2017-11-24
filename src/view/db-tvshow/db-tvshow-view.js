import React from 'react';
import './../shared-style/app.scss';
import {Link} from 'react-router-dom';
import {LS} from '../../services';
import {connect} from 'react-redux';
import {
    openAddMovieForm,
    filterTvShowsByName,
    addTvShow
} from '../../store/actions';
import {Input} from '../../components/FormControls';
import {
    Arrow,
    Poster,
    Navbar,
    AddMovie
} from './../../components';

export class TvShowViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleArrowMove = this.handleArrowMove.bind(this);
        this.filterItemsByTitle = this.filterItemsByTitle.bind(this);
        this.state = {
            arrow: 'down'
        };
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
                                       placeholder="Search Tv SHows"
                                />
                                <div className="md-search__box">
                                    <i className="fa fa-search md-search__icon" aria-hidden="true"></i>
                                </div>
                            </div>
                            <Navbar
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
                                    Add TvShow
                                </li>
                            </Navbar>
                        </div>
                        <div className="md__add-movie">
                            {this.props.genres &&
                            <AddMovie
                                addNewItemToArray={this.props.addTvShow}
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
                        {this.props.tvShows.map((item, index) => {
                            return (
                                <Link to={`/tvshows/${item.id}`} key={index}>
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

    // addNewFilm(film) {
    //     this.setState((prevState) => ({
    //         dataArr: prevState.dataArr.concat(film)
    //     }));
    // }

    filterItemsByTitle(e) {
        let string = e.target.value;
        this.props.filterTvShowsByName(string);
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const isOpenAddMovieForm = state.addMovieForm.isOpen;
    const tvShows = state.tvShowsControl.tvShows;
    const genres = state.genresControl.genres;
    return {isOpenSidebar, isOpenAddMovieForm, tvShows, genres};
};

const mapDispatchToProps = (dispatch) => ({
    openAddMovieForm: () => dispatch(openAddMovieForm()),
    filterTvShowsByName: (string) => dispatch(filterTvShowsByName(string)),
    addTvShow: (tvShow) => dispatch(addTvShow(tvShow))
});

export const TvShowView = connect(mapStateToProps, mapDispatchToProps)(TvShowViewComponent);