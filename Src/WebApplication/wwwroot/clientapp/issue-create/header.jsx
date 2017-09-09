import React, { Component } from 'react';

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
						<span className='hero-banner-message'>
							Lorem ispum dispum blah bleh.
						</span>
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