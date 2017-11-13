const LS = () => {

};

LS.set = (name, item) => {
    typeof name === 'string' && localStorage.setItem(name, JSON.stringify(item));
};

LS.get = (item) => {
    return typeof item === 'string' && JSON.parse(localStorage.getItem(item));
};

export default LS;