const axios = require('axios');

const IssuesApi = {

    getIssues: function(){
        var self = this;
        return axios.get('/issue/get')
            .then(function(response){
                return response.data;
            })
            .catch(function(error){
                return error;
            });
    }

}

export { IssuesApi };