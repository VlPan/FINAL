function FilmService() {
}

FilmService.getData = function () {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&&language=en-US&sort_by=' +
        'popularity.desc&include_adult=false&include_video=false&page=1';
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(xhr.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error('Network Error'));
        };
        xhr.send();
    });
};

FilmService.getGenres = function () {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=fb5ce8b5b620b73ab4d3dd4c5f33f1e2&language=en-US';
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(xhr.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error('Network Error'));
        };
        xhr.send();
    });
};

export default FilmService;