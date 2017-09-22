import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import IssueStatus from './../shared/issue-status';
import Gravatar from 'react-gravatar'
const Select = require('react-select/dist/react-select.js');

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId,
			status: window.app.issue.Status,
			createdBy: window.app.issue.CreatedBy,
			createdOn: 'Aug 15, 2017'
		};
		this.updateIssueStatus = this.updateIssueStatus.bind(this);
	}
	updateIssueStatus(){
		if(this.state.status === 'open' || this.state.status === 'reopened')
			this.closeIssue();
		if(this.state.status === 'closed')
			this.reOpenIssue();	
	}
	closeIssue(){
		//PubSub.publish('ISSUE_CLOSE');
		this.setState({status: 'closed'});
	}
	reOpenIssue(){
		this.setState({status: 'reopened'});
	}
	editIssue(){
		PubSub.publish('ISSUE_EDIT');
	}
	render () {
		return (
			<div id='hero-issues-view' className='hero-banner hero-banner-issue-view'>
				<div className='hero-banner-inner'>
					<div className='hero-banner-summary'>
						<div className='info'>
							<span className='id'>#{this.state.issueId}</span>
							<IssueStatus additionalClasses='fs-16' status={this.state.status} />
						</div>
						<div className='image'>
							<Gravatar email={this.state.createdBy} size={55} rating="pg" default="wavatar" />
						</div>
						<div className='summary'>
							<span className='fs-14 title-case fw-bold'>Opened By</span>
							<span className='fs-14 title-case'>{this.state.createdBy}</span>
							<span className='fs-14'>{this.state.createdOn}</span>
						</div>
						<div className='image'>
							<Gravatar email="andupandu@thondu.com" size={55} rating="pg" default="wavatar" />
						</div>
						<div className='summary'>
							<span className='fs-14 title-case fw-bold'>Assigned To</span>
							<span className='fs-14 title-case'>No one</span>
							<a href='/' className='fs-14 link'>assign to me</a>
						</div>						
						<div className='image'>
							<Gravatar email={this.state.createdBy} size={55} rating="pg" default="wavatar" />
						</div>
						<div className='summary'>
							<span className='fs-14 title-case fw-bold'>Closed By</span>
							<span className='fs-14 title-case'>Ali Rizvi</span>
							<span className='fs-14'>{this.state.createdOn}</span>
						</div>
					</div>
					<div className='hero-banner-buttons'>
						{this.renderActionButton()}
						<button className='btn btn-transparent' onClick={() => this.actionButton()}>
							Edit Issue
						</button>
					</div>
				</div>
			</div>
		);
	}
	renderActionButton(){
		var text;
		if(this.state.status === 'open' || this.state.status === 'reopened')
			text = 'Close Issue';
		if(this.state.status === 'closed')
			text = 'Re-Open Issue';
		return(
			<button className='btn btn-transparent' onClick={() => this.updateIssueStatus()}>
				{text}
			</button>
		);
	}
}

export default Header;