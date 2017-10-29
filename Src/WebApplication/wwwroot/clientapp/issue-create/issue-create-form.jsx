import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { getSlug } from './../shared/utils';
import { IssuesApi } from './../apis/issues-api';
import { ProjectsApi } from './../apis/projects-api';
import _ from 'lodash';
import SubmitButtons from './body-components/submit-buttons';
import LoadingButtons from './body-components/loading-buttons';
import ErrorMessage from './body-components/error-message';
import Title from './body-components/title';
import Description from './body-components/description';
import SelectPriority from './../shared/components/select-priority';
import SelectAssignee from './../shared/components/select-assignee';
const axios = require('axios');

class IssueCreateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issue: {
				projectId: this.props.defaultProjectId
				, title: ''
				, description: ''
				, priorityId: 3
				, priorityName: 'Normal'
				, assigneeId: null
				, assigneeName: 'Unassigned'
			}
			, priorities: []
			, assignees: []
			, error: false
			, loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.updatePriorityHandler = this.updatePriorityHandler.bind(this);
		this.updateAssigneeHandler = this.updateAssigneeHandler.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
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
						updateHandler={this.updateAssigneeHandler}
					/>
					<SelectPriority
						issueId={this.state.issue.issueId}
						id={this.state.issue.priorityId}
						label={this.state.issue.priorityName}
						updateHandler={this.updatePriorityHandler}
					/>
				</div>
				{
					(this.state.loading) ?
						<LoadingButtons /> :
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

	handleProjectChange(event, projectId) {
		this.handleChange('projectId', projectId);
	}

	handleChange(name, value) {
		var issue = this.state.issue;
		issue[name] = value;
		this.setState({ issue: issue });
	}

	handleSubmit() {
		this.setState({ loading: true });
		this.setState({ error: false });
		var slug = getSlug(this.state.issue.title);

		var self = this;
		IssuesApi.createIssue(
			this.state.issue.projectId,
			this.state.issue.title,
			this.state.issue.description,
			this.state.issue.priorityId,
			this.state.issue.assigneeId
		)
			.then(function (response) {
				self.setState({ loading: false });
				if (response.error)
					self.setState({ error: true });
				else
					window.location.href = '/issue/' + response.issueId + '/' + slug;
			});
	}
	updateAssigneeHandler(id, value) {
		var issue = this.state.issue;
		issue.assigneeId = id;
		issue.assigneeName = value;
		this.setState({ issue: issue });
	}
	updatePriorityHandler(id, value) {
		var issue = this.state.issue;
		issue.priorityId = id;
		issue.priorityName = value;
		this.setState({ issue: issue });
	}
}

export default IssueCreateForm;