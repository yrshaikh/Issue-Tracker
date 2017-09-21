import React, {Component} from 'react';
class IssueRow extends Component{
    slugify(text)
    {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
    render(){
        var issue = this.props.issue;
        var url = '/issue/' + issue.issueId + '/' + this.slugify(issue.title);
        return (
            <div className='row issue-row'>
                <div className='col-md-11 row'>
                    <a href={url} className='title dark-gray col-md-12'>
                        {this.renderStatusIcon(issue.status)}
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