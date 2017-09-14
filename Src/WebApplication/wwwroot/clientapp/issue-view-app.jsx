import Header from './issue-view/header';
import Body from './issue-view/body';
import React, { Component } from 'react';

class IssueViewApp extends Component {
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

export default IssueViewApp;