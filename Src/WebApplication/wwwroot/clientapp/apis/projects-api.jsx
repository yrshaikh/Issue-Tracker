const axios = require('axios');

const ProjectsApi = {

    getPriorities: function(){
        return axios.get('/get/priorities')
            .then(function(response){
                return response.data;
            })
            .catch(function(error){
                return error;
            });
    },

    getAssignees: function(projectId){
        return axios.get('/get/' + projectId + '/assignees')
            .then(function(response){
                return response.data;
            })
            .catch(function(error){
                return error;
            });
    },
}

export { ProjectsApi };