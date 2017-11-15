const capitalize = function capitalize(input) {
    const one = 1;
    const zero = 0;
    return input.charAt(zero).toUpperCase() + input.slice(one);
};

const getSlug = function getSlug(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export {
    getSlug, capitalize,
};
