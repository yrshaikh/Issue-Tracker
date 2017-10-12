﻿import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import _ from 'lodash';
import { ProjectsApi } from './../../../apis/projects-api';
class SelectPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.issueId,
            priorityId: this.props.id,
            priorityName: this.props.label,
            priorities: [],
            isPaneOpen: false
        };
    }
    componentDidMount() {
        this.loadPriorities();
    }
    render() {
        return (
            <div className='form-group sidebar-item'>
                <div id='assignee-view'>
                    <label className='fw-bold w-100 hover-link' onClick={() => this.setState({ isPaneOpen: true })}>
                        Assignee
                        <i className='fa fa-cog pull-right' />
                    </label>
                    {this.state.priorityName}
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
                    </div>
                </SlidingPane>
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
            <li key={priority.id}>
                <span>
                    {priority.label}
                </span>
            </li>
        );
    }
}

export default SelectPriority;