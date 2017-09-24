import React, { Component } from 'react';
const axios = require('axios');
import IssueViewForm from './issue-view-form';
import IssueTimeline from './issue-timeline';

class Body extends Component {
	constructor(props) {
		super(props);
		this.status = {
			issueId: window.app.issue.IssueId,
			timeline: []
		}
	}
	componentDidMount(){
		this.getTimeline();
	}
	getTimeline(){
		var self = this;
		axios.get('/issue/' + this.status.issueId + '/timeline')
		.then(function (response) {
			self.setState({timeline: response.data});
		})
		.catch(function (error) {
		});
	}
	render(){
		return (
			<div id="issues-view" className="body">
				<IssueViewForm />
				{this.renderTimeline()}
			</div>
		);
	}
	renderTimeline(){
		if(!this.state)
			return;

		var output = [];
		var timeline = this.state.timeline;
		for(var i=0; i<timeline.length; i++){
			if(timeline[i].type === 'status'){
				output.push(<IssueTimeline key={i} timeline={timeline[i]}/>);
			}
		}
		return(output);
	}
}

export default Body;