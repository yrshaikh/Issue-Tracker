import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import IssueStatus from './../shared/issue-status';
import CloseIssueButton from './components/header-components/close-issue-button';
import EditIssueButton from './components/header-components/edit-issue-button';
import AuthorAndResolver from './components/header-components/author-and-resolver';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.issue = this.props.issue;
	}

	componentWillMount(){
		PubSub.subscribe('ISSUE_STATUS_UPDATED', this.handleIssueStatusUpdate.bind(this));
	}

	render () {
		return (
			<div id='hero-issues-view' className='hero-banner hero-banner-issue-view'>
				<div className='hero-banner-inner'>
					<div className='hero-banner-summary'>
						<div className='info'>
							<span className='id fw-light'>#{this.state.issue.issueId}</span>
							<IssueStatus additionalClasses='fs-16' status={this.state.issue.status} />
						</div>
						<AuthorAndResolver issue={this.state.issue} />
					</div>
					<div className='hero-banner-buttons'>
						<CloseIssueButton 
							issueId={this.state.issue.issueId}
							status={this.state.issue.status} />
						<EditIssueButton 
							issueId={this.state.issue.issueId} />
					</div>
				</div>
			</div>
		);
	}

	handleIssueStatusUpdate(msg, data){
		var updatedIssue = this.state.issue;
		updatedIssue.status = data.value;
		this.setState({issue: updatedIssue});
	}
}

export default Header;