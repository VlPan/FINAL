import {RequestServise} from './request-service.js';
import {MovieEntity} from './movie.entity.dto.js';


export class EntityMovieService {
    constructor() {
        this.requestServise = new RequestServise();
        this.urlToMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&&language=en-US&sort_by='
            + 'popularity.desc&include_adult=false&include_video=false&page=1';
    }

    getMovieEntities() {
        return this.requestServise.getRequest(this.urlToMovies).then(result => {
            let arr = JSON.parse(result).results;
            let movies = arr.map((item) => {
                return new MovieEntity(item); // MAPPING
            });
            return movies;
        });
    }

    getRecommended(id) {
        return this.requestServise.getRequest(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US&page=1`)
            .then(result => {
                let arr = JSON.parse(result).results;
                let recommendedMovies = arr.map((item) => {
                    return new MovieEntity(item); // MAPPING
                });
                return recommendedMovies;
            });
    }

    getMovieById(id) {
        return this.requestServise.getRequest(`https://api.themoviedb.org/3/movie/${id}?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US`)
            .then(result => {
                let movie = JSON.parse(result);
                console.log(movie);
                let mappedMovie = new MovieEntity(movie);
                return mappedMovie;
            });
    }
}