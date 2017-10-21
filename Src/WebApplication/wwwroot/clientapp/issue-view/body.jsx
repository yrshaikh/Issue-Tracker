﻿import React, { Component } from 'react';
import TitleDescription from './components/body/title-description';
import IssueTimeline from './components/body/timeline';
import SelectPriority from './../shared/components/select-priority';
import SelectAssignee from './../shared/components/select-assignee';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.issue = this.props.issue;
    }

    render() {
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
                    <div className='col-md-3 sidebar'>
                        <SelectAssignee
                            projectId={this.state.issue.projectId}
                            issueId={this.state.issue.issueId}
                            id={this.state.issue.assigneeId}
                            label={this.state.issue.assigneeName}
                        />
                        <SelectPriority
                            issueId={this.state.issue.issueId}
                            id={this.state.issue.priorityId}
                            label={this.state.issue.priorityName}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Body;