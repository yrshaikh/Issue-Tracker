import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class EditIssueButton extends Component {
    render() {
        return (
            <span>
                <button className="btn btn-transparent"
                    onClick={() => this.editIssue()}>
                    Edit Issue
                </button>
            </span>
        );
    }

    editIssue() {
        PubSub.publish('ISSUE_EDIT');
    }
}

export default EditIssueButton;
