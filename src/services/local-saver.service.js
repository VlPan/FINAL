import {EntityMovieService} from "./movie-entity.service.js";
import {EntityTvService} from "./tv-entity.service.js";

export class LocalSaver {
    constructor(){};

    saveMoviesLocal(){
        let entityMovieService = new EntityMovieService();
        entityMovieService.getMovieEntities().then((movies)=>{
            let moviesString = JSON.stringify(movies);
            localStorage.setItem("movies",moviesString);
        });
    }

    getMoviesfromLocal(){
        let moviesString = localStorage.getItem("movies");
        return JSON.parse(moviesString);
    }    

    saveTvLocal(){
       let entityTvService = new EntityTvService();
       entityTvService.getTvEntities().then((shows)=>{
           let showsString = JSON.stringify(shows);
           localStorage.setItem("tvshows", showsString);
       });
    }

    getShowsfromLocal(){
        let showsString = localStorage.getItem("tvshows");
        return JSON.parse(showsString);
    }    
}