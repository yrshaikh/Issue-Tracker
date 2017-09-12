import React, {Component} from 'react';
class IssueRow extends Component{
    render(){
        var issue = this.props.issue;
        var slug = '/issue/' + issue.issueId + '/' + 'this-is-some-slug-123';
        return (
            <div className='row issue-row'>
                <div className='col-md-1'>
                    OPEN
                </div>
                <div className='col-md-11 row'>
                    <a href={slug} className='title col-md-12'>#{issue.issueId} {issue.title}</a>
                    <span className='col-md-12 gray'>
                        Created by {issue.createdBy} on {issue.createdOn}
                    </span>
                </div>
            </div>
        );
    }
}

export default IssueRow;