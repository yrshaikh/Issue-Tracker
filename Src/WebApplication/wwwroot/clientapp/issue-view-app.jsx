import React, {Component} from 'react';
import Body from './issue-view/body';
import Header from './issue-view/header';

class IssueViewApp extends Component {

    constructor (props) {

        super(props);

        const issue = window.app.issue;

        this.status = {
            'issue': {
                'assigneeId': issue.AssigneeId,
                'assigneeName': issue.AssigneeName,
                'closedBy': issue.ClosedBy,
                'closedByEmail': issue.ClosedByEmail,
                'closedOn': issue.ClosedOn,
                'createdBy': issue.CreatedBy,
                'createdByEmail': issue.CreatedByEmail,
                'createdOn': issue.CreatedOn,
                'description': issue.Description,
                'issueId': issue.IssueId,
                'priorityId': issue.PriorityId,
                'priorityName': issue.PriorityName,
                'projectId': issue.ProjectId,
                'projectName': issue.ProjectName,
                'status': issue.Status,
                'title': issue.Title
            }
        };

    }

    render () {

        return (
            <div>
                <Header issue={this.status.issue} />
                <Body issue={this.status.issue} />
            </div>
        );

    }

}

export default IssueViewApp;
