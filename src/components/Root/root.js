import React from 'react';
import './root.scss';
import {connect} from 'react-redux';
import {toggleSidebar} from './../../store/actions';
import {
    initMovies,
    initTvShows,
    initGenres
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
        this.props.initTvShows();
        this.props.initMovies();
        this.props.initGenres();
        LS.get('savedItems') || LS.set('savedItems', []);
    }


    render() {
        console.log('<---------PROOOOOPS-------->', this.props);
        if (customLib.arrayIsNotEmpty(this.props.fullMovies) && customLib.arrayIsNotEmpty(this.props.fullTvShows)) {
            return (
                <Router>
                    <div className="md__main-container">
                        <div className={['md__sidebar',
                            'md__sidebar--black-body',
                            'md__sidebar--white-text',
                            this.props.isOpenSidebar && 'md__sidebar--big-width']
                            .join(' ')}
                        >
                            <Sidebar
                                openSidebar={this.props.isOpenSidebar}
                            >
                                <div className="md-sidebar__line">
                                    <i className="fa fa-th-list md-sidebar__icon md-sidebar__main"
                                       aria-hidden="true"
                                       onClick={this.props.toggleSidebar}
                                    />
                                    {this.props.isOpenSidebar &&
                                    <div className="md-logo">
                                        <div className="md-logo__logo-img"></div>
                                        <div className="md-logo__logo-title">Logo</div>
                                    </div>
                                    }
                                </div>
                                <NavLink to="/movies"
                                         activeClassName="md-sidebar__line--active"
                                         className="md-sidebar__line">
                                    <i className="fa fa-film md-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="md-sidebar__label">
                                        Home
                                    </div>
                                    }
                                </ NavLink>
                                <NavLink to="/tvshows"
                                         activeClassName="md-sidebar__line--active"
                                         className="md-sidebar__line">
                                    <i className="fa fa-file-video-o md-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="md-sidebar__label">
                                        Tv Shows
                                    </div>
                                    }
                                </ NavLink>
                                <NavLink to="/mylibrary"
                                         activeClassName="md-sidebar__line--active"
                                         className="md-sidebar__line">
                                    <i className="fa fa-history md-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="md-sidebar__label">
                                        My Library {LS.get('savedItems') &&
                                    <div className="md-sidebar__count">
                                        {LS.get('savedItems').length > 0 &&
                                        LS.get('savedItems').length
                                        }
                                    </div>}
                                    </div>
                                    }
                                </ NavLink>
                                <NavLink to="/support"
                                         activeClassName="md-sidebar__line--active"
                                         className="md-sidebar__line">
                                    <i className="fa fa-question md-sidebar__icon" aria-hidden="true"></i>
                                    {this.props.isOpenSidebar &&
                                    <div className="md-sidebar__label">
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
                <div className="md__loading-container">
                    <Loader type="line-scale" innerClassName="md-lod" color="#f4df42" active/>;
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
        fullTvShows
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar: () => dispatch(toggleSidebar()),
    initMovies: () => dispatch(initMovies()),
    initTvShows: () => dispatch(initTvShows()),
    initGenres: () => dispatch(initGenres())
});

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootComponent);
