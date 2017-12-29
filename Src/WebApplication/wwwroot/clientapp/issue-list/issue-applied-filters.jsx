import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filters from './../shared/filters.jsx';

const filters = new Filters();

class IssueAppliedFilters extends Component {
    static get propTypes() {
        return {
            openCount: PropTypes.number,
            closedCount: PropTypes.number,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            openCount: 0,
            closedCount: 0,
            issues: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ openCount: nextProps.openCount });
        this.setState({ closedCount: nextProps.closedCount });
    }

    render() {
        const openTabClasses = filters.getStatus() === 'open' ? 'active' : 'inactive';
        let closedTabClasses = 'ml-15 item';
        closedTabClasses = filters.getStatus() === 'closed' ? `${closedTabClasses} active` : `${closedTabClasses} inactive`;
        return (
            <div className="row issue-row filter">
                <a href={filters.getOpenIssues()} className={openTabClasses}>
                    <i className="fa fa-exclamation-triangle mr-5" /> {this.props.openCount} Open
                </a>
                <a href={filters.getClosedIssues()} className={closedTabClasses}>
                    <i className="fa fa-check mr-5" /> {this.props.closedCount} Closed
                </a>
            </div>
        );
    }
}

export default IssueAppliedFilters;
