const axios = require('axios');

const IssuesApi = {

    getIssues: function () {
        var self = this;
        return axios.get('/issue/get')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },

    updateStatus: function (issueId, statusId) {
        var self = this;
        return axios.post('/issue/updatestatus', {
            issueId: issueId
            , status: statusId
        })
            .then(function (response) {
                return {
                    error: false
                };
            })
            .catch(function (error) {
                return {
                    error: true
                };
            });
    },

    createIssue: function (projectId, title, description, priorityId, assigneeId) {
        var self = this;
        return axios.post('/issue/new', {
            projectId: projectId
            , title: title
            , description: description
            , priorityId: priorityId
            , assigneeId: assigneeId
        })
            .then(function (response) {
                return {
                    error: false,
                    issueId: response.data
                };
            })
            .catch(function (error) {
                console.log('error', error);
                return {
                    error: true
                };
            });
    },

    updateAssignee: function (issueId, assigneeId) {
        var self = this;
        return axios.post('/issue/updateassignee', {
            issueId: issueId
            , assigneeId: assigneeId
        })
            .then(function (response) {
                return {
                    error: false
                };
            })
            .catch(function (error) {
                return {
                    error: true
                };
            });
    },

    updatePriority: function (issueId, priorityId) {
        var self = this;
        return axios.post('/issue/updatepriority', {
            issueId: issueId
            , priorityId: priorityId
        })
            .then(function (response) {
                return {
                    error: false
                };
            })
            .catch(function (error) {
                return {
                    error: true
                };
            });
    },

    submitComment: function (issueId, comment) {
        var self = this;
        return axios.post('/issue/newcomment', {
            issueId: issueId
            , comment: comment
        })
            .then(function (response) {
                return {
                    error: false
                };
            })
            .catch(function (error) {
                return {
                    error: true
                };
            });
    },

};

export { IssuesApi };