import React, { Component } from 'react';
import Assignee from './../../../shared/components/assignee';

class ManageAssignee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectId: this.props.projectId,
			assigneeId: this.props.assigneeId,
			assigneeName: this.props.assigneeName
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.mouseLeaves();
	}
    
	render() {
		return (
            <div className='form-group sidebar-item' onMouseEnter={this.mouseOver} onMouseLeave={this.mouseLeaves}>
                <div id='assignee-view'>
					<label className='fw-bold'>Assignee</label>
					<div className='cap'>{ this.state.assigneeName }</div>
				</div>
				<div id='assignee-edit'>
					{ this.renderAssigneeComponent() }
				</div>
            </div>
		);
	}

	renderAssigneeComponent(){
		return (
			<Assignee
				label='Update Assignee' 
				projectId={this.state.projectId} 
				action={this.handleChange} />
		);
	}

	mouseOver(event) {        
        document.getElementById('assignee-view').setAttribute('style', 'display:none;');
        document.getElementById('assignee-edit').setAttribute('style', 'display:block;');
    }
    mouseLeaves(event) {
        document.getElementById('assignee-view').setAttribute('style', 'display:block;');
        document.getElementById('assignee-edit').setAttribute('style', 'display:none;');
    }

	handleChange(name, value, label){
		this.setState({assigneeId: value});
		this.setState({assigneeName: label});
		this.mouseLeaves();
	}
}

export default ManageAssignee;