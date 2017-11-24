import React from 'react';
import './db-tv-show-desc.scss';
import './../shared-style/app.scss';
import {LS} from '../../services';
import {
    Navbar,
    Poster,
    SelectorBox
} from '../../components/';

export class TvShowDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvShow: {},
            genresFromServer: LS.get('genres')
        };
    }

    componentWillMount() {
        let tvShows = LS.get('tvShows').filter((item) => {
            return item.id === parseInt(this.props.match.params.id);
        });
        if (tvShows.length === 0) {
            tvShows = LS.get('addedTvShows').filter((item) => {
                return item.id === this.props.match.params.id;
            });
        }
        this.setState(() => ({tvShow: tvShows[0]}));
    }

    render() {
        let genres = this.state.genresFromServer.filter((genre) => {
            return this.state.tvShow.genreIds.includes(genre.id);
        });
        if (this.state.tvShow.custom) {
            genres = this.state.tvShow.genreIds;
        }
        return (
            <div>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}