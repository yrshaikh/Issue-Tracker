import React, { Component } from 'react';
import PubSub from 'pubsub-js';  
const Select = require('react-select/dist/react-select.js');

class Header extends Component {
	constructor(props) {
		super(props);
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