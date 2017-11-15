import React, { Component } from 'react';
import Body from './issue-list/body.jsx';
import Header from './issue-list/header.jsx';

class IssueListApp extends Component {
    render() {
        return (
            <div>
                <Header />
                <Body />
            </div>
        );
    }
}

export default IssueListApp;
