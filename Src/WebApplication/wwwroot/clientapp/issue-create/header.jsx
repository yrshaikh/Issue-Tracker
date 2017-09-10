import React, { Component } from 'react';
const Select = require('react-select/dist/react-select.js');

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectId: 'three'
		}

		this.loadProjects();
	}

	loadProjects() {
		this.projects = [];
		for(var i = 0; i < window.app.projects.length; i++){
			this.projects.push({
				value: window.app.projects[i].Id,
				label: window.app.projects[i].Name
			});
		}
	}

	render () {
		return (
			<div id='hero-issues-create' className='hero-banner hero-banner-issue-create'>
				<div className='hero-banner-inner'>
					<div className='hero-banner-title'>
						<h1>Create a New Issue</h1>
						<div className='select-project col-md-8'>
							<div className='form-group'>
							<label>Project</label>
							<Select
								name='form-field-name'
								value={this.state.projectId}
								options={this.projects}
								/>
							</div>
						</div>
					</div>
					<div className='hero-banner-buttons'>
						<a href='/' >
							<button className='btn btn-transparent'>
								<i className='fa fa-long-arrow-left'></i> back to listing
							</button>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;