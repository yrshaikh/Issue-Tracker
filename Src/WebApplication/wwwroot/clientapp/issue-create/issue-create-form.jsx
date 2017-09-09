import React, { Component } from 'react';

class IssueCreateForm extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id='issue-create-form' className='row custom-form'>

				<div className='col-md-9'>
					<div className='form-group'>
						<label>Title</label>
						<input type='text' className='form-control text-box' tabIndex='1' 
							placeholder='Enter a one-line summary of the issue.'>
						</input>
					</div>
					<div className='form-group'>
						<label>Description</label>
						<textarea className='form-control text-area' rows='5'
							placeholder='Steps to reproduce, what you expected to see, and what you saw it instead.'
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
					<button id="create" type="submit" className="btn btn-success">Create Issue</button>
					<button href="/projects" className="btn btn-outline-dark">Create and Add Another</button>
				</div>
			</div>
		);
	}
}

export default IssueCreateForm;