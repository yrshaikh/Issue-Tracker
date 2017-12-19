import React, { Component } from 'react';
import Filters from './../shared/filters.jsx';

const filters = new Filters();

class IssueAppliedFilters extends Component {
    render() {
        return (
            <div className="row issue-row filter">
                <a href={filters.getOpenIssues()} className="active">
                    <i className="fa fa-exclamation-triangle" /> 10 Open
                </a>
                <a href={filters.getClosedIssues()} className="ml-15 item inactive">
                    <i className="fa fa-check light-gray" /> 36 Closed
                </a>
            </div>
        );
    }
}

export default IssueAppliedFilters;
