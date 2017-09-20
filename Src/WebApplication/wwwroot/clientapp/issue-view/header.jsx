import React, { Component } from 'react';
import PubSub from 'pubsub-js';  
const Select = require('react-select/dist/react-select.js');

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createdBy: window.app.issue.CreatedBy,
			createdOn: 'Aug 15, 2017'
		}
		//window.app.issue.CreatedOn
	}
	closeIssue(){
		alert('Are you sure you want to close this issue?');
	}
	editIssue(){		
		PubSub.publish('ISSUE_EDIT');
	}
	render () {
		return (
			<div id='hero-issues-view' className='hero-banner hero-banner-issue-view'>
				<div className='hero-banner-inner'>
					<div className='hero-banner-summary'>
						<div className='image'>
							<img src='https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-2-48.png' />
						</div>
						<div className='summary'>
							<span className='fs-12 title-case fw-bold'>Reported By</span>
							<span className='fs-12 title-case'>{this.state.createdBy}</span>
							<span className='fs-12'>On {this.state.createdOn}</span>
						</div>
						<div className='image'>
							<img src='https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-2-48.png' />
						</div>
						<div className='summary'>
							<span className='fs-12 title-case fw-bold'>Updated On</span>
							<span className='fs-12 title-case'>{this.state.createdBy}</span>
							<span className='fs-12'>On {this.state.createdOn}</span>
						</div>
					</div>
					<div className='hero-banner-buttons'>
						<button className='btn btn-transparent' onClick={() => this.closeIssue()}>
							Close Issue
						</button>
						<button className='btn btn-transparent' onClick={() => this.editIssue()}>
							Edit Issue
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;