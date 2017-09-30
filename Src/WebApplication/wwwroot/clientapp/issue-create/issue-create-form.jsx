import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { getSlug } from './../shared/utils';
import { IssuesApi } from './../apis/issues-api';
import { ProjectsApi } from './../apis/projects-api';
import _ from 'lodash';
import Priority from './body-components/priority';
import Assignee from './body-components/assignee';
import SubmitButtons from './body-components/submit-buttons';
import ErrorMessage from './body-components/error-message';
import Title from './body-components/title';
import Description from './body-components/description';
const axios = require('axios');

class IssueCreateForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			issue: {
				projectId: this.props.defaultProjectId
				, title: ''
				, description: ''
				, priorityId: 3
			}
			, priorities: []
			, assignees: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePriorityIdChange = this.handlePriorityIdChange.bind(this);
	}

	componentWillMount(){
		this.state.projectId = PubSub.subscribe('PROJECT_CHANGED', this.handleProjectChange.bind(this));
	}

	render(){
		return (
			<form id='issue-create-form' className='row custom-form'>
				<Title title={this.state.issue.title} change={this.handleChange} />
				<Description description={this.state.issue.description} change={this.handleChange} />
				<div className='col-md-3'>
					<Priority priorityId={this.state.issue.priorityId} action={this.handlePriorityIdChange} />
					<Assignee priorityId={this.state.issue.priorityId} action={this.handlePriorityIdChange} />
				</div>
				<SubmitButtons save={this.handleSubmit} />
				<ErrorMessage show={this.state.error} />
			</form>
		);
	}
	
	handleProjectChange(event, projectId){
		this.handleChange('projectId', projectId);
	}

	handlePriorityIdChange(){		
		this.handleChange('projectId', projectId);
	}

	handleChange(name, value){
		var issue = this.state.issue;
		issue[name] = value;
		this.setState({issue: issue});
	}

	handleSubmit(){
		var self = this;
		var slug = getSlug(this.state.issue.description);
		IssuesApi.createIssue(
			this.state.issue.projectId, 
			this.state.issue.title, 
			this.state.issue.description
		)
		.then(function (createdIssueId) {
			window.location.href = '/issue/' + createdIssueId + '/' + slug;
		});
	}	
}

export default IssueCreateForm;