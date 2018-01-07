import React from 'react';
import ReactDOM from 'react-dom';

import IssueCreateEditApp from './issue-create-app.jsx';
import IssueListApp from './issue-list-app.jsx';
import IssueViewApp from './issue-view-app.jsx';

import ProjectCreateApp from './project/app/project-create-app.jsx';

if (document.getElementById('app-issue-list-root')) {
    ReactDOM.render(
        <IssueListApp />,
        document.getElementById('app-issue-list-root'),
    );
}


if (document.getElementById('app-issue-create-root')) {
    ReactDOM.render(
        <IssueCreateEditApp />,
        document.getElementById('app-issue-create-root'),
    );
}


if (document.getElementById('app-issue-view-root')) {
    ReactDOM.render(
        <IssueViewApp />,
        document.getElementById('app-issue-view-root'),
    );
}

if (document.getElementById('app-project-create-root')) {
    ReactDOM.render(
        <ProjectCreateApp />,
        document.getElementById('app-project-create-root'),
    );
}
