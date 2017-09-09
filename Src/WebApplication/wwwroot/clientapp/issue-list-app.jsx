import Header from './issue-list/header';
import Body from './issue-list/body';
import React, { Component } from 'react';

class IssueListApp extends Component {
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

export default IssueListApp;