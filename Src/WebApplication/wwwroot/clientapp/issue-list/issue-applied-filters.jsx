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
        return (
            <div className="row issue-row filter">
                <a href={filters.getOpenIssues()} className="active">
                    <i className="fa fa-exclamation-triangle mr-5" /> {this.props.openCount} Open
                </a>
                <a href={filters.getClosedIssues()} className="ml-15 item inactive">
                    <i className="fa fa-check light-gray mr-5" /> {this.props.closedCount} Closed
                </a>
            </div>
        );
    }
}

export default IssueAppliedFilters;
