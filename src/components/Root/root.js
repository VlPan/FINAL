import React from 'react';
import './root.scss';
import {connect} from 'react-redux';
import {toggleSidebar} from './../../store/actions';
import {
    initMovies,
    initTvShows,
    initGenres,
    initMyLib
} from './../../store/actions';
import {
    MovieDescription,
    TvShowDescription,
    Sidebar
} from './../../components';
import {PageNotFound} from '../../view/db-not-found/db-page-not-found';

import {MovieView} from '../../view/db-movie/db-movie-view';
import {TvShowView} from '../../view/db-tvshow/db-tvshow-view';
import {MyLibView} from '../../view/db-mylib/db-mylib-view';
import {Support} from '../../view/db-support/db-support';
import {About} from '../../view/db-about/db-about';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';
import {LS, customLib} from '../../services';
import {Loader} from 'react-loaders';


class RootComponent extends React.Component {


    constructor(props) {
        super(props);
        this.props.initMovies();
        this.props.initTvShows();
        this.props.initGenres();
        this.props.initMyLib();
        LS.get('savedItems') || LS.set('savedItems', []);
    }


    render() {
        let unwatchedItemsNumber = this.props.fullItems && this.props.fullItems.filter(item => !item.watched).length;
        if (customLib.arrayIsNotEmpty(this.props.fullMovies)
            && customLib.arrayIsNotEmpty(this.props.fullTvShows)
            && customLib.arrayIsNotEmpty(this.props.genres)) {
            return (
                <Router>
                    <div className="db__main-container">
                        <div className={['db__sidebar',
                            'db__sidebar--black-body',
                            'db__sidebar--white-text',
                            this.props.isOpenSidebar && 'db__sidebar--big-width']
                            .join(' ')}
                        >
                            <Sidebar
                                openSidebar={this.props.isOpenSidebar}
                            >
                                <div className="db-sidebar__line">
                                    <i className="fa fa-th-list db-sidebar__icon db-sidebar__main"
                                       aria-hidden="true"
                                       onClick={this.props.toggleSidebar}
                                    />
                                    {this.props.isOpenSidebar &&
                                    <div className="db-logo">
                                        <div className="db-logo__logo-img"></div>
                                        <div className="db-logo__logo-title">Logo</div>
                                    </div>
                                    }
                                </div>
                                <NavLink to="/movies"
                                         activeClassName="db-sidebar__line--active"
                                         className="db-sidebar__line">
                                    <i className="fa fa-film db-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="db-sidebar__label">
                                        Home
                                    </div>
                                    }
                                </ NavLink>
                                <NavLink to="/tvshows"
                                         activeClassName="db-sidebar__line--active"
                                         className="db-sidebar__line">
                                    <i className="fa fa-file-video-o db-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="db-sidebar__label">
                                        Tv Shows
                                    </div>
                                    }
                                </ NavLink>
                                <NavLink to="/mylibrary"
                                         activeClassName="db-sidebar__line--active"
                                         className="db-sidebar__line">
                                    <i className="fa fa-history db-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="db-sidebar__label">
                                        My Library
                                        <div className="db-sidebar__count">
                                            {unwatchedItemsNumber > 0 &&
                                            unwatchedItemsNumber
                                            }
                                        </div>
                                    </div>
                                    }
                                </ NavLink>
                                <NavLink to="/support"
                                         activeClassName="db-sidebar__line--active"
                                         className="db-sidebar__line">
                                    <i className="fa fa-question db-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="db-sidebar__label">
                                        Support
                                    </div>
                                    }
                                </ NavLink>
                            </Sidebar>
                        </div>

                        <Switch>
                            <Route exact path="/" render={() =>
                                <Redirect to="/movies"/>
                            }/>

                            <Route exact path="/movies"
                                   render={(props) =>
                                       <MovieView {...props} />
                                   }
                            />
                            <Route exact path="/tvshows"
                                   render={(props) =>
                                       <TvShowView {...props}/>
                                   }
                            />
                            <Route exact path="/mylibrary"
                                   render={(props) =>
                                       <MyLibView {...props}/>
                                   }
                            />
                            <Route exact path="/support"
                                   render={(props) =>
                                       <Support {...props}/>
                                   }
                            />
                            <Route exact path="/about"
                                   render={(props) =>
                                       <About {...props}/>
                                   }
                            />
                            <Route path="/movies/:id" component={MovieDescription}/>
                            <Route path="/tvshows/:id" component={TvShowDescription}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </div>
                </Router>
            );
        } else {
            return (
                <div className="db__loading-container">
                    <Loader type="line-scale" innerClassName="db-lod" color="#f4df42" active/>;
                </div>
            );

        }
    }
}


const mapStateToProps = (state) => {
    const isOpenSidebar = state.layout.isOpenSidebar;
    const movies = state.movieControl.movies;
    const tvShows = state.tvShowsControl.tvShows;
    const genres = state.genresControl.genres;
    const fullMovies = state.movieControl.fullMovies;
    const fullTvShows = state.tvShowsControl.fullTvShows;
    const initialMovies = state.movieControl.initialMovies;
    const initialTvShows = state.tvShowsControl.initialTvShows;
    const initialGenres = state.tvShowsControl.initialGenres;
    const savedItems = state.myLib.savedItems;
    const fullItems = state.myLib.fullItems;
    return {
        isOpenSidebar,
        movies,
        tvShows,
        genres,
        initialMovies,
        fullMovies,
        initialTvShows,
        initialGenres,
        savedItems,
        fullTvShows,
        fullItems
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar: () => dispatch(toggleSidebar()),
    initMovies: () => dispatch(initMovies()),
    initTvShows: () => dispatch(initTvShows()),
    initGenres: () => dispatch(initGenres()),
    initMyLib: () => dispatch(initMyLib())
});

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootComponent);
