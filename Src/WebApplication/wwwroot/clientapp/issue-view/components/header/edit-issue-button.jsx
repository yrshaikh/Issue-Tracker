import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class EditIssueButton extends Component {
    render() {
        return (
            <span className="link" onClick={() => this.editIssue()}>
                edit issue
            </span>
        );
    }

    editIssue() {
        PubSub.publish('ISSUE_EDIT');
    }
}

export default EditIssueButton;
