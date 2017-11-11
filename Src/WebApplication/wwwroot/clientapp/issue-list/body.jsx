import React, { Component } from 'react';
import IssueList from './issue-list';

class Body extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="issues" className="body">
                <IssueList />
            </div>
        );
    }
}

export default Body;