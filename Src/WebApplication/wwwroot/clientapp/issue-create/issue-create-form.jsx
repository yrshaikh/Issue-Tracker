import React, { Component } from 'react';

class IssueCreateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
			, description: ''
			, validations: {
				title: true
			}
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }
	
	handleChange(event) {
		var name = event.target.name;
		this.setState({[name]: event.target.value});
	}
	
	fireValidations(identifier) {
		var valid = false;
		switch(identifier){
			case 'title': {
				valid = this.state.title > 4;
			}
			default: valid = true;
		}
		return valid;
	}

	handleSubmit(event) {
		alert('boom');
		this.state.validations.title = this.fireValidations('title');
		event.preventDefault();
	}
	
	render() {
		return (
			<form id='issue-create-form' className='row custom-form'>
				<div className='col-md-9'>
					<div className='form-group'>
						<label>Title</label>
						<input type='text'
							name='title'
							className='form-control text-box' 
							placeholder='Enter a one-line summary of the issue.'
							value={this.state.title }
							onChange={this.handleChange}>
						</input>
						{ !this.state.validations.title ? 'Title should atleast be of 10 characters' : '' }
					</div>
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

				<div className='col-md-12'>
					<button type='button' id='create' className='btn btn-success' onClick={this.handleSubmit}>Create Issue</button>
					<button type='button' className='btn btn-outline-dark' onClick={this.handleSubmit}>Create and Add Another</button>
				</div>
			</form>
		);
	}
}

export default IssueCreateForm;