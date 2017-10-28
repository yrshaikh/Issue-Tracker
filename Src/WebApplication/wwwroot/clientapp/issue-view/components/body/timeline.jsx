import React, { Component } from 'react';
import TimelineItem from './timeline/timeline-item';
const axios = require('axios');

class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: props.issueId,
			timeline: []
		};
	}
	componentWillMount() {
	}
	componentDidMount() {
		this.getTimeline();
	}
	getTimeline() {
		var self = this;
		axios.get(`/issue/${this.state.issueId}/timeline`)
			.then(function (response) {
				self.setState({ timeline: response.data });
			})
			.catch(function (error) {
			});
	}
	render() {
		var output = [];
		var timeline = this.state.timeline;
		for (var i = 0; i < timeline.length; i++) {
			output.push(<TimelineItem key={i} data={timeline[i]} />);
		}

		return (
			<div className='fs-14'>
				{output}
			</div>
		);
	}
}

export default Timeline;