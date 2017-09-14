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