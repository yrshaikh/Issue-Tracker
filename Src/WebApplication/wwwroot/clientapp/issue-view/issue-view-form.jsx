import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import SideBar from './sidebar';
const axios = require('axios');

class IssueViewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId,
			title: window.app.issue.Title,
			status: 'open',
			description: window.app.issue.Description,
			editIssue: false
		};
		
		this.updateTitleDescription = this.updateTitleDescription.bind(this);
		this.cancelTitleDescriptionEdit = this.cancelTitleDescriptionEdit.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	}
	componentWillMount(){
		PubSub.subscribe('ISSUE_EDIT', this.handleIssueEdit.bind(this));
	}
	componentDidMount(){
	}
	handleIssueEdit(){
		this.setState({editIssue: true});
	}
	cancelTitleDescriptionEdit(){
		this.setState({editIssue: false});
	}
	updateTitleDescription(){
		this.setState({editIssue: false});
	}
	handleTitleChange(event){
		this.setState({title: event.target.value});
	}
	handleDescriptionChange(event){
		this.setState({description: event.target.value});
	}
	render() {
		var titleAndDescription = this.state.editIssue ? 
									this.renderTitleAndDescriptionInEditMode() :
									this.renderTitleAndDescription();
		return (
			<form id='issue-view-form' className='row custom-form'>
				<div className='col-md-12'>
					<div className='form-group'>
						<span className='badge badge-success fs-16'>{this.state.status}</span>
					</div>
				</div>
				<div className='col-md-9 main'>
					{titleAndDescription}
				</div>
				<SideBar />
			</form>
		);
	}	
	renderTitleAndDescription() {
		return (
			<div>
				<div className='form-group'>
					<span className='fs-28 fw-700'>{this.state.title}</span>
					<span className='ml-10 gray fs-28 fw-700'>#{this.state.issueId}</span>
				</div>
				<div className='form-group'>
					<div className='description'>{this.state.description}</div>
				</div>
			</div>
		);	
	}
	renderTitleAndDescriptionInEditMode() {
		return (
			<div>
				<div className='form-group'>						
					<input type='text' autoFocus
						name='title'
						className='form-control text-box title' 
						placeholder='Enter a one-line summary of the issue.'
						value={this.state.title}
						onChange={this.handleTitleChange}>
					</input>
				</div>
				<div className='form-group'>
					<textarea 
						className='form-control text-area'
						name='description'
						rows='5'
						placeholder='Steps to reproduce, what you expected to see, and what you saw it instead.'
						value={this.state.description}
						onChange={this.handleDescriptionChange}>
					>
					</textarea>
				</div>
				<div className='form-group ta-right'>
					<button type='button' className='btn btn-default mr-10' onClick={this.cancelTitleDescriptionEdit}>Cancel</button>
					<button type='button' id='create' className='btn btn-success' onClick={this.updateTitleDescription}>Update Issue</button>					
				</div>
			</div>
		);		
	}

}

export default IssueViewForm;