import IssueListApp from './issue-list-app';
import IssueCreateEditApp from './issue-create-app';
import IssueViewApp from './issue-view-app';
import React from 'react';
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