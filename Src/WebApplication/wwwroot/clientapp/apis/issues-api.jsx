const axios = require('axios');

const IssuesApi = {

    createIssue: function createIssue(projectId, title, description, priorityId, assigneeId) {
        return axios.post('/issue/new', {
            assigneeId,
            description,
            priorityId,
            projectId,
            title,
        })
            .then(response => ({
                error: false,
                issueId: response.data,
            }))
            .catch(error => error);
    },

    getIssues: function getIssues(queryParams) {
        return axios.get(`/issue/get${queryParams}`)
            .then(response => response.data)
            .catch(error => error);
    },

    submitComment: function submitComment(issueId, comment) {
        return axios.post('/issue/newcomment', {
            comment,
            issueId,
        })
            .then(() => ({ error: false }))
            .catch(() => ({ error: true }));
    },


    updateAssignee: function updateAssignee(issueId, assigneeId) {
        return axios.post('/issue/updateassignee', {
            assigneeId,
            issueId,
        })
            .then(() => ({ error: false }))
            .catch(() => ({ error: true }));
    },


    updatePriority: function updatePriority(issueId, priorityId) {
        return axios.post('/issue/updatepriority', {
            issueId,
            priorityId,
        })
            .then(() => ({ error: false }))
            .catch(() => ({ error: true }));
    },

    updateStatus: function updateStatus(issueId, statusId) {
        return axios.post('/issue/updatestatus', {
            issueId,
            status: statusId,
        })
            .then(() => ({ error: false }))
            .catch(() => ({ error: true }));
    },

};

export { IssuesApi };
