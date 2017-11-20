import React from 'react';
import './db-tv-show-desc.scss';
import LS from '../../services/LS';
import {Genrebox} from '../db-genrebox/db-genrebox';
import {Navbar} from '../db-nav/db-nav';


export class TvShowDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvShow: {},
            genresFromServer: LS.get('genres')
        };
        }

    componentWillMount() {
        const tvShow = LS.get('tvShows').filter((item) => {
            return item.id === parseInt(this.props.match.params.id);
        });
        this.setState(() => ({tvShow: tvShow[0]}));
    }

    render() {
        let genres = this.state.genresFromServer.filter((genre)=>{
            return this.state.tvShow.genreIds.includes(genre.id);
        });
        return (
            <div>
                <Navbar/>
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
                            <Genrebox genres={genres}/>
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
        );
    }
}