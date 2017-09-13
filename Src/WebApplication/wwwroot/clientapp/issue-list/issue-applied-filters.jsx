import React, {Component} from 'react';
class IssueAppliedFilters extends Component{
    render(){
        return (
            <div className='row issue-row filter'>
                <b>Filtered by :</b>
                <span className='ml-10 item gray'>Status: Open & Resolved</span>
                <span className='gray separator'>|</span>
                <span className='item gray'>Assignee: Yasser Shaikh</span>
                <span className='gray separator'>|</span>
                <span className='item gray'>Tags: feature, bugs & support.</span>
            </div>
        );
    }
}

export default IssueAppliedFilters;