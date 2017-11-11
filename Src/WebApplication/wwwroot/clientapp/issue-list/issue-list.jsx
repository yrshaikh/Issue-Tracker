import React, { Component } from 'react';
import IssueRow from './issue-row';
import IssueAppliedFilters from './issue-applied-filters';
import { IssuesApi } from './../apis/issues-api';

class IssueList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issues: []
        }
    }

    componentDidMount() {
        this.fetchIssues();
    }

    render() {
        var issues = [];
        for (var i = 0; i < this.state.issues.length; i++) {
            issues.push(<IssueRow issue={this.state.issues[i]} key={i} />);
        }
        return (
            <div id='issue-list' className='row'>
                <div className='col-md-9'>
                    <IssueAppliedFilters />
                    {issues}
                </div>
            </div>
        );
    }

    fetchIssues() {
        var self = this;
        IssuesApi.getIssues()
            .then(function (issues) {
                self.setState({ issues: issues });
            });
    }
};

export default IssueList;