import lodash from 'lodash';

class Filters {
    get() {
        const search = window.location.search.substr(1).split('&');
        const queryParams = {};
        lodash.forEach(search, (value) => {
            const items = value.split('=');
            queryParams[items[0]] = items[1];
        });
        return {
            status: queryParams.status ? queryParams.status : 'open',
        };
    }
}

export default Filters;
