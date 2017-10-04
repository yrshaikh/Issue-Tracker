import React, { Component } from 'react';
import Assignee from './../../../shared/components/assignee';
import { IssuesApi } from './../../../apis/issues-api';
const NotificationSystem = require('react-notification-system');

class ManageAssignee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: this.props.issueId,
			projectId: this.props.projectId,
			assigneeId: this.props.id,
			assigneeName: this.props.label
		};
		this.handleChange = this.handleChange.bind(this);
        this._notificationSystem = null;
	}

	componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
    }
    
	render() {
	    let style = {
	        display: 'none'
        };
		return (
            <div className='form-group sidebar-item' onMouseEnter={this.mouseOver} onMouseLeave={this.mouseLeaves}>
                <div id='assignee-view'>
					<label className='fw-bold'>Assignee</label>
					{
						this.state.assigneeName ? 
						<div className='cap'>{ this.state.assigneeName }</div> :
						<div className='gray'>Un-Assigned</div>
					}
				</div>
				<div id='assignee-edit' style={style}>
					{ this.renderAssigneeComponent() }
				</div>
                <NotificationSystem ref="notificationSystem" />
            </div>
		);
	}

	renderAssigneeComponent(){
		return (
			<Assignee
				label='Update Assignee' 
				defaultValue={this.state.assigneeId}
				projectId={this.state.projectId} 
				action={this.handleChange} />
		);
	}

    mouseOver() {        
        document.getElementById('assignee-view').setAttribute('style', 'display:none;');
        document.getElementById('assignee-edit').setAttribute('style', 'display:block;');
    }
    mouseLeaves(time) {
        document.getElementById('assignee-view').setAttribute('style', 'display:block;');
        document.getElementById('assignee-edit').setAttribute('style', 'display:none;');        
    }

	handleChange(name, value, label){
		this.update(value, label);
		this.setState({assigneeId: value});
		this.setState({assigneeName: label});
		this.mouseLeaves();
	}
	
	update(value, label){
        IssuesApi.updateAssignee(this.state.issueId, value)
            .then(function (response) {
                console.log('updated a', response);
            });
        this._notificationSystem.addNotification({
            title: '#' + this.state.issueId + ' Issue Updated',
            message: 'You updated title and description of this issue.',
            level: 'success',
            position: 'br',
            autoDismiss: 5
        });
    }
}

export default ManageAssignee;