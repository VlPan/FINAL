import React from 'react';
import './root.scss';
import { connect } from 'react-redux';
import { toggleSidebar } from './../../store/actions';
import { sendRequestToServer } from './../../store/actions';
import { checkDataInLocalStorage } from './../../store/actions';
import {
    MovieDescription,
    TvShowDescription,
    Sidebar
} from './../../components';


import {MovieView} from '../../view/db-movie/db-movie-view';
import {TvShowView} from '../../view/db-tvshow/db-tvshow-view';
import {EntityMovieService} from './../../services/movie-entity.service';
import {EntityTvService} from './../../services/tv-entity.service';
import LS from './../../services/LS';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


class RootComponent extends React.Component {



    constructor(props) {
        super(props);
        LS.remove('films');
        LS.remove('tvShows');
        LS.remove('genres');
        this.props.sendRequestToServer();

        // this.state = {
        //     dataLoadedFromServer: false
        // };
        //
        // let entityMovieService = new EntityMovieService();
        // let entityTvService = new EntityTvService();
        //
        // entityMovieService.getMovieEntities().then((movies) => {
        //     LS.set('films', movies);
        // }).then(() => {
        //     entityTvService.getTvEntities().then((tvShows) => {
        //         LS.set('tvShows', tvShows);
        //     });
        // }).then(()=>{
        //     this.setState(()=>({dataLoadedFromServer: true}));
        // });
    }

    // componentWillMount(){
    //
    // }

    render() {
        if (this.props.loaded) {
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
                            <Route path="/about" component={Sidebar}/>
                            <Route path="/movies/:id" component={MovieDescription}/>
                            <Route path="/tvshows/:id" component={TvShowDescription}/>
                        </Switch>
                    </div>
                </Router>
            );
        } else{
            return <div className="md-loading-title">Loading...</div>;
        }
    }
}


const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const loaded = state.dataControl.dataLoadedFromServer;
    return {
        isOpenSidebar,
        loaded
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar: () => dispatch(toggleSidebar()),
    sendRequestToServer: () => dispatch(sendRequestToServer())
});

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootComponent);
