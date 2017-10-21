import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import _ from 'lodash';
import { ProjectsApi } from './../../apis/projects-api';
import { IssuesApi } from './../../apis/issues-api';
const NotificationSystem = require('react-notification-system');

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
        this._notificationSystem = null;
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
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
                    <span className='cap fs-16'>{this.state.assigneeName}</span>
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
                <NotificationSystem ref="notificationSystem" />
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

        // todo: check if update required?
        var updateAssigneeId = this.state.selectedAssigneeId;
        var updateAssigneeName = this.state.selectedAssigneeName;

        var self = this;

        if (!this.state.issueId) {
            self.setState({ assigneeId: updateAssigneeId });
            self.setState({ assigneeName: updateAssigneeName });
            self.setState({ isPaneOpen: false });
            return;
        }

        IssuesApi.updateAssignee(this.state.issueId, updateAssigneeId)
            .then(function (response) {
                self.setState({ isPaneOpen: false });
                self.setState({ assigneeId: updateAssigneeId });
                self.setState({ assigneeName: updateAssigneeName });

                self._notificationSystem.addNotification({
                    title: '#' + self.state.issueId + ' Issue Updated',
                    message: 'You updated assignee of this issue to ' + updateAssigneeName + '.',
                    level: 'success',
                    position: 'br',
                    autoDismiss: 3
                });
            });
    }
}

export default SelectAssignee;