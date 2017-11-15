import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { getSlug } from './../shared/utils.jsx';

class IssueRow extends Component {
    static get propTypes() {
        return { issue: PropTypes.object };
    }

    render() {
        const issue = this.props.issue;
        const url = `/issue/${issue.issueId}/${getSlug(issue.title)}`;
        issue.createdByEmail = 'yasser@outlook.com';
        return (
            <div className="row issue-row">
                <div className="col-md-12 row">
                    <a href={url} className="title dark-gray col-md-12">
                        <span className="title-text">{issue.title}</span>
                        <span className="title-assignee"
                            title={issue.createdByEmail}>
                            <Gravatar email={issue.createdByEmail} size={16}
                                default="retro" />
                            <span className="light-gray ml-10 fs-14">
                                <i className="fa fa-comment-o" /> 3</span>
                        </span>
                    </a>
                    <span className="subtitle col-md-12 light-gray fs-12">
                        <span>#{issue.issueId} opened</span>
                        <Moment fromNow>{issue.createdOn}</Moment>
                        <span>by</span>
                        <span className="cap">{issue.createdBy}</span>
                    </span>
                </div>
            </div>
        );
    }

    renderStatusIcon(status) {
        let classes = 'status fa ';
        if (status === 'open' || status === 'reopened') {
            classes += 'green fa-circle';
        } else if (status === 'closed') {
            classes += 'red fa-circle';
        } else if (status === 'closed') {
            classes += 'yellow fa-dot-circle-o';
        }

        return (
            <i className={classes}></i>
        );
    }
}

export default IssueRow;
