import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div id="hero-issues" className="hero-banner">
				<div className="hero-banner-inner">
					<div className="hero-banner-title">
						<h1>Issues v2</h1>
					</div>
					<div className="hero-banner-buttons">
						<button className="btn btn-transparent"><i className="fa fa-cog"></i></button>
						<a className="btn btn-success" href="issue/new">New Issue</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;