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
import {Loader} from 'react-loaders';

export class TvShowDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initTvShow = this.initTvShow.bind(this);
        this.state = {
            tvShow: {},
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        this.baseState = this.state;
    }

    initTvShow(id) {
        let tvShows = LS.get('tvShows').filter((item) => {
            return item.id === parseInt(id);
        });
        if (customLib.arrayIsNotEmpty(tvShows)) {

            const entityTvService = new EntityTvService();
            entityTvService.getRecommended(id).then((recommendedMovies) => {
                this.setState(() => ({
                    recommended: recommendedMovies,
                    tvShow: tvShows[0]
                }));
            });
            return ;
        } else {
            if (LS.get('addedTvShows')) {
                tvShows = LS.get('addedTvShows').filter((item) => {
                    return item.id === id;
                });
                if (customLib.arrayIsNotEmpty(tvShows)) {

                    this.setState(() => ({tvShow: tvShows[0]}));
                    return ;
                }
            }
        }

        if (customLib.arrayIsEmpty(tvShows)) {
            const entityTvService = new EntityTvService();
            entityTvService.getTvShowById(id).then((tvShow) => {
                return entityTvService.getRecommended(id).then((recommendedTv) => {
                    this.setState(() => ({
                        recommended: recommendedTv,
                        tvShow: tvShow
                    }));
                });
            });
        }
    }

    componentWillMount() {
        this.initTvShow(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {

        this.initTvShow(nextProps.match.params.id);
    }

    render() {
        if (!customLib.objectIsEmpty(this.state.tvShow)) {
            let genres = this.state.genresFromServer.filter((genre) => {
                return this.state.tvShow.genreIds.includes(genre.id);
            });
            return (

                <div className="db__content">

                    <div className="db__nav-container">
                        <Navbar modificators={['db-navbar--left-margin']}>
                            <NavLink
                                to="/about"
                                activeClassName="db-about--red-color"
                                className="db-navbar__nav-item">
                                About
                            </NavLink>
                        </Navbar>
                    </div>
                    <div className="db__content-container">
                        <div className="db-tv-show">
                            <div className="db-tv-show__container">
                                <div className="db-tv-show__flex">
                                    <div className="db-tv-show__image">
                                        {this.state.tvShow.poster &&
                                        <img src={this.state.tvShow.poster} alt="Not found"/>
                                        }

                                        {this.state.tvShow.custom &&
                                        <img src={this.state.tvShow.posterImg || '../../assets/img/logo.jpg'}
                                             alt="Not found" className="db-film__image"/>
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
                                {customLib.arrayIsNotEmpty(this.state.recommended) ?
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
                                                        modificators={isAlreadySaved && ['db-poster--green-border']}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    :
                                    !this.state.tvShow.custom &&
                                    <div className="db-tv-show__container">
                                        <div className="db__loading-container">
                                            <Loader type="line-scale" innerClassName="db-lod" color="#f4df42" active/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>


            );
        } else {
            return (
                <div className="db__loading-container">
                    <Loader type="line-scale" innerClassName="db-lod" color="#f4df42" active/>
                </div>
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