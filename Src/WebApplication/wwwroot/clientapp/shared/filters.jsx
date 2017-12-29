import lodash from 'lodash';

class Filters {
    getQueryParams() {
        const filterObj = this.get();
        const queryParams = `?status=${filterObj.status}`;
        return queryParams;
    }
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
    getOpenIssues() {
        return '?status=open';
    }
    getClosedIssues() {
        return '?status=closed';
    }
    getStatus() {
        const filterObj = this.get();
        return filterObj.status;
    }
}

export default Filters;
