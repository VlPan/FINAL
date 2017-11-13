import React from 'react';
import './root.scss';
import Sidebar from './../Sidebar/sidebar';
import MovieDescription from './../MovieDescription/movieDescription';
import TvShowDescription from '../TvShowDescription/tvShowDescription';
import App from './../App/app';
import FilmService from './../../../film-SERVICE';
import LS from './../../../LS';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


class Root extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
        this.state = {
            isOpenSidebar: false,
            dataLoadedFromServer: false
        };

        FilmService.getFilms().then(response => {
            let FilmsArr = JSON.parse(response).results;
            let FilmsArrFiltered = FilmsArr.map((film) => {
                film.poster_path = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
                return film;
            });
            FilmsArrFiltered && LS.set('films', FilmsArrFiltered);
        }).then(()=>{
            FilmService.getTvShows().then(response => {
                let tvShowsArr = JSON.parse(response).results;
                let tvShowsArrFiltered = tvShowsArr.map((tvShow) => {
                    tvShow.poster_path = 'https://image.tmdb.org/t/p/w500' + tvShow.poster_path;
                    return tvShow;
                });
                tvShowsArrFiltered && LS.set('tvShows', tvShowsArrFiltered);
            });
        }).then(() => {
               this.setState(()=>({dataLoadedFromServer: true}));
        });
    }

    render() {
        if(this.state.dataLoadedFromServer) {
            return (
                <Router>
                    <div className="md__main-container  transition-item">
                        <div className={['md__sidebar',
                            'md__sidebar--black-body',
                            'md__sidebar--white-text',
                            this.state.isOpenSidebar && 'md__sidebar--big-width']
                            .join(' ')}
                        >
                            <Sidebar
                                toggleSidebar={this.handleToggleSidebar}
                                openSidebar={this.state.isOpenSidebar}
                            />
                        </div>

                        <Switch>
                                <Route exact path="/" render={() =>
                                    <Redirect to="/movies"/>
                                }/>

                                <Route exact path="/movies"
                                       render={() =>
                                           <App isOpenSidebar={this.state.isOpenSidebar} data={'films'} />
                                          }
                                />
                            <Route exact path="/tvshows"
                                   render={() =>
                                       <App isOpenSidebar={this.state.isOpenSidebar} data={'tvShows'}/>
                                   }
                            />
                            <Route path="/about" component={Sidebar}/>
                            <Route path="/movies/:id/:mod?" component={MovieDescription}/>
                            <Route path="/tvshows/:id" component={TvShowDescription}/>
                        </Switch>
                    </div>
                </Router>
            );
        }
            return <div className="md-loading-title">Loading...</div>;
}
    handleToggleSidebar() {
        this.setState((prevState) => ({
            isOpenSidebar: !prevState.isOpenSidebar
        }));
    }
}

export default Root;