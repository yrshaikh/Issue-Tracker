import React, {Component} from 'react';
import { getSlug } from './../shared/utils';
class IssueRow extends Component{
    render(){
        var issue = this.props.issue;
        var url = '/issue/' + issue.issueId + '/' + getSlug(issue.title);
        return (
            <div className='row issue-row'>
                <div className='col-md-11 row'>
                    <a href={url} className='title dark-gray col-md-12 fw-bold'>
                        <span title={issue.status}>{this.renderStatusIcon(issue.status)}</span>
                        <span className='mr-10'>#{issue.issueId} {issue.title}</span>
                    </a>
                    <span className='subtitle col-md-12 gray'>
                        Created by {issue.createdBy} on {issue.createdOn}
                    </span>
                </div>
            </div>
        );
    }

    renderStatusIcon(status){
        var classes =  'status fa ';
        if(status === 'open' || status === 'reopened')
            classes += 'green fa-circle';
        else  if(status === 'closed')
            classes += 'red fa-circle';
        else  if(status === 'closed')
            classes += 'yellow fa-dot-circle-o';
                
        return(
            <i className={classes}></i>
        );
    }
}

export default IssueRow;