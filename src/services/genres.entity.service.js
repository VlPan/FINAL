import {RequestServise} from './request-service.js';


export class EntityGenresService {
    constructor() {
        this.requestServise = new RequestServise();
        this.url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US';
    }

    getGenres() {
        return this.requestServise.getRequest(this.url).then(result => {
            let genres = JSON.parse(result).genres;
            return genres;
        });
    }
}