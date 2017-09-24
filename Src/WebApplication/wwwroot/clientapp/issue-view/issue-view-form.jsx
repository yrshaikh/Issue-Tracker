import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TitleDescription from './title-description';
import SideBar from './sidebar';
import IssueTimeline from './issue-timeline';
const axios = require('axios');

class IssueViewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId,
			status: window.app.issue.Status
		};		
	}
	componentWillMount(){
	}
	render() {
		const titleAndDescription = {
			issueId: window.app.issue.IssueId,	
			title: window.app.issue.Title,			
			description: window.app.issue.Description,
			createdBy: window.app.issue.CreatedBy,
			createdByEmail: window.app.issue.CreatedByEmail,
		};

		return (
			<form id='issue-view-form' className='row custom-form'>
				<div className='col-md-9 main'>
					<TitleDescription 
						issueId={titleAndDescription.issueId}
						title={titleAndDescription.title}
						description={titleAndDescription.description}
						createdBy={titleAndDescription.createdBy}
						createdByEmail={titleAndDescription.createdByEmail}
					/>
						 
					<IssueTimeline issueId={this.state.issueId} />
				</div>
				<SideBar />
			</form>
		);
	}
}

export default IssueViewForm;