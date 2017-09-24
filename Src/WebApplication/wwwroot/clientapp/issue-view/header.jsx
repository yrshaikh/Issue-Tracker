﻿import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import IssueStatus from './../shared/issue-status';
import GravatarWithUserInfo from './shared/gravatar-with-user-info';
const NotificationSystem = require('react-notification-system');
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
		this._notificationSystem = null;
		this.updateIssueStatus = this.updateIssueStatus.bind(this);
	}
	componentDidMount() {
		this._notificationSystem = this.refs.notificationSystem;
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
			self._notificationSystem.addNotification({
				title: '#' + self.state.issueId + ' Issue Updated',
				message: 'This issue has been ' + statusValue + '.',
				level: 'success',
				position: 'br',
				autoDismiss: 3
			});			
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
						<GravatarWithUserInfo 
							createdBy={this.state.createdBy}
							createdOn={this.state.createdOn}
							size="35"
							 />
						<GravatarWithUserInfo 
							createdBy={this.state.createdBy}
							createdOn={this.state.createdOn}
							size="35"
							 />
					</div>
					<div className='hero-banner-buttons'>
						{this.renderActionButton()}
						<button className='btn btn-transparent' onClick={() => this.editIssue()}>
							Edit Issue
						</button>
					</div>
				</div>
				<NotificationSystem ref="notificationSystem" />
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
			<button className='btn btn-transparent' onClick={() => this.updateIssueStatus(3, 'reopened')}>
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