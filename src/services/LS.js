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
