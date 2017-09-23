import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import SideBar from './sidebar';
const axios = require('axios');

class IssueTimeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		return (
			<div>
				timeline
			</div>
		);
	}
}

export default IssueTimeline;