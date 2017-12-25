import React, { Component } from 'react';
import Body from './issue-create/body.jsx';
import Header from './issue-create/header.jsx';
import Notification from './shared/components/notification.jsx';


class IssueCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = { defaultProjectId: window.app.defaultProjectId };
    }

    render() {
        return (
            <div>
                <Header />
                <Notification />
                <Body defaultProjectId={this.state.defaultProjectId} />
            </div>
        );
    }
}

export default IssueCreateApp;
