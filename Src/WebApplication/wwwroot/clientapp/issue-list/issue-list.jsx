import React, { Component } from 'react';
import IssueAppliedFilters from './issue-applied-filters.jsx';
import IssueRow from './issue-row.jsx';
import Filters from './../shared/filters.jsx';
import { IssuesApi } from './../apis/issues-api.jsx';

const filters = new Filters();

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
        const filterObj = filters.get();
        IssuesApi.getIssues(filterObj).then((issues) => {
            that.setState({ issues });
        });
    }
}

export default IssueList;
