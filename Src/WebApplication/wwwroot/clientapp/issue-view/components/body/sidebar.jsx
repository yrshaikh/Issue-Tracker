import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dates from './sidebar/dates.jsx';
import People from './sidebar/people.jsx';
import SelectAssignee from './../../../shared/components/select-assignee.jsx';
import SelectPriority from './../../../shared/components/select-priority.jsx';

class Sidebar extends Component {
    static get propTypes() {
        return {
            issue: PropTypes.object,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            issue: this.props.issue,
        };
    }

    render() {
        return (
            <div className="col-md-4 sidebar">
                <People
                    createdBy={this.state.issue.createdBy}
                    createdByEmail={this.state.issue.createdByEmail}
                    closedBy={this.state.issue.closedBy}
                    closedByEmail={this.state.issue.closedByEmail}
                />
                <Dates
                    createdOn={this.state.issue.createdOn}
                    closedOn={this.state.issue.closedOn}
                />
                <SelectAssignee
                    projectId={this.state.issue.projectId}
                    issueId={this.state.issue.issueId}
                    id={this.state.issue.assigneeId}
                    label={this.state.issue.assigneeName}
                />
                <SelectPriority
                    issueId={this.state.issue.issueId}
                    id={this.state.issue.priorityId}
                    label={this.state.issue.priorityName}
                />
            </div>
        );
    }
}

export default Sidebar;
