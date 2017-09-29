import React, { Component } from 'react';
import TitleDescription from './components/body/title-description';
import SideBar from './components/body/sidebar';
import IssueTimeline from './components/body/timeline';

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.issue = this.props.issue;
	}
	
	render(){
		return (
			<div id="issues-view" className="body">
				<form id='issue-view-form' className='row custom-form'>
					<div className='col-md-9 main'>
						<TitleDescription
							issueId={this.state.issue.issueId}
							title={this.state.issue.title}
							description={this.state.issue.description}
							createdBy={this.state.issue.createdBy}
							createdByEmail={this.state.issue.createdByEmail}
						/>							
						<IssueTimeline issueId={this.state.issue.issueId} />
					</div>
					<SideBar />
				</form>
			</div>
		);
	}	
}

export default Body;