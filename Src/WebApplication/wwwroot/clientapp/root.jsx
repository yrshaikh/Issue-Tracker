import IssueListApp from './issue-list-app'; // eslint-disable-line no-unused-vars
import IssueCreateEditApp from './issue-create-app'; // eslint-disable-line no-unused-vars
import IssueViewApp from './issue-view-app'; // eslint-disable-line no-unused-vars

import ReactDOM from 'react-dom';

if (document.getElementById('app-issue-list-root'))
    ReactDOM.render(
        <IssueListApp />,
        document.getElementById('app-issue-list-root')
    );

if (document.getElementById('app-issue-create-root'))
    ReactDOM.render(
        <IssueCreateEditApp />,
        document.getElementById('app-issue-create-root')
    );

if (document.getElementById('app-issue-view-root'))
    ReactDOM.render(
        <IssueViewApp />,
        document.getElementById('app-issue-view-root')
    );