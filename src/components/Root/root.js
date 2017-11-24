import React from 'react';
import './root.scss';
import {connect} from 'react-redux';
import {toggleSidebar} from './../../store/actions';
import {
    sendRequestToServer,
    initMovies,
    initTvShows,
    initGenres
} from './../../store/actions';
import {
    MovieDescription,
    TvShowDescription,
    Sidebar
} from './../../components';
import{PageNotFound} from '../../view/db-not-found/db-page-not-found';

import {MovieView} from '../../view/db-movie/db-movie-view';
import {TvShowView} from '../../view/db-tvshow/db-tvshow-view';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';



class RootComponent extends React.Component {


    constructor(props) {
        super(props);
        this.props.initTvShows();
        this.props.initMovies();
        this.props.initGenres();
    }


    render() {
        console.log('<---------PROOOOOPS-------->', this.props);
        if (this.props.initialMovies.length && this.props.initialTvShows.length) {
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
                                itemsToRender={
                                    [
                                        {
                                            name: 'Home',
                                            iconClass: 'film',
                                            linkTo: '/movies'
                                        },
                                        {
                                            name: 'Tv Show',
                                            iconClass: 'file-video-o',
                                            linkTo: '/tvshows'
                                        },
                                        {
                                            name: 'Library',
                                            iconClass: 'history',
                                            linkTo: '/mylibrary',
                                            count: 5
                                        },
                                        {
                                            name: 'About',
                                            iconClass: 'question',
                                            linkTo: '/about'
                                        }
                                    ]
                                }
                                toggleSidebar={this.props.toggleSidebar}
                                openSidebar={this.props.isOpenSidebar}
                            />
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
                            <Route path="/movies/:id" component={MovieDescription}/>
                            <Route path="/tvshows/:id" component={TvShowDescription}/>
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </Router>
            );
        } else {
            return <div className="md-loading-title">Loading...</div>;
        }
    }
}


const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const movies = state.movieControl.movies;
    const tvShows = state.tvShowsControl.tvShows;
    const genres = state.genresControl.genres;
    const initialMovies = state.movieControl.initialMovies;
    const initialTvShows = state.tvShowsControl.initialTvShows;
    const initialGenres = state.tvShowsControl.initialGenres;
    return {
        isOpenSidebar,
        movies,
        tvShows,
        genres,
        initialMovies,
        initialTvShows,
        initialGenres
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar: () => dispatch(toggleSidebar()),
    initMovies: () => dispatch(initMovies()),
    initTvShows: () => dispatch(initTvShows()),
    initGenres: () => dispatch(initGenres())
});

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootComponent);
