import React, {Component} from 'react';
class IssueRow extends Component{
    render(){
        var issue = this.props.issue;
        var slug = '/issue/' + issue.issueId + '/' + 'this-is-some-slug-123';
        return (
            <div className='row issue-row'>
                <div className='col-md-11 row'>
                    <a href={slug} className='title dark-gray col-md-12'>
                        <i className='status fa fa-circle green'></i>                        
                        #{issue.issueId} {issue.title}
                    </a>
                    <span className='subtitle col-md-12 gray'>
                        Created by {issue.createdBy} on {issue.createdOn}
                    </span>
                </div>
            </div>
        );
    }
}

export default IssueRow;