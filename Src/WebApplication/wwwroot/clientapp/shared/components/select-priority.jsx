import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import _ from 'lodash';
import { ProjectsApi } from './../../apis/projects-api';
import { IssuesApi } from './../../apis/issues-api';
const NotificationSystem = require('react-notification-system');

class SelectPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.issueId,
            priorityId: this.props.id,
            priorityName: this.props.label,
            selectedPriorityId: this.props.id,
            selectedPriorityName: this.props.label,
            priorities: [],
            isPaneOpen: false
        };

        this.handleChange = this.handleChange.bind(this);
        this._notificationSystem = null;
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this.loadPriorities();
    }
    render() {
        return (
            <div className='form-group sidebar-item'>
                <div id='assignee-view'>
                    <label className='fw-bold w-100 hover-link' onClick={() => this.setState({ isPaneOpen: true })}>
                        Priority
                        <i className='fa fa-cog pull-right' />
                    </label>
                    <span className='cap'>{this.state.priorityName}</span>
                </div>
                <SlidingPane
                    className='assignee-sliding-pane'
                    overlayClassName='it-overlay-class'
                    isOpen={this.state.isPaneOpen}
                    title={'#' + this.state.issueId + ' - Update Priority'}
                    subtitle="sub title, sub title and sub title"
                    from='right'
                    width='355px'
                    onRequestClose={() => {
                        this.setState({ isPaneOpen: false });
                    }}>
                    <div>
                        <input type='text' className='form-control' placeholder='search' />
                        <ul>
                            {this.getPrioritiesDom()}
                        </ul>
                        <div>
                            <button className='btn btn-success btn-big mr-10' onClick={() => this.update()}>Update</button>
                            <button className='btn btn-default btn-big' onClick={() => this.cancel()}>Cancel</button>
                        </div>
                    </div>
                </SlidingPane>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
    loadPriorities() {
        var self = this;
        ProjectsApi.getPriorities()
            .then(function (priorities) {
                self.setState({ priorities: priorities });
            });
    }
    getPrioritiesDom() {
        var li = [];
        var self = this;
        _.each(this.state.priorities, function (priority) {
            var priorityDom = self.loadPrioritiesItem(priority);
            li.push(priorityDom);
        });
        return li;
    }
    loadPrioritiesItem(priority) {
        return (
            <li className={priority.value === this.state.selectedPriorityId ? 'active' : ''} key={priority.value} onClick={() => this.handleChange(priority)}>
                <span className='value'>
                    {priority.label}
                </span>
                <span className='selection'>
                    {
                        priority.value === this.state.selectedPriorityId ?
                            <i className='fa fa-check done' /> :
                            <i className='fa fa-check done done-hidden' />
                    }
                </span>
            </li>
        );
    }
    handleChange(priority) {
        this.setState({ selectedPriorityId: priority.value });
        this.setState({ selectedPriorityName: priority.label });
    }
    cancel() {
        var currentPriorityId = this.state.priorityId;
        // resetting the existing priority id
        this.setState({ selectedPriorityId: currentPriorityId });
        this.setState({ isPaneOpen: false });
    }
    update() {
        var self = this;
        // todo: check if update required?
        var updatedPriorityId = this.state.selectedPriorityId;
        var updatedPriorityName = this.state.selectedPriorityName;
        IssuesApi.updatePriority(this.state.issueId, updatedPriorityId)
            .then(function (response) {
                self.setState({ isPaneOpen: false });
                self.setState({ priorityId: updatedPriorityId });
                self.setState({ priorityName: updatedPriorityName });

                
                self._notificationSystem.addNotification({
                    title: '#' + self.state.issueId + ' Issue Updated',
                    message: 'You updated priority of this issue to ' + updatedPriorityName +  '.',
                    level: 'success',
                    position: 'br',
                    autoDismiss: 3
                });
            });
    }
}

export default SelectPriority;