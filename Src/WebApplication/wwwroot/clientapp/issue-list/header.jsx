import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id="hero-issues" className="hero-banner">
				<div className="hero-banner-inner hero-banner-inner-issue-listing">
					<div className="hero-banner-title">
						<h1>Issues</h1>						
						<a className='btn btn-success pull-right new-issue' href='issue/new'>New Issue</a>
					</div>
					<div className='width-100-percent mb-15'>
						<div className="btn-group" role="group">
							<button type="button" className="btn btn-default">Open</button>
							<button type="button" className="btn btn-default">Closed</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;