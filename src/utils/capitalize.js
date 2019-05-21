export default (s) => {
    if (typeof s !== 'string') return '';
    return s[0].toUpperCase() + s.slice(1);
}