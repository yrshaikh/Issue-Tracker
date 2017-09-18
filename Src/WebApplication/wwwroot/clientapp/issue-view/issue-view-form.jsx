import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TitleDescription from './title-description';
import SideBar from './sidebar';
import IssueStatus from './../shared/issue-status';
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
			description: window.app.issue.Description
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
				<div className='col-md-12'>
					<div className='form-group'>
						<IssueStatus additionalClasses='fs-16' status={this.state.status} />
					</div>
				</div>
				<div className='col-md-9 main'>
					<TitleDescription 
						issueId={this.titleAndDescriptionState.issueId}
						title={this.titleAndDescriptionState.title}
						description={this.titleAndDescriptionState.description}
						 />
				</div>
				<SideBar />
			</form>
		);
	}
}

export default IssueViewForm;