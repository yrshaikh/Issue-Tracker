import React, { Component } from 'react';
import Lodash from 'lodash';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import SlidingPane from 'react-sliding-pane';

import { IssuesApi } from './../../apis/issues-api.jsx';
import { ProjectsApi } from './../../apis/projects-api.jsx';

class SelectPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            issueId: this.props.issueId,
            priorities: [],
            priorityId: this.props.id,
            priorityName: this.props.label,
            selectedPriorityId: this.props.id,
            selectedPriorityName: this.props.label,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    static get propTypes() {
        return {
            id: PropTypes.number,
            issueId: PropTypes.number,
            label: PropTypes.string,
        };
    }

    componentDidMount() {
        this.loadPriorities();
    }

    render() {
        let title = 'Set Priority';
        if (this.state.issueId) {
            title = `#${this.state.issueId} - Update Priority`;
        }

        return (
            <div className="form-group sidebar-item">
                <div id="assignee-view">
                    <label className="fw-bold w-100 hover-link"
                        onClick={() => this.setState({ isPaneOpen: true })}>
                        Priority
                        <i className="fa fa-cog pull-right" />
                    </label>
                    <span className="cap fs-14">
                        {this.state.priorityName}
                    </span>
                </div>
                <SlidingPane
                    className="assignee-sliding-pane"
                    overlayClassName="it-overlay-class"
                    isOpen={this.state.isPaneOpen}
                    title={title}
                    subtitle="sub title, sub title and sub title"
                    from="right"
                    width="355px"
                    onRequestClose={() => {
                        this.setState({ isPaneOpen: false });
                    }}>
                    <div>
                        <ul>
                            {this.getPrioritiesDom()}
                        </ul>
                        <div>
                            <button className="btn btn-success btn-big mr-10"
                                onClick={() => this.update()}>Update</button>
                            <button className="btn btn-default btn-big"
                                onClick={() => this.cancel()}>Cancel</button>
                        </div>
                    </div>
                </SlidingPane>
            </div>
        );
    }

    loadPriorities() {
        const that = this;
        ProjectsApi.getPriorities()
            .then((priorities) => {
                that.setState({ priorities });
            });
    }

    getPrioritiesDom() {
        const li = [];
        const that = this;
        Lodash.each(this.state.priorities, (priority) => {
            const priorityDom = that.loadPrioritiesItem(priority);
            li.push(priorityDom);
        });
        return li;
    }

    loadPrioritiesItem(priority) {
        let liClassName = '';
        let liFaCheckClassName = 'fa fa-check done ';
        if (priority.value === this.state.selectedPriorityId) {
            liClassName = 'active';
        } else {
            liFaCheckClassName += 'done-hidden';
        }

        return (

            <li className={liClassName} key={priority.value}
                onClick={() => this.handleChange(priority)}>
                <span className="value">
                    {priority.label}
                </span>
                <span className="selection">
                    <i className={liFaCheckClassName} />
                </span>
            </li>

        );
    }

    handleChange(priority) {
        this.setState({ selectedPriorityId: priority.value });
        this.setState({ selectedPriorityName: priority.label });
    }

    cancel() {
        const currentPriorityId = this.state.priorityId;
        // Resetting the existing priority id
        this.setState({ selectedPriorityId: currentPriorityId });
        this.setState({ isPaneOpen: false });
    }

    update() {
        const that = this;
        const updatedPriorityId = this.state.selectedPriorityId;
        const updatedPriorityName = this.state.selectedPriorityName;

        if (!this.state.issueId) {
            that.setState({ priorityId: updatedPriorityId });
            that.setState({ priorityName: updatedPriorityName });
            that.setState({ isPaneOpen: false });
            that.props.updateHandler(updatedPriorityId, updatedPriorityName);
            return;
        }

        IssuesApi.updatePriority(this.state.issueId, updatedPriorityId)
            .then(() => {
                that.setState({ isPaneOpen: false });
                that.setState({ priorityId: updatedPriorityId });
                that.setState({ priorityName: updatedPriorityName });
            })
            .then(() => {
                PubSub.publish('NOTIFY', 'You updated priority of this issue.');
            });
    }
}

export default SelectPriority;
