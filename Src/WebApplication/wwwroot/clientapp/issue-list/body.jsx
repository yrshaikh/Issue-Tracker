import React, { Component } from 'react';
import IssueList from './issue-list.jsx';

class Body extends Component {
    render() {
        return (
            <div id="issues" className="body">
                <IssueList />
            </div>
        );
    }
}

export default Body;