import React from 'react';
import './../shared-style/app.scss';
import {Link, NavLink} from 'react-router-dom';
import {LS} from '../../services';
import {connect} from 'react-redux';
import {
    openAddItemForm,
    filterTvShowsByName,
    addTvShow,
    closeAddItemForm,
    saveItem,
    deleteItem,
    filterTvShowsAdvanced,
    toggleSearch,
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


export class TvShowViewComponent extends React.Component {

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

    componentWillUnmount() {
        this.props.closeAddItemForm();
        this.props.closeSearch();
        this.props.filterTvShowsByName('');
    }

    render() {
        return (
            <div className="md__flex-box">
                {
                    this.props.isOpenSidebar &&
                    <Arrow
                        arrowIsDown={this.state.arrowIsDown}
                        onClick={this.changingArrow.bind(this)}
                        modificators={['md-arrow--black-body', 'md-arrow--position-fixed', 'md-arrow--big-left-margin']}
                    />
                }
                <div className="md__content">
                    <div className="md__navbar__navbar--white-text">
                        <div className="md__nav-container">

                            <div className="md-search">
                                <Input onKeyUpHandler={this.filterItemsByName}
                                       className="md-search__input"
                                       placeholder="Search Tv SHows"
                                />
                                <div className="md-search__container" >
                                    <div className="md-search__box" onClick={this.props.toggleSearch}>
                                        <i className="fa fa-search md-search__icon"
                                           aria-hidden="true"

                                        ></i>
                                    </div>
                                    <AdvancedSearch
                                        title="Advanced Search by Tv Shows"
                                        filterItemsAdvanced={this.props.filterTvShowsAdvanced}
                                        rememberFrom={LS.get('filterOptionsTvs')}
                                    />
                                    {LS.get('filterOptionsTvs') &&
                                    <div className="md-search__box md-search__box--black-box" onClick={() => {
                                        localStorage.removeItem('filterOptionsTvs');
                                        this.props.filterTvShowsAdvanced({});
                                    }}>
                                        <i className="fa fa-ban md-search__icon md-search__icon--red-icon"
                                           aria-hidden="true"
                                        ></i>
                                    </div>
                                    }
                                </div>
                            </div>
                            <Navbar
                                modificators={['md-navbar--left-margin']}
                                openAddMovieForm={this.props.openAddItemForm}
                                isOpenAddMovieForm={this.props.isOpenAddItemForm}
                            >
                                <li
                                    className={['md-navbar__nav-item',
                                        this.props.isOpenAddItemForm && 'md-navbar__nav-item--red-text'].join(' ')}
                                    onClick={this.props.openAddItemForm}>
                                    Add TvShow
                                </li>
                                <NavLink
                                    to="/about"
                                    activeClassName="md-about--red-color"
                                    className="md-navbar__nav-item">
                                    About
                                </NavLink>
                            </Navbar>
                        </div>
                    </div>

                    <div
                        className={['md__content-container',
                            'md__films-container--white-text', 'md__content-container--flex'].join(' ')}
                        ref={(filmsContainer) => {
                            this.filmsContainer = filmsContainer;
                        }}
                        onScroll={this.scrollingHandler.bind(this)}
                    >
                        <div className="md__add-movie">
                            {this.props.genres &&
                            <AddItemForm
                                title="Tv Show"
                                addNewItemToArray={this.props.addTvShow}
                                arrToRender={LS.get('genres')}
                            />
                            }
                        </div>
                        {this.props.tvShows.map((item, index) => {
                            let isAlreadySaved = LS.get('savedItems').filter((savedItem) => savedItem.id === item.id).length > 0;
                            console.log(isAlreadySaved);
                            return (
                                <Link to={`/tvshows/${item.id}`} key={index}>
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
        this.props.filterTvShowsByName(string);
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.layout.isOpenSidebar;
    const isOpenAddItemForm = state.layout.isOpenAddForm;
    const tvShows = state.tvShowsControl.tvShows;
    const genres = state.genresControl.genres;
    const savedItems = state.myLib.savedItems;
    return {isOpenSidebar, isOpenAddItemForm, tvShows, genres, savedItems};
};

const mapDispatchToProps = (dispatch) => ({
    openAddItemForm: () => dispatch(openAddItemForm()),
    closeAddItemForm: () => dispatch(closeAddItemForm()),
    toggleSearch: () => dispatch(toggleSearch()),
    closeSearch: () => dispatch(closeSearch()),
    filterTvShowsByName: (string) => dispatch(filterTvShowsByName(string)),
    addTvShow: (tvShow) => dispatch(addTvShow(tvShow)),
    saveItem: (item) => dispatch(saveItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    filterTvShowsAdvanced: (searchOptions) => dispatch(filterTvShowsAdvanced(searchOptions))
});

export const TvShowView = connect(mapStateToProps, mapDispatchToProps)(TvShowViewComponent);