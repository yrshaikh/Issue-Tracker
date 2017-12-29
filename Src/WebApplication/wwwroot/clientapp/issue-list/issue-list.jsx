import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IssueAppliedFilters from './issue-applied-filters.jsx';
import IssueRow from './issue-row.jsx';
import Filters from './../shared/filters.jsx';
import { IssuesApi } from './../apis/issues-api.jsx';

const filters = new Filters();

class IssueList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCount: 0,
            closedCount: 0,
            issues: [],
        };
    }

    static get propTypes() {
        return {
            openCount: PropTypes.number,
            closedCount: PropTypes.number,
        };
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
                    <IssueAppliedFilters
                        openCount={this.state.openCount}
                        closedCount={this.state.closedCount}
                    />
                    {issues}
                </div>
            </div>
        );
    }

    fetchIssues() {
        const that = this;
        const queryParams = filters.getQueryParams();
        IssuesApi.getIssues(queryParams).then((issues) => {
            that.setState({ issues });
            if (issues && issues.length > 0 && issues[0]) {
                that.setState({ openCount: issues[0].openCount });
                that.setState({ closedCount: issues[0].closedCount });
            }
        });
    }
}

export default IssueList;
