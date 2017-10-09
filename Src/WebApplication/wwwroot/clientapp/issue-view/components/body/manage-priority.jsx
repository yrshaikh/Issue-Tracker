import React, { Component } from 'react';
import Priority from './../../../shared/components/priority';
import { IssuesApi } from './../../../apis/issues-api';
const NotificationSystem = require('react-notification-system');

class ManagePriority extends Component {
	constructor(props) {
		super(props);
		this.state = {
            issueId: this.props.issueId,
			priorityId: this.props.id,
			priorityName: this.props.label
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
                <div id='priority-view'>
					<label className='fw-bold'>Priority</label>
					<div className='cap'>
					{
						this.state.priorityName ? 
						<div className='cap'>{ this.state.priorityName }</div> :
						<div className='gray'>Un-Assigned</div>
					}
					</div>
				</div>
				<div id='priority-edit' style={style}>
					{ this.renderPriorityComponent() }
				</div>
				<NotificationSystem ref="notificationSystem" />
            </div>
		);
	}

	renderPriorityComponent(){
		return (
			<Priority
				label='Update Priority'
				priorityId={this.state.priorityId}
				action={this.handleChange} />
		);
	}

	mouseOver() {
        document.getElementById('priority-view').setAttribute('style', 'display:none;');
        document.getElementById('priority-edit').setAttribute('style', 'display:block;');
    }
    mouseLeaves(time) {
        document.getElementById('priority-view').setAttribute('style', 'display:block;');
        document.getElementById('priority-edit').setAttribute('style', 'display:none;');
    }

	handleChange(name, value, label){
        this.update(value, label);
		this.setState({priorityId: value});
		this.setState({priorityName: label});
		this.mouseLeaves();
	}

    update(value, label) {
		let self = this;
        IssuesApi.updatePriority(this.state.issueId, value)
            .then(function (response) {
                console.log('updated p', response);
            });
        this._notificationSystem.addNotification({
            title: '#' + self.state.issueId + ' Issue Updated',
            message: 'Priority has been changed to ' + label + '.',
            level: 'success',
            position: 'br',
            autoDismiss: 5
        });
    }
}

export default ManagePriority;