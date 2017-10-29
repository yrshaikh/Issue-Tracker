import React, { Component } from 'react';
import TimelineItem from './timeline/timeline-item';
import TimelineComment from './timeline/timeline-comment';
const axios = require('axios');

class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: props.issueId,
			timeline: [],
			loading: true
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
				self.setState({ loading: false });
			})
			.catch(function (error) {
			});
	}
	render() {

		if(this.state.loading){
			return (
				<div className='light-gray loading-message'>fetching history...</div>
			)
		}

		var output = [];
		var timeline = this.state.timeline;
        for (var i = 0; i < timeline.length; i++) {
            if(timeline[i].type === 'comment')
                output.push(<TimelineComment key={i} data={timeline[i]} />);
            else
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