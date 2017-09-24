import React, { Component } from 'react';
import IssueViewForm from './issue-view-form';
import IssueTimeline from './issue-timeline';

class Body extends Component {
	constructor(props) {
		super(props);
		this.status = {
			issueId: window.app.issue.IssueId
		}
	}
	render () {
		return (
			<div id="issues-view" className="body">
				<IssueViewForm />
				<IssueTimeline issueId={this.status.issueId} />
				<IssueTimeline issueId={this.status.issueId} />
				<IssueTimeline issueId={this.status.issueId} />
				<IssueTimeline issueId={this.status.issueId} />
			</div>
		);
	}
}

export default Body;