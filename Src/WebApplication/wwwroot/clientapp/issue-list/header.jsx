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
						<h1>Issues</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;