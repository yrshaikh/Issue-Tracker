import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Status from './timeline/status';
const axios = require('axios');

class IssueTimeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: props.IssueId
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		return (
			<div>
				<Status issueId={this.state.issueId} />
			</div>
		);
	}
}

export default IssueTimeline;