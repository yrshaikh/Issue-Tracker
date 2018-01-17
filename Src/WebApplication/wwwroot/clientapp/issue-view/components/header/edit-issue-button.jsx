import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class EditIssueButton extends Component {
    render() {
        return (
            <span className="link" onClick={() => this.editIssue()}>
                <i className="mr-5 fa fa-pencil-square"></i>
                edit issue
            </span>
        );
    }

    editIssue() {
        PubSub.publish('ISSUE_EDIT');
    }
}

export default EditIssueButton;
