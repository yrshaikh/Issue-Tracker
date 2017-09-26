import React, { Component } from 'react';
import PubSub from 'pubsub-js';
const axios = require('axios');

class IssueCreateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectId: ''
			, title: ''
			, description: ''
			, validations: {
				title: true
			}
			, submittedOnce: false
			, firstLoad: false
			, submitting: false
			, error: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentWillMount(){
		this.state.projectId = PubSub.subscribe('PROJECT_CHANGED', this.handleProjectChange.bind(this));
	}
	componentDidMount(){
		this.setState({ projectId: window.app.defaultProjectId });
	}
	componentWillUnmount(){
		PubSub.unsubscribe(this.state.projectId);
	}
	
	handleProjectChange(event, projectId){
		this.setState({ projectId: projectId });
	}
	
	handleChange(event) {
		var name = event.target.name;
		this.setState({[name]: event.target.value});
		this.setState({ firstLoad: true });
	}
	
	handleBlur(event) {
		var name = event.target.name;
		this.validate({[name]: event.target.value});
		this.setState({ firstLoad: true });
	}
	
	validate(identifier) {
		var isValid = true;
		var validations = this.state.validations;
		switch(identifier){
			case 'title': {
				validations[identifier] = isValid = this.state.title.length > 10;
				break;
			}
			default: break;
		}
		this.setState({ validations : validations });
		return isValid;
	}

	handleSubmit(event) {
		if(this.validate('title')) {
			this.setState({ submitting : true });
			this.setState({ error : false });
			this.save();
		}
		event.preventDefault();
	}

	save() {
		var self = this;
		axios.post('/issue/new', {
			projectId: this.state.projectId
			, title : this.state.title
			, description: this.state.description
		})
		.then(function (response) {
			window.location.href = '/';
		})
		.catch(function (error) {
			self.setState({ submitting : false });
			self.setState({ error : true });
			console.log(error);
		});
	}
	
	render() {
		return (
			<form id='issue-create-form' className='row custom-form'>
				<div className='col-md-12'>
					<div className='form-group'>						
						<label>Subject</label>
						<input type='text' autoFocus
							name='title'
							className='form-control text-box title' 
							placeholder='Enter a one-line summary of the issue.'
							ref={input => input && !this.state.firstLoad && input.focus()}
							value={this.state.title }
							onChange={this.handleChange}
							onBlur={this.handleBlur}>
						</input>
						{ !this.state.validations.title ? 
							<span className='form-text text-danger'>Title should atleast be of 10 characters</span>
							: '' }
					</div>
				</div>
				<div className='col-md-9'>
					<div className='form-group'>
						<label>Description</label>
						<textarea 
							className='form-control text-area'
							name='description'
							rows='5'
							placeholder='Steps to reproduce, what you expected to see, and what you saw it instead.'
							value={this.state.description }
							onChange={this.handleChange}>
						>
						</textarea>
					</div>
				</div>

				<div className='col-md-3'>
					<div className='form-group'>
						<label>Priority</label>
						<select className='form-control'>
						</select>
					</div>
					<div className='form-group'>
						<label>Assignee</label>
						<select className='form-control'>
						</select>
					</div>
				</div>

				{ this.renderButtons() }
				{ this.renderError() }
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

export default IssueCreateForm;