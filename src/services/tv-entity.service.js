import {TvShowEntity} from "./tvshow.entity.dto.js";
import {RequestServise} from "./request-service.js";

export class EntityTvService {
    constructor() {
        this.requestServise = new RequestServise();
        this.url = 'https://api.themoviedb.org/3/tv/popular?api_key=ed17cc3db4b89c8d4e968b98ff4f8266&language=en-US&page=1';
    }

    getTvEntities() {
        return this.requestServise.getData(this.url).then(result => {
            let arr = JSON.parse(result).results;
            let shows = arr.map((item)=>{
                return new TvShowEntity(item);
            });
            return shows;
        });
    }
}