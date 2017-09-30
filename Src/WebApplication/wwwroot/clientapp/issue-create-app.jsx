import Header from './issue-create/header';
import Body from './issue-create/body';
import React, { Component } from 'react';

class IssueCreateApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultProjectId: window.app.defaultProjectId
		}
	}
	render() {
		return (
			<div>
				<Header />
				<Body defaultProjectId={this.state.defaultProjectId} />
			</div>
		);
	}
}

export default IssueCreateApp;