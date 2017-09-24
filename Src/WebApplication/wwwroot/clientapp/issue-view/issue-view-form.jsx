import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TitleDescription from './title-description';
import SideBar from './sidebar';
const axios = require('axios');

class IssueViewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId,
			status: window.app.issue.Status
		};
		this.titleAndDescriptionState = {
			issueId: window.app.issue.IssueId,	
			title: window.app.issue.Title,			
			description: window.app.issue.Description,
			createdBy: window.app.issue.CreatedBy
		}
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		if(!this.state || !this.titleAndDescriptionState)
			return '';

		return (
			<form id='issue-view-form' className='row custom-form'>
				<div className='col-md-9 main'>
					<TitleDescription 
						issueId={this.titleAndDescriptionState.issueId}
						title={this.titleAndDescriptionState.title}
						description={this.titleAndDescriptionState.description}
						createdBy={this.titleAndDescriptionState.createdBy}
						 />
				</div>
				<SideBar />
			</form>
		);
	}
}

export default IssueViewForm;