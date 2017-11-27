export const LS = () => {

};

LS.set = (name, item) => {
    typeof name === 'string' && localStorage.setItem(name, JSON.stringify(item));
};

LS.get = (item) => {
    return typeof item === 'string' && JSON.parse(localStorage.getItem(item));
};

LS.remove = (item) => {
    return typeof item === 'string' && localStorage.removeItem(item);
};

LS.arrayIsNotEmpty = (array) => {
    return typeof array !== 'undefined' && array !== null && array.length > 0;
};

LS.arrayIsEmpty = (array) => {
    return typeof array === 'undefined' || array === null || array.length === 0;
};