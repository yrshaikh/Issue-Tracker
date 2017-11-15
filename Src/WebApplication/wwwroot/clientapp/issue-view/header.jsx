﻿import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import AuthorAndResolver from './components/header/author-and-resolver.jsx';
import CloseIssueButton from './components/header/close-issue-button.jsx';
import EditIssueButton from './components/header/edit-issue-button.jsx';
import IssueStatus from './../shared/issue-status.jsx';

class Header extends Component {
    static get propTypes() {
        return { issue: PropTypes.object };
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.state.issue = this.props.issue;
    }

    componentWillMount() {
        PubSub.subscribe(
            'ISSUE_STATUS_UPDATED',
            this.handleIssueStatusUpdate.bind(this),
        );
    }

    render() {
        return (
            <div id="hero-issues-view"
                className="hero-banner hero-banner-issue-view">
                <div className="hero-banner-inner">
                    <div className="hero-banner-summary">
                        <div className="info">
                            <span className="id fw-light">
                                #{this.state.issue.issueId}
                            </span>
                            <IssueStatus additionalClasses="fs-16"
                                status={this.state.issue.status} />
                        </div>
                        <AuthorAndResolver
                            closedBy={this.state.issue.closedBy}
                            closedByEmail={this.state.issue.closedByEmail}
                            closedOn={this.state.issue.closedOn}
                            createdBy={this.state.issue.createdBy}
                            createdByEmail={this.state.issue.createdByEmail}
                            createdOn={this.state.issue.createdOn}
                            status={this.state.issuestatus}
                        />
                    </div>
                    <div className="hero-banner-buttons">
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

    handleIssueStatusUpdate(msg, data) {
        const updatedIssue = this.state.issue;
        updatedIssue.status = data.value;
        this.setState({ issue: updatedIssue });
    }
}

export default Header;
