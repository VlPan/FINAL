export class MovieEntity {
    constructor(entity) {
        this.id = entity.id || '';
        this.name = entity.title || '';
        this.desc = entity.overview || '';
        this.poster = 'https://image.tmdb.org/t/p/w500' + entity.poster_path || '';
        this.adult = entity.adult || false;
        this.genreIds = entity.genre_ids || entity.genres.map((genre) => genre.id) || '';
        this.vote = entity.vote_average || '';
        this.popularity = entity.popularity || '';
        this.createdAt = (new Date).getMinutes();
    }
}