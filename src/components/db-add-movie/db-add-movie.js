import React from 'react';
import './db-add-movie.scss';
import FilmService from './../../../film-SERVICE';
import uuidv4 from 'uuid/v4';


export class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseAddMovieForm = this.handleCloseAddMovieForm.bind(this);
        this.change = this.change.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.uploadPoster = this.uploadPoster.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.saveMovie = this.saveMovie.bind(this);

        this.state = {
            title: '',
            overview: '',
            genre: [],
            isAdult: false,
            posters: 0,
            genresFromServer: []
        };

        FilmService.getGenres().then(response => {
            this.setState(()=>({
                genresFromServer: JSON.parse(response).genres
            }));
        });

        console.log(this.state.genresFromServer);
    }


    checkValidation(){
        if(this.state.title && this.state.overview && this.state.posters !== 0 ){
            return false;
        }
        return true;
    }

    handleCloseAddMovieForm(e) {
        e.preventDefault();
        this.props.handleCloseAddMovieForm();
    }

    change(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(() => ({
            [name]: value
        }));
    }

    changeGenre(e) {
        const target = e.target;
        const value = target.value;
        if (target.checked === true) {
            this.setState((prevState) => ({
                genre: prevState.genre.concat(value)
            }));
        } else {
            this.setState((prevState) => ({
                genre: prevState.genre.filter((item) => {
                    return item !== value;
                })
            }));
        }
    }

    uploadPoster(){
        this.setState((prevState) => ({
            posters: prevState.posters += 1
        }));
    }

    saveMovie(e){
        e.preventDefault();
        let addedFilms = JSON.parse(localStorage.getItem('addedFilms'));

        if(!addedFilms){
            addedFilms = [];
        }

            let genre_ids = this.state.genresFromServer.filter((genre)=>{
                return this.state.genre.includes(genre.name);
            });
            const newMovie = {
                title: this.state.title,
                overview: this.state.overview,
                genre_ids: genre_ids,
                adult: this.state.isAdult,
                id: uuidv4(),
                custom: true
            };
            addedFilms.push(newMovie);
            localStorage.setItem('addedFilms', JSON.stringify(addedFilms));
            this.props.addNewFilm(newMovie);
    }



    render() {
        return (
            <div className={['md-add-movie', !this.props.isOpen && 'md-add-movie--hide'].join(' ')}>
                <h1 className="md-add-movie__title">Add Movie</h1>
                <form className="md-add-movie__form">
                    <div className="md-add-movie__main-params">
                        <label htmlFor="">title</label>
                        <input type="text" name="title" value={this.state.value} onChange={this.change}/>
                        {!this.state.title &&
                        <div className="md-add-movie__error">Title is required</div>
                        }
                        <label>Overview</label>
                        <textarea name="overview" cols="30" rows="10" onChange={this.change}></textarea>
                        {!this.state.overview &&
                        <div className="md-add-movie__error">Overview is required</div>
                        }
                    </div>
                    <div className="md-add-movie__genre">
                        <label htmlFor="">Genre</label>
                        <div className="md-add-movie__box" onClick={this.changeGenre}>
                            <div className="md-add-movie__column">
                                <div>
                                    <input type="checkbox" name="genre" value="Action"/>
                                    <label>Action</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Adventure"/>
                                    <label>Adventure</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Thriller"/>
                                    <label>Thriller</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Comedy"/>
                                    <label>Comedy</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Drama"/>
                                    <label>Drama</label>
                                </div>
                            </div>

                            <div className="md-add-movie__column">
                                <div>
                                    <input type="checkbox" name="genre" value="Horror"/>
                                    <label>Horror</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Action"/>
                                    <label>Action</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Action"/>
                                    <label>Criminal</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="War"/>
                                    <label>War</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="genre" value="Documentary"/>
                                    <label>Documentary</label>
                                </div>
                            </div>
                        </div>
                        {this.state.genre.length === 0 && <div className="md-add-movie__error">Genre is required</div>}
                        <div>
                            <input type="checkbox" name="isAdult" onChange={this.change}/>
                            <label htmlFor="Action">Adult</label>
                        </div>
                    </div>

                    <div className="md-add-movie__img-upload">
                        <input type="file" onChange={this.uploadPoster}/><br/>
                        {this.state.posters === 0 && <div className="md-add-movie__error">Upload one poster as minimum</div>}
                        <button disabled={this.checkValidation()} onClick={this.saveMovie}>Add</button>
                        <button onClick={this.handleCloseAddMovieForm}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}
