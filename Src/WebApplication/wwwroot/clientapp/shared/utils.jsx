const capitalize = function capitalize (input) {

        const one = 1,
            zero = 0;

        return input.charAt(zero).toUpperCase() + input.slice(one);

    },
    getSlug = function getSlug (text) {

        return text.toString().toLowerCase().
            replace(/\s+/g, '-').
            replace(/[^\w\-]+/g, '').
            replace(/\-\-+/g, '-').
            replace(/^-+/, '').
            replace(/-+$/, '');

    };

export {
    getSlug, capitalize
};
