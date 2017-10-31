import React, {Component} from 'react';
class IssueAppliedFilters extends Component{
    render(){
        return (
            <div className='row issue-row filter'>
                <a href='#open' className='active'>
                    <i className='fa fa-exclamation-triangle' /> 10 Open
                </a>
                <a href='#closed' className='ml-15 item inactive'>
                    <i className='fa fa-check light-gray' /> 36 Closed
                </a>
            </div>
        );
    }
}

export default IssueAppliedFilters;