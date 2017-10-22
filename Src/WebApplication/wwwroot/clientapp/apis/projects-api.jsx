const axios = require('axios');
import { capitalize } from './../shared/utils';
import _ from 'lodash';

const ProjectsApi = {

    getPriorities: function(){
        return axios.get('/get/priorities')
            .then(function(response){
                var arr = [];
                _.forEach(response.data, function(item){
                    arr.push({
                        label: item.value,
                        value: item.id
                    });
                });
                return arr;
            })
            .catch(function(error){
                return error;
            });
    },

    getAssignees: function(projectId){
        return axios.get('/get/' + projectId + '/assignees')
            .then(function(response){
                var arr = [];
                _.forEach(response.data, function(item){
                    arr.push({
                        label: item.firstName + ' ' + item.lastName,
                        email: item.email,
                        value: item.id
                    });
                });
                return arr;
            })
            .catch(function(error){
                return error;
            });
    },
}

export { ProjectsApi };