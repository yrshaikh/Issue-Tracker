import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Status from './timeline/status';
const axios = require('axios');

class IssueTimeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: props.timeline
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		return (
			<Status data={this.state.timeline} />
		);
	}
}

export default IssueTimeline;