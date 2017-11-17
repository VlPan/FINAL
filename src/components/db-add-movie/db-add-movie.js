import React from 'react';
import './db-add-movie.scss';
import { EntityGenresService } from '../../services/genres.entity.service';
import { closeAddMovieForm } from './../../store/actions';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';


export class AddMovieComponent extends React.Component {



    constructor(props) {
        super(props);
        this.handleCloseAddMovieForm = this.handleCloseAddMovieForm.bind(this);
        this.change = this.change.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.uploadPoster = this.uploadPoster.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.saveMovie = this.saveMovie.bind(this);

        this.state = {
            name: '',
            desc: '',
            genre: [],
            isAdult: false,
            posters: 0,
            genresFromServer: []
        };

        const entityGenresService = new EntityGenresService();

        entityGenresService.getGenres().then(genres => {
            console.log(genres);
            this.setState(()=>({
                genresFromServer: genres
            }));
        });
    }


    checkValidation(){
        if(this.state.name && this.state.desc && this.state.posters !== 0 ){
            return false;
        }
        return true;
    }

    handleCloseAddMovieForm(e) {
        e && e.preventDefault();
        this.props.closeAddMovieForm();
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
                name: this.state.name,
                desc: this.state.desc,
                genre_ids: genre_ids,
                adult: this.state.isAdult,
                id: uuidv4(),
                custom: true
            };
            addedFilms.push(newMovie);
            localStorage.setItem('addedFilms', JSON.stringify(addedFilms));
            this.props.addNewFilm(newMovie);
            this.handleCloseAddMovieForm();
    }



    render() {
        return (
            <div className={['md-add-movie', !this.props.isOpen && 'md-add-movie--hide'].join(' ')}>
                <h1 className="md-add-movie__title">Add Movie</h1>
                <form className="md-add-movie__form">
                    <div className="md-add-movie__main-params">
                        <label htmlFor="">title</label>
                        <input type="text" name="name" value={this.state.value} onChange={this.change}/>
                        {!this.state.name &&
                        <div className="md-add-movie__error">Title is required</div>
                        }
                        <label>Description</label>
                        <textarea name="desc" cols="30" rows="10" onChange={this.change}></textarea>
                        {!this.state.desc &&
                        <div className="md-add-movie__error">description is required</div>
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


const mapStateToProps = (state) => {
    const isOpen = state.addMovieForm.isOpen;
    return {
        isOpen
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeAddMovieForm: () => dispatch(closeAddMovieForm())
});

export const AddMovie = connect(mapStateToProps, mapDispatchToProps)(AddMovieComponent);
