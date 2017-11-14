import React, {Component} from 'react';
import AddComment from './components/body/add-comment';
import IssueTimeline from './components/body/timeline';
import PropTypes from 'prop-types';
import SelectAssignee from './../shared/components/select-assignee';
import SelectPriority from './../shared/components/select-priority';
import TitleDescription from './components/body/title-description';

class Body extends Component {

    static get propTypes () {

        return {'issue': PropTypes.object};

    }

    constructor (props) {

        super(props);
        this.state = {};
        this.state.issue = this.props.issue;

    }

    render () {

        return (
            <div id="issues-view" className="body">
                <form id="issue-view-form" className="row custom-form">
                    <div className="col-md-9 main">
                        <TitleDescription
                            issueId={this.state.issue.issueId}
                            title={this.state.issue.title}
                            description={this.state.issue.description}
                            createdBy={this.state.issue.createdBy}
                            createdByEmail={this.state.issue.createdByEmail}
                            createdOn={this.state.issue.createdOn}
                        />
                        <IssueTimeline
                            issueId={this.state.issue.issueId}
                            ref={(ref) => {

                                this.timeline = ref;

                            }}
                        />
                        <AddComment
                            issueId={this.state.issue.issueId}
                            commentAddedCallback={this.commentAddedCallback}
                        />
                    </div>
                    <div className="col-md-3 sidebar">
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

    commentAddedCallback (comment) {

        const data = {
            'content': comment,
            'createdBy': 'You',
            'createdByEmail': 'dummy@dummy.com',
            'createdOn': new Date(),
            'type': 'comment'
        };
        this.timeline.updateTimeline(data);

    }

}

export default Body;
