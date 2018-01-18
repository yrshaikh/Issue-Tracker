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

        let assignee = '';
        let comments = '';
        let title = '';

        // todo change with assignee.
        if (issue.createdByEmail) {
            assignee = (
                <span className="assignee" title={issue.createdBy}>
                    <Gravatar email={issue.createdByEmail} size={18}
                        default="retro" />
                </span>
            );
        }

        if (issue.commentsCount) {
            comments = (
                <span className="comments">
                    {issue.commentsCount} <i className="fa fa-comment-o"></i>
                </span>
            );
        }

        title = (
            <span className="title">
                <a href={url}>#{issue.issueId}.</a>
                <span className="ml-5">{issue.title}</span>
            </span>
        );

        return (
            <div className="row issue-row">
                <div className="single-issue">
                    { title }
                    { assignee }
                    { comments }
                    {/* <span className="col-md-12 subtitle light-gray">
                        <span>opened <Moment fromNow>{issue.createdOn}</Moment> by </span>
                        <span title={issue.createdByEmail}>{issue.createdBy}</span>
                    </span> */}
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
