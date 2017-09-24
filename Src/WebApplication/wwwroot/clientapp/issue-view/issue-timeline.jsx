import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Status from './timeline/status';
const axios = require('axios');

class IssueTimeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: props.issueId,
			timeline: []
		};
	}
	componentWillMount(){
	}	
	componentDidMount(){
		this.getTimeline();
	}	
	getTimeline(){
		var self = this;
		axios.get('/issue/' + this.state.issueId + '/timeline')
		.then(function (response) {
			self.setState({timeline: response.data});
		})
		.catch(function (error) {
		});
	}
	render(){
		var output = [];
		var timeline = this.state.timeline;
		for(var i=0; i<timeline.length; i++){
			if(timeline[i].type === 'status'){
				output.push(<Status key={i} data={timeline[i]}/>);
			}
		}

		return(
			<div className='fs-14'>
				{output}
			</div>
		);
	}
}

export default IssueTimeline;