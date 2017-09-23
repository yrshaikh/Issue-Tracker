import React, { Component } from 'react';
import IssueViewForm from './issue-view-form';
import IssueTimeline from './issue-timeline';

class Body extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id="issues-view" className="body">
				<IssueViewForm />
				<IssueTimeline />
			</div>
		);
	}
}

export default Body;