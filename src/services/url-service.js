class UrlService {
    constructor(_apiKey) {
        this.apiKey = _apiKey;
    }

    popularTvShows() {
        return `https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    }

    tvShowsRecommended(id) {
        return `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`;
    }

    tvShow(id) {
        return `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=en-US`;
    }

    popularMovies() {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    }

    movieRecommended(id) {
        return `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`;
    }

    movie(id) {
        return `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`;
    }

    genres() {
        return `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    }
}

export const urlService = new UrlService('fb5ce8b5b620b73ab4d3dd4c5f33f1e2');
