import React from 'react';
import Film from './Film/film';
import Navbar from './Navbar/navbar';
import Search from './Search/serach';
import AddMovie from './Add_movie/addMovie';


const MainPage = (props) => {
    return (
        <div className="md__content">
            <div className={['md__navbar',
                'md__navbar--white-text'
            ].join(' ')}>
                <div className="md__container">
                    <Search filterFilmsByTitle={this.filterFilmsByTitle}/>
                    <Navbar
                        openAddMovieForm={this.state.openAddMovieForm}
                        filterFilmsByTitle={this.filterFilmsByTitle}
                        handleOpenAddMovieForm={this.handleOpenAddMovieForm}/>
                </div>
                <div className="md__add-movie">
                    <AddMovie handleOpenAddMovieForm={this.handleOpenAddMovieForm}
                              handleCloseAddMovieForm={this.handleCloseAddMovieForm}
                              isOpen={this.state.openAddMovieForm}
                              addNewFilm={this.addNewFilm}
                    />
                </div>
            </div>

            <div
                className={['md__films-container',
                    'md__films-container--white-text'].join(' ')}
                ref={(filmsContainer) => {
                    this.filmsContainer = filmsContainer;
                }}
            >
                {this.state.filmsArr.map((film, index) => {
                    return (
                        <Film key={index} title={film.title} imagePath={film.poster_path}/>
                    );
                })}
            </div>
        </div>
    );
};


export default MainPage;