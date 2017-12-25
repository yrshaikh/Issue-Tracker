import React, { Component } from 'react';
import Body from './issue-list/body.jsx';
import Header from './issue-list/header.jsx';
import Notification from './shared/components/notification.jsx';

class IssueListApp extends Component {
    render() {
        return (
            <div>
                <Header />
                <Notification />
                <Body />
            </div>
        );
    }
}

export default IssueListApp;
