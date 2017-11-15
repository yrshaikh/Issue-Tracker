import React, { Component } from 'react';
import IssueAppliedFilters from './issue-applied-filters.jsx';
import IssueRow from './issue-row.jsx';
import { IssuesApi } from './../apis/issues-api.jsx';

class IssueList extends Component {
    constructor(props) {
        super(props);
        this.state = { issues: [] };
    }

    componentDidMount() {
        this.fetchIssues();
    }

    render() {
        const issues = [];
        for (let index = 0; index < this.state.issues.length; index += 1) {
            const issueRow =
                <IssueRow issue={this.state.issues[index]} key={index} />;
            issues.push(issueRow);
        }
        return (
            <div id="issue-list" className="row">
                <div className="col-md-9">
                    <IssueAppliedFilters />
                    {issues}
                </div>
            </div>
        );
    }

    fetchIssues() {
        const that = this;
        IssuesApi.getIssues().then((issues) => {
            that.setState({ issues });
        });
    }
}

export default IssueList;
