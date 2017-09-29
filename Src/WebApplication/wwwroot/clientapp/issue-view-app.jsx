import Header from './issue-view/header';
import Body from './issue-view/body';
import React, { Component } from 'react';

class IssueViewApp extends Component {
	constructor(props) {
		super(props);

		var issue = window.app.issue;

		this.status = {
			issue: {
				issueId: issue.IssueId,
				title: issue.Title,
				description: issue.Description,
				createdBy: issue.CreatedBy,
				createdByEmail: issue.CreatedByEmail,
				createdOn: issue.CreatedOn,
				closedBy: issue.ClosedBy,
				closedByEmail: issue.ClosedByEmail,
				closedOn: issue.ClosedOn,
				projectId: issue.ProjectId,
				projectName: issue.ProjectName,
				status: issue.Status,
			}
		};
	}
	render() {
		return (
			<div>
				<Header issue={this.status.issue} />
				<Body issue={this.status.issue} />
			</div>
		);
	}
}

export default IssueViewApp;