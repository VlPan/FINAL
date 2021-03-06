export class TvShowEntity {
    constructor(entity) {
        this.id = entity.id || '';
        this.name = entity.name || '';
        this.desc = entity.overview || '';
        this.poster = 'https://image.tmdb.org/t/p/w500' + entity.poster_path || '';
        this.genreIds = entity.genre_ids || entity.genres.map((genre) => genre.id) || '';
        this.vote = entity.vote_average || '';
        this.popularity = entity.popularity || '';
        this.tvShow = true;
    }
}