import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import IssueStatus from './../shared/issue-status';
import Gravatar from 'react-gravatar'
const axios = require('axios');

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
	updateIssueStatus(statusId, statusValue){
		//PubSub.publish('ISSUE_CLOSE');
		if(!confirm('Are you sure you want to change the status of the issue?'))
			return;

		this.setState({status: statusValue});

		var self = this;
        this.setState({editIssue: false});
		axios.post('/issue/updatestatus', {
			issueId: this.state.issueId
			, status : statusId
		})
		.then(function (response) {
			// do nothing.			
		})
		.catch(function (error) {
			self.setState({ submitting : false });
            self.setState({ error : true });
            self.setState({editIssue: true});
		});
		this.setState({editIssue: false});
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
							<span className='id fw-light'>#{this.state.issueId}</span>
							<IssueStatus additionalClasses='fs-16' status={this.state.status} />
						</div>
						<div className='image'>
							<Gravatar email={this.state.createdBy} size={55} rating="pg" default="wavatar" />
						</div>
						<div className='summary'>
							<span className='fs-14 title-case fw-bold'>Opened By</span>
							<span className='fs-14 title-case fw-light'>{this.state.createdBy}</span>
							<span className='fs-14 fw-light'>{this.state.createdOn}</span>
						</div>
						<div className='image'>
							<Gravatar email="andupandu@thondu.com" size={55} rating="pg" default="wavatar" />
						</div>
						<div className='summary'>
							<span className='fs-14 title-case fw-bold'>Assigned To</span>
							<span className='fs-14 title-case fw-light'>No one</span>
							<a href='/' className='fs-14 link fw-light'>assign to me</a>
						</div>						
						<div className='image'>
							<Gravatar email={this.state.createdBy} size={55} rating="pg" default="wavatar" />
						</div>
						<div className='summary'>
							<span className='fs-14 title-case fw-bold'>Closed By</span>
							<span className='fs-14 title-case fw-light'>Ali Rizvi</span>
							<span className='fs-14 fw-light'>{this.state.createdOn}</span>
						</div>
					</div>
					<div className='hero-banner-buttons'>
						{this.renderActionButton()}
						<button className='btn btn-transparent' onClick={() => this.editIssue()}>
							Edit Issue
						</button>
					</div>
				</div>
			</div>
		);
	}
	renderActionButton(){
		if(this.state.status === 'open'){
			return(
			<button className='btn btn-transparent' onClick={() => this.updateIssueStatus(2, 'closed')}>
				Close Issue
			</button>);
		}
		else if(this.state.status === 'closed'){
			return(
			<button className='btn btn-transparent' onClick={() => this.updateIssueStatus(3, 're-opened')}>
				Re-Open Issue
			</button>);
		}
		else if(this.state.status === 'reopened'){
			return(		
			<button className='btn btn-transparent' onClick={() => this.updateIssueStatus(2, 'closed')}>
				Close Issue
			</button>);
		}
	}
}

export default Header;