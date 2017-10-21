﻿import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import _ from 'lodash';
import { ProjectsApi } from './../../apis/projects-api';
import { IssuesApi } from './../../apis/issues-api';
class SelectAssignee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.issueId,
            assigneeId: this.props.id,
            assigneeName: this.props.label,
            selectedAssigneeId: this.props.id,
            selectedAssigneeName: this.props.label,
            assignees: [],
            isPaneOpen: false
        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.loadAssignees();
    }
    render() {
        return (
            <div className='form-group sidebar-item'>
                <div id='assignee-view'>
                    <label className='fw-bold w-100 hover-link' onClick={() => this.setState({ isPaneOpen: true })}>
                        Assignee
                        <i className='fa fa-cog pull-right' />
                    </label>
                    <span className='cap'>{this.state.assigneeName}</span>
                </div>
                <SlidingPane
                    className='assignee-sliding-pane'
                    overlayClassName='it-overlay-class'
                    isOpen={this.state.isPaneOpen}
                    title={'#' + this.state.issueId + ' - Update Assignee'}
                    subtitle="sub title, sub title and sub title"
                    from='right'
                    width='355px'
                    onRequestClose={() => {
                        this.setState({ isPaneOpen: false });
                    }}>
                    <div>
                        <input type='text' className='form-control' placeholder='search' />
                        <ul>
                            {this.getAssigneesDom()}
                        </ul>
                        <div>
                            <button className='btn btn-success btn-big mr-10' onClick={() => this.update()}>Update</button>
                            <button className='btn btn-default btn-big' onClick={() => this.cancel()}>Cancel</button>
                        </div>
                    </div>
                </SlidingPane>
            </div>
        );
    }
    loadAssignees() {
        var self = this;
        ProjectsApi.getAssignees(this.props.projectId)
            .then(function (assignees) {
                self.setState({ assignees: assignees });
            });
    }
    getAssigneesDom() {
        var li = [];
        var self = this;
        _.each(this.state.assignees, function (assignee) {
            var assigneeDom = self.loadAssigneesItem(assignee);
            li.push(assigneeDom);
        });
        return li;
    }
    loadAssigneesItem(assignee) {
        return (
            <li className={assignee.value === this.state.selectedAssigneeId ? 'active' : ''} key={assignee.value} onClick={() => this.handleChange(assignee)}>
                <span className='value'>
                    {assignee.label}
                </span>
                <span className='selection'>
                    {
                        assignee.value === this.state.selectedAssigneeId ?
                            <i className='fa fa-check done' /> :
                            <i className='fa fa-check done done-hidden' />
                    }
                </span>
            </li>
        );
    }
    handleChange(assignee) {
        this.setState({ selectedAssigneeId: assignee.value });
        this.setState({ selectedAssigneeName: assignee.label });
    }
    cancel() {
        var currentAssigneeId = this.state.assigneeId;
        // resetting the existing assignee id
        this.setState({ selectedAssigneeId: currentAssigneeId });
        this.setState({ isPaneOpen: false });
    }
    update() {
        var self = this;
        return;
        // todo: check if update required?
        var updatedPriorityId = this.state.selectedPriorityId;
        var updatedPriorityName = this.state.selectedPriorityName;
        IssuesApi.updatePriority(this.state.issueId, updatedPriorityId)
            .then(function (response) {
                self.setState({ isPaneOpen: false });
                self.setState({ priorityId: updatedPriorityId });
                self.setState({ priorityName: updatedPriorityName });
            });
        /*this._notificationSystem.addNotification({
            title: '#' + self.state.issueId + ' Issue Updated',
            message: 'Priority has been changed to ' + label + '.',
            level: 'success',
            position: 'br',
            autoDismiss: 5
        });*/
    }
}

export default SelectAssignee;