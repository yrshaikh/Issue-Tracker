import React, {Component} from 'react';
import IssueRow from './issue-row';
import IssueAppliedFilters from './issue-applied-filters';
const axios = require('axios');

class IssueList extends Component{
    constructor(props){
        super(props);
        this.state = {
            fetching: true
            , issues: []
        }
    }

    
	componentWillMount(){
	}
	componentDidMount(){
        this.fetchIssues();
	}
	componentWillUnmount(){
    }
    
    fetchIssues(){
        var self = this;
        axios.get('/issue/get', {
			projectId: this.state.projectId
			, title : this.state.title
			, description: this.state.description
		})
		.then(function (response) {
            self.setState({ fetching : false });
            self.setState({ issues : response.data });
		})
		.catch(function (error) {
			self.setState({ fetching : false });
			self.setState({ error : true });
			console.log(error);
		});
    }

    render(){
        var issues = [];
        for(var i = 0; i < this.state.issues.length; i++){
            issues.push(<IssueRow issue={this.state.issues[i]} key={i} />);
        }

        return(
            <div id='issue-list' className='row'>
                <div className='width-100-percent mb-15'>
                    <a className='btn btn-success pull-right' href='issue/new'>New Issue</a>
                </div>
                <div className='col-md-12'>
                    <IssueAppliedFilters />
                    {issues}
                </div>
            </div>
        );
    }
}

export default IssueList;