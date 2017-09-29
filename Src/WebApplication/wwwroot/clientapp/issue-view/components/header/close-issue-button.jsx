import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { IssuesApi } from './../../../apis/issues-api';
const NotificationSystem = require('react-notification-system');

class CloseIssueButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
            issueId: this.props.issueId,
            status: this.props.status
        };
		this.updateStatus = this.updateStatus.bind(this);
    }
    
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    
    render () {
		return (
            <span>
			    {this.renderActionButton()}
				<NotificationSystem ref="notificationSystem" />
            </span>
		);
    }
    
	renderActionButton(){
		var status = this.state.status;
		if(status === 'open'){
			return(
			<button className='btn btn-transparent' onClick={() => this.updateStatus(2, 'closed')}>
				Close Issue
			</button>);
		}
		else if(status === 'closed'){
			return(
			<button className='btn btn-transparent' onClick={() => this.updateStatus(3, 'reopened')}>
				Re-Open Issue
			</button>);
		}
		else if(status === 'reopened'){
			return(
			<button className='btn btn-transparent' onClick={() => this.updateStatus(2, 'closed')}>
				Close Issue
			</button>);
		}
	}

	updateStatus(statusId, statusValue){        
		if(!confirm('Are you sure you want to change the status of the issue?'))
			return;

		this.setState({status: statusValue});

		var self = this;
		IssuesApi.updateStatus(this.state.issueId, statusId)
		.then(function (response) {
            PubSub.publish('ISSUE_STATUS_UPDATED', { id : statusId, value : statusValue});
			self._notificationSystem.addNotification({
				title: '#' + self.state.issueId + ' Issue Updated',
				message: 'This issue has been ' + statusValue + '.',
				level: 'success',
				position: 'br',
				autoDismiss: 3
			});			
		});
    }	
}

export default CloseIssueButton;