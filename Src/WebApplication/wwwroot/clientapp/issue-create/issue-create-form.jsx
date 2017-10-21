import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { getSlug } from './../shared/utils';
import { IssuesApi } from './../apis/issues-api';
import { ProjectsApi } from './../apis/projects-api';
import _ from 'lodash';
import Priority from './../shared/components/priority';
import Assignee from './../shared/components/assignee';
import SubmitButtons from './body-components/submit-buttons';
import LoadingButtons from './body-components/loading-buttons';
import ErrorMessage from './body-components/error-message';
import Title from './body-components/title';
import Description from './body-components/description';
import SelectPriority from './../shared/components/select-priority';
import SelectAssignee from './../shared/components/select-assignee';
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
				, assigneeId: null
			}
			, priorities: []
			, assignees: []
			, error: false
			, loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(){
		return (
			<form id='issue-create-form' className='row custom-form'>
				<Title title={this.state.issue.title} change={this.handleChange} />
				<Description description={this.state.issue.description} change={this.handleChange} />
				<div className='sidebar col-md-3'>					
					<SelectAssignee
						projectId={this.state.issue.projectId}
						issueId={this.state.issue.issueId}
						id={this.state.issue.assigneeId}
						label={this.state.issue.assigneeName}
					/>
					<SelectPriority
						issueId={this.state.issue.issueId}
						id={this.state.issue.priorityId}
						label={this.state.issue.priorityName}
					/>
					{/* <Priority priorityId={this.state.issue.priorityId} action={this.handleChange} />
					<Assignee projectId={this.state.issue.projectId} action={this.handleChange} /> */}
				</div>
				{
					(this.state.loading) ? 
						<LoadingButtons />  : 
						<SubmitButtons save={this.handleSubmit} />
				}				
				{ 
					(this.state.error) ? 
						<ErrorMessage /> : 
						''
				}
			</form>
		);
	}
	
	handleProjectChange(event, projectId){
		this.handleChange('projectId', projectId);
	}

	handleChange(name, value){
		console.log(name, value);
		var issue = this.state.issue;
		issue[name] = value;
		this.setState({issue: issue});
	}

	handleSubmit(){
		this.setState({loading: true});
		this.setState({error: false});
		var slug = getSlug(this.state.issue.description);

		var self = this;
		IssuesApi.createIssue(
			this.state.issue.projectId, 
			this.state.issue.title, 
			this.state.issue.description,
			this.state.issue.priorityId,
			this.state.issue.assigneeId
		)
		.then(function (response) {
			self.setState({loading: false});
			if(response.error)
				self.setState({error: true});
			else
				window.location.href = '/issue/' + response.issueId + '/' + slug;
		});
	}	
}

export default IssueCreateForm;