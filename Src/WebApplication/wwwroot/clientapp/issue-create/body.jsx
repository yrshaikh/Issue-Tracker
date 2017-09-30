import React, { Component } from 'react';
import IssueCreateForm from './issue-create-form';

class Body extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id="issues-create" className="body">
				<IssueCreateForm defaultProjectId={this.props.defaultProjectId} />
			</div>
		);
	}
}

export default Body;