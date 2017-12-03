export const customLib = () => {

};

customLib.common = 'the, it is, we all, a, an, by, to, you, me, he, she, they, we, how, it, i, are, to, for, of, .,';

customLib.filterArray = (array, filterOptions) => {
    if(customLib.objectIsEmpty(filterOptions || customLib.arrayIsEmpty(array))){
        return array;
    }
    if (filterOptions.name.length > 0) {
        array = array.filter((movie) => {
            return movie.name.trim().toLowerCase().indexOf(filterOptions.name.trim().toLowerCase()) !== -1;
        });
    }
    if (filterOptions.genreIds.length > 0) {
        array = array.filter((movie) => {
            return filterOptions.genreIds.map((genreId) => {
                return genreId.id;
            }).every(elem => movie.genreIds.includes(elem));
        });
    }
    if (filterOptions.adult) {
        array = array.filter((movie) => {
            return movie.adult;
        });
    }
    if (filterOptions.desc) {
        array = array.filter((movie) => {
            return customLib.getUncommon(filterOptions.desc, customLib.common)
                .some(elem => customLib.getUncommon(movie.desc, customLib.common).includes(elem));
        });
    }

    if (filterOptions.vote && !filterOptions.custom) {
        array = array.filter(movie => movie.vote >= filterOptions.vote || movie.custom);
    }

    if (filterOptions.popularity && !filterOptions.custom) {
        array = array.filter(movie => movie.popularity >= filterOptions.popularity || movie.custom);
    }

    if (filterOptions.custom) {
        array = array.filter(movie => movie.custom === true);
    }
    return array;
};

customLib.getUncommon = (sentence, common) => {
    var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
        word, i;

    common = common.split(',');
    for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
    }

    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        if ( !commonObj[word] ) {
            uncommonArr.push(word);
        }
    }

    return uncommonArr;
};

customLib.arrayIsNotEmpty = (array) => {
    return typeof array !== 'undefined' && array !== null && array.length > 0;
};

customLib.arrayIsEmpty = (array) => {
    return typeof array === 'undefined' || array === null || array.length === 0;
};

customLib.objectIsEmpty = (obj) => {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
};

