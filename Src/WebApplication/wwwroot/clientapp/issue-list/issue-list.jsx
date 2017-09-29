import React, {Component} from 'react';
import IssueRow from './issue-row';
import IssueAppliedFilters from './issue-applied-filters';
import { IssuesApi } from './../apis/issues-api';

class IssueList extends Component {

    constructor(props){
        super(props);
        this.state = {
            issues: []
        }
    }

    componentDidMount() {
        this.fetchIssues();
	}

    render() {
        var issues = [];
        for(var i = 0; i < this.state.issues.length; i++){
            issues.push(<IssueRow issue={this.state.issues[i]} key={i} />);
        }
        return(
            <div id='issue-list' className='row'>
                <div className='width-100-percent mb-15'>
                    <div id='applied-filters'>
                        <span className="badge badge-default">Assignee: Yasser Shaikh & Ali Rizvi &nbsp;<i className='fa fa-close' /></span>
                        <span className="badge badge-default">Priorty: Critical  &nbsp;<i className='fa fa-close' /></span>
                        <span className="badge badge-default">Milestone: 1st November 2017  &nbsp;<i className='fa fa-close' /></span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <IssueAppliedFilters />
                        {issues}
                    </div>
                </div>
            </div>
        );
    }
    
    fetchIssues() {
        var self = this;
        IssuesApi.getIssues()
		.then(function (issues) {
            self.setState({ issues : issues });
		});
    }    
};

export default IssueList;