import React, { Component } from 'react';
import PubSub from 'pubsub-js';
const Select = require('react-select/dist/react-select.js');
const NotificationSystem = require('react-notification-system');
const axios = require('axios');

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
            issueId: window.app.issue.IssueId,
            priority: 'Normal'
        };
		this._notificationSystem = null;
        this.loadPriority();
                
		this.priorityChanged = this.priorityChanged.bind(this);
    }
	componentDidMount() {
		this._notificationSystem = this.refs.notificationSystem;
	}
    loadPriority(){
        this.priority = [];
        this.priority.push({
            value: 'High',
            label: 'High'
        });
        this.priority.push({
            value: 'Normal',
            label: 'Normal'
        });
        this.priority.push({
            value: 'Low',
            label: 'Low'
        });
        this.priority.push({
            value: 'Trivial',
            label: 'Trivial'
        });
    } 
	priorityChanged(selection) {
        this.setState({ priority : selection.value });
        PubSub.publish('PRIORITY_CHANGED', selection.value);
        this._notificationSystem.addNotification({
            title: '#' + this.state.issueId + ' Issue Updated',
            message: 'Priority set to ' + selection.value.toLowerCase() + '.',
            level: 'success',
            position: 'br',
            autoDismiss: 3
        });
        this.mouseLeaves(null, 'priority');
	}
    mouseOver(e, id) {
        var id = e === null ? id : e.currentTarget.id;
        document.getElementsByClassName(id + '-label')[0].setAttribute('style', 'display:none;');
        document.getElementsByClassName(id + '-select')[0].setAttribute('style', 'display:block;');
    }
    mouseLeaves(e, id) {
        var id = e === null ? id : e.currentTarget.id;
        document.getElementsByClassName(id + '-label')[0].setAttribute('style', 'display:block;');
        document.getElementsByClassName(id + '-select')[0].setAttribute('style', 'display:hidden;');
    }
	render() {
		return (
            <div className='col-md-3 sidebar'>
                <div id='priority' className='form-group item' 
                        onMouseEnter={this.mouseOver}
                        onMouseLeave={this.mouseLeaves}>
                    <span>
                        <label className='fw-bold'>Priority</label>
                        <i className='fa fa-cog pull-right cursor-hand' />
                    </span>
                    <div className="priority-label">{this.state.priority}</div>
                    <Select
                        className='priority-select hidden'
                        value={this.state.priority}
                        options={this.priority}
                        onChange={this.priorityChanged}
                        clearable={false}
                        searchable={false}
                        />
                </div>
                <div className='form-group item'>
                    <span>
                        <label className='fw-bold'>Assignee</label>
                        <i className='fa fa-cog pull-right cursor-hand' />
                    </span>
                    <div>John Cena</div>
                </div>
				<NotificationSystem ref="notificationSystem" />
            </div>
		);
	}
}

export default Sidebar;