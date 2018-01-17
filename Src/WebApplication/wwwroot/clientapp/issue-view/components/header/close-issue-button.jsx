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
        let statusId;
        let statusText;
        let linkText;

        if (this.state.status === 'open' || this.state.status === 'reopened') {
            statusId = 2;
            statusText = 'closed';
            linkText = 'close issue';
        } else if (this.state.status === 'closed') {
            statusId = 3;
            statusText = 'reopened';
            linkText = 're-open issue';
        }

        return (
            <span className="link close-link"
                onClick={() => this.updateStatus(statusId, statusText)}>
                <i className="mr-5 fa fa-window-close"></i>
                {linkText}
            </span>
        );
    }

    updateStatus(statusId, statusValue) {
        if (!statusId) {
            return;
        }
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
