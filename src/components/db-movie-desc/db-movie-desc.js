import React from 'react';
import './db-movie-desc.scss';
import LS from '../../services/LS';



export class MovieDescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            film: {}
        };
    }

    componentWillMount(){
            let film = LS.get('films').filter((item) => {
                return item.id === parseInt(this.props.match.params.id);
            });
            if (film.length === 0) {
                film = LS.get('addedFilms').filter((item) => {
                    return item.id === this.props.match.params.id;
                });
            }
            this.setState(() => ({film: film[0]}));
    }

    render() {
        return (
            <div>
                TITLE: <h1>{this.state.film.name}</h1>
                OVERVIEW: <h1>{this.state.film.desc}</h1>
                {this.state.film.custom ? 'This is CUSTOM IMAGE' :
                    <img src={this.state.film.poster} alt="Not Found"/>
                }
            </div>
        );
    }
}