import React from 'react';
import './db-add-item.scss';
import uuidv4 from 'uuid/v4';
import {connect} from 'react-redux';
import {closeAddItemForm} from './../../store/actions';
import {SelectorBox} from '../db-selector-box';
import {LS} from '../../services';
import {
    Input,
    Button,
    TextArea,
    Selector
} from '../FormControls';

export class AddItemFormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleCloseAddMovieForm = this.handleCloseAddMovieForm.bind(this);
        this.change = this.change.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.uploadPoster = this.uploadPoster.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.loadInView = this.loadInView.bind(this);
        this.defaultImg = 'assets/img/logo.png';
        this.state = {
            name: '',
            desc: '',
            genre: [],
            isAdult: false,
            posters: 0,
            posterImg: this.defaultImg,
            genresFromServer: LS.get('genres') || []
        };
    }

    componentDidMount(){
        console.log(this.dropped);
        this.dropzone.ondrop = (e)=>{
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            console.log(this.dropped);
            this.loadInView(file, this.dropped);
            this.uploadPoster();
        };

        this.dropzone.ondragover = function(){
            return false;
        };

        this.dropzone.ondragleave = function(){
            return false;
        };
    }


    checkValidation() {
        if (this.state.name && this.state.desc && this.state.posters !== 0) {
            return false;
        }
        return true;
    }

    handleCloseAddMovieForm(e) {
        e && e.preventDefault();
        this.props.closeAddItemForm();
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

    uploadPoster() {
        this.setState((prevState) => ({
            posters: prevState.posters += 1
        }));
    }

    saveMovie(e) {
        e.preventDefault();
        let genreIds = this.state.genresFromServer.filter((genre) => {
            return this.state.genre.includes(genre.name);
        });
        const newItem = {
            name: this.state.name,
            desc: this.state.desc,
            genreIds: genreIds.map(elem => elem.id),
            adult: this.state.isAdult,
            id: uuidv4(),
            custom: true,
            posterImg: this.state.posterImg
        };
        console.log('------------ NEW ITEM -----------',newItem);
        this.props.addNewItemToArray(newItem);
        this.handleCloseAddMovieForm();
    }


    loadInView(file,elem){
        var fileReader = new FileReader();
        fileReader.onloadend = ()=>{
            elem.src = fileReader.result;
            this.setState(()=>({
                posterImg: elem.src
            }));
        };
        fileReader.readAsDataURL(file);
    }



    render() {
        console.log(this.state);
        return (
            <div className={['md-add-movie', !this.props.isOpen && 'md-add-movie--hide'].join(' ')}>
                <h1 className="md-add-movie__title">{this.props.title}</h1>
                <form className="md-add-movie__form">
                    <div className="md-add-movie__main-params">
                        <label htmlFor="">title</label>
                        <Input
                            onChangeHandler={this.change}
                            name="name"
                            value={this.state.value}
                        />

                        {!this.state.name &&
                        <div className="md-add-movie__error">Title is required</div>
                        }
                        <label>Description</label>
                        <TextArea
                            name="desc"
                            className="md-add-item__text-area"
                            onChangeHandler={this.change}
                        />
                        {!this.state.desc &&
                        <div className="md-add-movie__error">description is required</div>
                        }
                    </div>
                    <div className="md-add-movie__genre">
                        <label htmlFor="">Genre</label>
                        <SelectorBox onClickHandler={this.changeGenre}
                                     array={LS.get('genres')}
                                     chunk={4}
                        />
                        {this.state.genre.length === 0 && <div className="md-add-movie__error">Genre is required</div>}
                        <div>
                            <Selector
                                name="isAdult"
                                onChangeHandler={this.change}
                            />
                            <label htmlFor="isAction">Adult</label>
                        </div>
                    </div>

                    <div className="md-add-movie__img-upload">
                        <div className="md-add-movie__drop-files" draggable="true"
                             ref={div => {
                                 this.dropzone = div;
                             }}>

                        </div>
                        <div className="md-add-movie__dropped">
                            <img src="" alt="" className="md-add-movie__dropped-image"
                                 ref={img => {
                                     this.dropped = img;
                                 }}/>
                        </div>
                        {this.state.posters === 0 &&
                        <div className="md-add-movie__error">Upload one poster as minimum</div>}
                        <div className="md-add-movie__buttons ">
                        <Button
                            disabled={this.checkValidation()}
                            onClickHandler={this.saveMovie}
                            value="Add"
                            className={['md-add-movie__submit', this.checkValidation() && 'md-add-movie__submit--disabled' ].join(' ')}
                        />
                        <Button
                            onClickHandler={this.handleCloseAddMovieForm}
                            value="Close"
                            className="md-add-movie__cancel"
                        />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function loadInView(file,elem){
    var fileReader = new FileReader();
    fileReader.onloadend = ()=>{
        elem.src = fileReader.result;
        this.setState(()=>({
            posterImg: elem.src
        }));
    };
    fileReader.readAsDataURL(file);
}


const mapStateToProps = (state) => {
    const isOpen = state.layout.isOpenAddForm;
    return {
        isOpen
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeAddItemForm: () => dispatch(closeAddItemForm())
});

export const AddItemForm = connect(mapStateToProps, mapDispatchToProps)(AddItemFormComponent);
