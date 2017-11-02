/* eslint one-var: 0 */
/* global require */
const axios = require('axios');
import lodash from 'lodash';

const ProjectsApi = {

    'getAssignees': function getAssignees (projectId) {

        return axios.get(`/get/${projectId}/assignees`).then((response) => {

            const arr = [];
            lodash.forEach(response.data, (item) => {

                arr.push({
                    'email': item.email,
                    'label': `${item.firstName} ${item.lastName}`,
                    'value': item.id
                });

            });
            return arr;

        }).
            catch((error) => error);

    },

    'getPriorities': function getPriorities () {

        return axios.get('/get/priorities').then((response) => {

            const arr = [];
            lodash.forEach(response.data, (item) => {

                arr.push({
                    'label': item.value,
                    'value': item.id
                });

            });
            return arr;

        }).
            catch((error) => error);

    }

};

export {ProjectsApi};
