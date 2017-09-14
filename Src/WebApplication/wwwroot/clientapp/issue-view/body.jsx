import React, { Component } from 'react';
import IssueViewForm from './issue-view-form';

class Body extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id="issues-view" className="body">
				<IssueViewForm />
			</div>
		);
	}
}

export default Body;