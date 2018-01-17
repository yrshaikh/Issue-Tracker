import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
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
                    <div className="title fw-bold">
                        <a href="/" className="issue-link mr-10">#{this.state.issue.issueId}.</a>
                        {this.state.issue.title}
                    </div>
                    <div className="more-details">
                        <IssueStatus additionalClasses=""
                            status={this.state.issue.status} />
                        <span className="link" onClick={this.backToIssueListing}>
                            <i className="mr-5 fa fa-long-arrow-left"></i>
                            return to issue listing
                        </span>
                        <EditIssueButton
                            issueId={this.state.issue.issueId} />
                        <CloseIssueButton
                            issueId={this.state.issue.issueId}
                            status={this.state.issue.status} />
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

    backToIssueListing() {
        window.history.go(-1);
    }
}

export default Header;
