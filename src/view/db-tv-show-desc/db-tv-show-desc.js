import React from 'react';
import './db-tv-show-desc.scss';
import './../shared-style/app.scss';
import {connect} from 'react-redux';
import {LS, customLib} from '../../services';
import {
    saveItem,
    deleteItem
} from '../../store/actions';
import {
    Navbar,
    Poster,
    SelectorBox
} from '../../components/';
import {EntityTvService} from '../../services';
import {Link, NavLink} from 'react-router-dom';
import Slider from 'react-rangeslider';


export class TvShowDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvShow: null,
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        if (!props.custom) {
            const entityTvService = new EntityTvService();
            entityTvService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
                this.setState(() => ({
                    recommended: recommendedMovies
                }));
            });
        }
    }


    componentWillMount() {
        let tvShows = LS.get('tvShows').filter((item) => {
            return item.id === parseInt(this.props.match.params.id);
        });
        if (customLib.arrayIsNotEmpty(tvShows)) {
            console.log('TV IN LS');
            this.setState(() => ({tvShow: tvShows[0]}));
        } else {
            if (LS.get('addedTvShows')) {
                tvShows = LS.get('addedTvShows').filter((item) => {
                    return item.id === this.props.match.params.id;
                });
                if (customLib.arrayIsNotEmpty(tvShows)) {
                    console.log('TV IN LS 2');
                    this.setState(() => ({tvShow: tvShows[0]}));
                }
            }
        }

        if (customLib.arrayIsEmpty(tvShows)) {
            const entityTvService = new EntityTvService();
            entityTvService.getTvShowById(this.props.match.params.id).then((tvShow) => {
                return entityTvService.getRecommended(this.props.match.params.id).then((recommendedTv) => {
                    console.log('SET STATE');
                    this.setState(() => ({
                        recommended: recommendedTv,
                        tvShow: tvShow
                    }));
                });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let tvShows = LS.get('tvShows').filter((item) => {
            return item.id === parseInt(nextProps.match.params.id);
        });
        if (customLib.arrayIsNotEmpty(tvShows)) {
            console.log('TV IN LS');
            this.setState(() => ({tvShow: tvShows[0]}));
        } else {
            if (LS.get('addedTvShows')) {
                tvShows = LS.get('addedTvShows').filter((item) => {
                    return item.id === nextProps.match.params.id;
                });
                if (customLib.arrayIsNotEmpty(tvShows)) {
                    console.log('TV IN LS 2');
                    this.setState(() => ({tvShow: tvShows[0]}));
                }
            }
        }

        if (customLib.arrayIsEmpty(tvShows)) {
            const entityTvService = new EntityTvService();
            entityTvService.getTvShowById(nextProps.match.params.id).then((tvShow) => {
                return entityTvService.getRecommended(nextProps.match.params.id).then((recommendedTv) => {
                    console.log('SET STATE');
                    this.setState(() => ({
                        recommended: recommendedTv,
                        tvShow: tvShow
                    }));
                });
            });
        }
    }

    render() {
        console.log('RENDER');
        if (this.state.tvShow) {
            let genres = this.state.genresFromServer.filter((genre) => {
                return this.state.tvShow.genreIds.includes(genre.id);
            });
            return (

                <div className="md__content">

                    <div className="md__nav-container">
                        <Navbar>
                            <NavLink
                                to="/about"
                                activeClassName="md-about--red-color"
                                className="md-navbar__nav-item">
                                About
                            </NavLink>
                        </Navbar>
                    </div>
                    <div className="md__content-container">
                        <div className="db-tv-show">
                            <div className="db-tv-show__container">
                                <div className="db-tv-show__flex">
                                    <div className="db-tv-show__image">
                                        {this.state.tvShow.poster &&
                                        <img src={this.state.tvShow.poster} alt="Not found"/>
                                        }

                                        {this.state.tvShow.custom &&
                                        <img src="../../assets/img/logo.jpg" alt="Not found"/>
                                        }
                                    </div>
                                    <div className="db-tv-show__info">
                                        <div className="db-tv-show__name">
                                            {this.state.tvShow.name}
                                        </div>

                                        <div className="db-tv-show__desc">
                                            <p>{this.state.tvShow.desc}</p>
                                            <p>{this.state.tvShow.desc}</p>
                                            <p>{this.state.tvShow.desc}</p>
                                            <p>{this.state.tvShow.desc}</p>
                                            <p>{this.state.tvShow.desc}</p>
                                            <p>{this.state.tvShow.desc}</p>
                                            <p>{this.state.tvShow.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="db-tv-show__flex">
                                    <SelectorBox
                                        array={LS.get('genres')}
                                        chunk={4}
                                        compareArray={genres.map(genre => genre.name)}
                                        readOnly={true}
                                    />
                                    {!this.state.tvShow.custom &&
                                    <div className="db-movie__flex db-movie__flex--column">
                                        <div className="db-movie__container ">
                                            <div>Popularity</div>
                                            <div className="slider slider--yellow">
                                                <Slider
                                                    min={0}
                                                    max={1000}
                                                    step={50}
                                                    value={this.state.tvShow.popularity}
                                                />
                                            </div>
                                            <div> Vote Average</div>
                                            <div className="slider slider--green">
                                                <Slider
                                                    min={0}
                                                    max={10}
                                                    step={0.3}
                                                    value={this.state.tvShow.vote}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                                {this.state.recommended &&
                                <div className="db-tv-show__recommended">
                                    {this.state.recommended.map((item, index) => {
                                        let isAlreadySaved = LS.get('savedItems').filter((savedItem) => savedItem.id === item.id).length > 0;
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
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>


            );
        } else {
            return (
                <h1>Loading...</h1>
            );
        }
    }
}

const
    mapStateToProps = (state) => {
        const isOpenSidebar = state.layout.isOpenSidebar;
        const genres = state.genresControl.genres;
        const savedItems = state.myLib.savedItems;
        return {isOpenSidebar, genres, savedItems};
    };

const
    mapDispatchToProps = (dispatch) => ({
        saveItem: (item) => dispatch(saveItem(item)),
        deleteItem: (item) => dispatch(deleteItem(item))
    });

export const
    TvShowDescription = connect(mapStateToProps, mapDispatchToProps)(TvShowDescriptionComponent);