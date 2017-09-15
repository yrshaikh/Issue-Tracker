import React, { Component } from 'react';
import PubSub from 'pubsub-js';
const axios = require('axios');

class IssueViewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId,
			title: window.app.issue.Title,
			status: 'open',
			description: window.app.issue.Description
		};
	}
	render() {
		return (
			<form id='issue-view-form' className='row custom-form'>
				<div className='col-md-12'>
					<div className='form-group'>
						<span className='badge badge-success fs-16'>{this.state.status}</span>
					</div>
				</div>
				<div className='col-md-9'>
					<div className='form-group'>
						<span className='fs-34'>{this.state.title}</span>
						<span className='ml-10 gray fs-34'>#{this.state.issueId}</span>
					</div>
					<div className='form-group'>
						<div>{this.state.description}</div>
					</div>
				</div>
				<div className='col-md-3'>
					<div className='form-group'>
						<label>Priority</label>
						<div>Normal</div>
					</div>
					<div className='form-group'>
						<label>Assignee</label>
						<div>John Cena</div>
					</div>
				</div>
			</form>
		);
	}

	renderButtons() {
		if(this.state.submitting) {			
			return (
				<div className='col-md-12'>
					<button type='button' id='create' className='btn btn-default' disabled='disabled'>Submitting</button>
				</div>
			);
		}
		else {
			return (
				<div className='col-md-12'>
					<button type='button' id='create' className='btn btn-success' onClick={this.handleSubmit}>Create Issue</button>
					<button type='button' className='btn btn-outline-dark' onClick={this.handleSubmit}>Create and Add Another</button>
				</div>
			);
		}		
	}

	renderError() {
		if(this.state.error){
			return (
				<div className='col-md-9 mt-10'>
					<div className='alert alert-danger' role='alert'>
						Whoops! Something went wrong. Please try again.
					</div>
				</div>
			);
		}
	}
}

export default IssueViewForm;