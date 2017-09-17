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
			status: 'open'
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
						<span className='badge badge-success fs-16'>{this.state.status}</span>
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