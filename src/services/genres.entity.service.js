import {RequestServise} from './request-service.js';
import {urlService} from './url-service';


export class EntityGenresService {
    constructor() {
        this.requestServise = new RequestServise();
    }

    getGenres() {
        return this.requestServise.getRequest(urlService.genres()).then(result => {
            let genres = JSON.parse(result).genres;
            return genres;
        });
    }
}