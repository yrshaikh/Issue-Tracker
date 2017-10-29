import React, {Component} from 'react';
import Moment from 'react-moment';
import { getSlug } from './../shared/utils';
class IssueRow extends Component{
    render(){
        var issue = this.props.issue;
        var url = '/issue/' + issue.issueId + '/' + getSlug(issue.title);
        return (
            <div className='row issue-row'>
                <div className='col-md-11 row'>
                    <a href={url} className='title dark-gray col-md-12'>
                        {/* <span title={issue.status}>{this.renderStatusIcon(issue.status)}</span> */}
                        <span className='mr-10'>{issue.title}</span>
                    </a>
                    <span className='subtitle col-md-12 light-gray fs-12'>
                        #{issue.issueId} opened <Moment fromNow>{issue.createdOn}</Moment> by <span className='cap'>{issue.createdBy}</span>
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