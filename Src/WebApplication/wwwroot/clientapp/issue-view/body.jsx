import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import Moment from 'react-moment';
import AddComment from './components/body/add-comment.jsx';
import CloseIssueButton from './components/header/close-issue-button.jsx';
import EditIssueButton from './components/header/edit-issue-button.jsx';
import IssueStatus from './../shared/issue-status.jsx';
import Timeline from './components/body/timeline.jsx';
import SelectAssignee from './../shared/components/select-assignee.jsx';
import SelectPriority from './../shared/components/select-priority.jsx';
import TitleDescription from './components/body/title-description.jsx';

const axios = require('axios');

class Body extends Component {
    static get propTypes() {
        return {
            currentUser: PropTypes.object,
            issue: PropTypes.object,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            issue: this.props.issue,
            timeline: [],
            timelineLoading: true,
        };
    }

    componentDidMount() {
        this.loadTimelineData();
        this.triggerNotificationIfNewlyCreated();
    }

    render() {
        return (
            <div id="issues-view" className="body">
                <form id="issue-view-form" className="row custom-form">
                    <div className="col-md-8 main">
                        <TitleDescription
                            issueId={this.state.issue.issueId}
                            title={this.state.issue.title}
                            description={this.state.issue.description}
                            createdBy={this.state.issue.createdBy}
                            createdByEmail={this.state.issue.createdByEmail}
                            createdOn={this.state.issue.createdOn}
                        />
                        <Timeline
                            timeline={this.state.timeline}
                            loading={this.state.timelineLoading}
                        />
                        <AddComment
                            currentUser={this.state.currentUser}
                            issueId={this.state.issue.issueId}
                            commentAddedCallback={this.commentAddedCallback.bind(this)}
                        />
                    </div>
                    <div className="col-md-4 sidebar">
                        <div className="people sidebar-item">
                            <label className="fw-bold w-100">People</label>
                            <div>
                                <span className="lighter-gray">Created By: </span>
                                <span title={this.state.issue.createdByEmail}>
                                    {this.state.issue.createdBy}
                                </span>
                            </div>
                            <div>
                                <span className="lighter-gray">Closed By: </span>
                                <span title={this.state.issue.closedByEmail}>
                                    {this.state.issue.closedBy}
                                </span>
                            </div>
                        </div>
                        <div className="dates sidebar-item">
                            <label className="fw-bold w-100">Dates</label>
                            <div>
                                <span className="lighter-gray">Created: </span>
                                <span>
                                    <Moment fromNow>{this.state.issue.createdOn}</Moment>
                                </span>
                            </div>
                            <div>
                                <span className="lighter-gray">Closed: </span>
                                <span>
                                    <Moment fromNow>{this.state.issue.closedOn}</Moment>
                                </span>
                            </div>
                        </div>
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

    loadTimelineData() {
        const that = this;
        axios.get(`/issue/${this.state.issue.issueId}/timeline`)
            .then((response) => {
                that.setState({ timeline: response.data });
                that.setState({ timelineLoading: false });
            })
            .catch(error => error);
    }

    commentAddedCallback(comment) {
        const newComment = {
            content: comment,
            createdBy: 'You',
            createdByEmail: 'dummy@dummy.com',
            createdOn: new Date(),
            type: 'comment',
        };
        const timeline = this.state.timeline;
        timeline.push(newComment);
        this.setState(timeline);
        PubSub.publish('NOTIFY', { message: 'A new comment was added' });
    }

    triggerNotificationIfNewlyCreated() {
        if (window.location.search.indexOf('?new') !== -1) {
            PubSub.publish('NOTIFY', { message: 'A new issue has been created.' });
        }
    }
}

export default Body;
