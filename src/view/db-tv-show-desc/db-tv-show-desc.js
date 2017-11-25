import React from 'react';
import './db-tv-show-desc.scss';
import './../shared-style/app.scss';
import {connect} from 'react-redux';
import {LS} from '../../services';
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
import {Link} from 'react-router-dom';


export class TvShowDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvShow: {},
            genresFromServer: LS.get('genres'),
            recommended: []
        };
        const entityTvService = new EntityTvService();
        entityTvService.getRecommended(this.props.match.params.id).then((recommendedMovies) => {
            this.setState(() => ({
                recommended: recommendedMovies
            }));
        });
    }

    componentWillMount() {
        let tvShows = LS.get('tvShows').filter((item) => {
            return item.id === parseInt(this.props.match.params.id);
        });
        if (tvShows.length === 0) {
            if(LS.get('addedTvShows')){
                tvShows = LS.get('addedTvShows').filter((item) => {
                    return item.id === this.props.match.params.id;
                });
                this.setState(() => ({tvShow: tvShows[0]}));
            }else{
                const entityTvService = new EntityTvService();
                entityTvService.getTvShowById(this.props.match.params.id).then((tvShow) => {
                    return entityTvService.getRecommended(this.props.match.params.id).then((recommendedTv) => {
                        this.setState(() => ({
                            recommended: recommendedTv,
                            tvShow: tvShow
                        }));
                    });
                });
            }
        }else{
            this.setState(() => ({tvShow: tvShows[0]}));
        }
    }

    componentWillReceiveProps(nextProps) {
        const entityTvService = new EntityTvService();
        entityTvService.getTvShowById(nextProps.match.params.id).then((tvShow) => {
            return entityTvService.getRecommended(this.props.match.params.id).then((recommendedTv) => {
                this.setState(() => ({
                    recommended: recommendedTv,
                    tvShow: tvShow
                }));
            });
        });
    }

    render() {
        if (this.state.tvShow.id) {
            let genres = this.state.genresFromServer.filter((genre) => {
                return this.state.tvShow.genreIds.includes(genre.id);
            });
            if (this.state.tvShow.custom) {
                genres = this.state.tvShow.genreIds;
            }

            console.log(this.state);
            console.log(genres);
            return (
                <div className="md__view-container">
                    <div className="md__container">
                        <Navbar itemsToRender={[{name: 'About'}, {name: 'Pricing'}, {name: 'Blog'}]}/>
                    </div>
                    <div className="md__content-container">
                        <div className="db-tv-show">
                            <div className="db-tv-show__container">
                                <div className="db-tv-show__flex">
                                    <div className="db-tv-show__image">
                                        <img src={this.state.tvShow.poster} alt="Not found"/>
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
                                        compareArray={genres}
                                        readOnly={true}
                                    />
                                    <div className="db-tv-show__flex db-tv-show__flex--column">
                                        <div className="db-tv-show__container">
                                            <div>Popularity</div>
                                            <div> Vote Average</div>
                                        </div>
                                    </div>
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
        }else{
            return (
                <h1>Loading...</h1>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.sidebar.isOpen;
    const genres = state.genresControl.genres;
    const savedItems = state.myLib.savedItems;
    return {isOpenSidebar, genres, savedItems};
};

const mapDispatchToProps = (dispatch) => ({
    saveItem: (item) => dispatch(saveItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item))
});

export const TvShowDescription = connect(mapStateToProps, mapDispatchToProps)(TvShowDescriptionComponent);