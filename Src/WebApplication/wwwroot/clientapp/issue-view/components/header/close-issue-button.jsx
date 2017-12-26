import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { IssuesApi } from './../../../apis/issues-api.jsx';

class CloseIssueButton extends Component {
    static get propTypes() {
        return {
            issueId: PropTypes.number,
            status: PropTypes.string,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.issueId,
            status: this.props.status,
        };
        this.updateStatus = this.updateStatus.bind(this);
    }

    render() {
        return (
            <span>
                {this.renderActionButton()}
            </span>
        );
    }

    renderActionButton() {
        const closedStatusId = 2;
        const reopenedStatusId = 3;
        if (this.state.status === 'open' || this.state.status === 'reopened') {
            return (
                <button className="btn btn-transparent"
                    onClick={
                        () => this.updateStatus(closedStatusId, 'closed')
                    }>
                    Close Issue
                </button>);
        } else if (this.state.status === 'closed') {
            return (
                <button className="btn btn-transparent"
                    onClick={
                        () => this.updateStatus(reopenedStatusId, 'reopened')
                    }>
                    Re-Open Issue
                </button>);
        }

        return '';
    }

    updateStatus(statusId, statusValue) {
        if (!confirm('Are you sure you want to continue with this operation?')) {
            return;
        }
        this.setState({ status: statusValue });
        IssuesApi.updateStatus(this.state.issueId, statusId).then(() => {
            PubSub.publish(
                'ISSUE_STATUS_UPDATED',
                {
                    id: statusId,
                    value: statusValue,
                },
            );
        }).then(() => {
            const message = `You just ${statusValue} this issue`;
            let classes = 'success';
            if (statusValue === 'closed') {
                classes = 'error';
            }
            PubSub.publish('NOTIFY', { message, classes });
        });
    }
}

export default CloseIssueButton;
