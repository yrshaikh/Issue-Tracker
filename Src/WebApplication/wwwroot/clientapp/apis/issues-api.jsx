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
    },

    updateStatus: function(issueId, statusId){
        var self = this;
        return axios.post('/issue/updatestatus', {
                issueId: issueId
                , status : statusId
            })
            .then(function(response){
                return {
                    error: false
                };
            })
            .catch(function(error){
                return {
                    error: true
                };
            });
    }

}

export { IssuesApi };