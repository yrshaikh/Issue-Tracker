import Header from './issue-create/header';
import Body from './issue-create/body';
import React, { Component } from 'react';

class IssueCreateApp extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Header />
				<Body />
			</div>
		);
	}
}

export default IssueCreateApp;