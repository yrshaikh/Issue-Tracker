/* eslint one-var: 0 */
/* global require */
const axios = require('axios');

const IssuesApi = {
    // eslint-disable-next-line max-params, max-len
    'createIssue': function createIssue (projectId, title, description, priorityId, assigneeId) {

        return axios.post('/issue/new', {
            assigneeId,
            description,
            priorityId,
            projectId,
            title
        }).
            then((response) => ({
                'error': false,
                'issueId': response.data
            })).
            catch((error) => error);

    },

    'getIssues': function getIssues () {

        return axios.get('/issue/get').
            then((response) => response.data).
            catch((error) => error);

    },

    'submitComment' (issueId, comment) {

        return axios.post('/issue/newcomment', {
            comment,
            issueId
        }).
            then(() => ({'error': false})).
            catch(() => ({'error': true}));

    },


    'updateAssignee' (issueId, assigneeId) {

        return axios.post('/issue/updateassignee', {
            assigneeId,
            issueId
        }).
            then(() => ({'error': false})).
            catch(() => ({'error': true}));

    },


    'updatePriority' (issueId, priorityId) {

        return axios.post('/issue/updatepriority', {
            issueId,
            priorityId
        }).
            then(() => ({'error': false})).
            catch(() => ({'error': true}));

    },

    'updateStatus' (issueId, statusId) {

        return axios.post('/issue/updatestatus', {
            issueId,
            'status': statusId
        }).
            then(() => ({'error': false})).
            catch(() => ({'error': true}));

    }

};

export {IssuesApi};
