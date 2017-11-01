import React, {Component} from 'react';
import {IssuesApi} from './../../apis/issues-api';
import Lodash from 'lodash';
import {ProjectsApi} from './../../apis/projects-api';
import PropTypes from 'prop-types';
import SlidingPane from 'react-sliding-pane';

class SelectAssignee extends Component {

    constructor (props) {

        super(props);

        let assigneeName = 'Unassigned';
        if (this.props.label) {

            assigneeName = this.props.label;

        }

        this.state = {
            'assigneeId': this.props.id,
            assigneeName,
            'assignees': [],
            'isPaneOpen': false,
            'issueId': this.props.issueId,
            'selectedAssigneeId': this.props.id,
            'selectedAssigneeName': this.props.label
        };
        this.handleChange = this.handleChange.bind(this);

    }

    static get propTypes () {

        return {
            'id': PropTypes.number,
            'issueId': PropTypes.number,
            'label': PropTypes.string,
            'projectId': PropTypes.number
        };

    }

    componentDidMount () {

        this.loadAssignees();

    }

    render () {

        let title = 'Set Assignee';
        if (this.state.issueId) {

            title = `#${this.state.issueId} - Update Assignee`;

        }

        return (
            <div className="form-group sidebar-item">
                <div id="assignee-view">
                    <label className="fw-bold w-100 hover-link"
                        onClick={() => this.setState({'isPaneOpen': true})}>
                        Assignee
                        <i className="fa fa-cog pull-right" />
                    </label>
                    <span>
                        <span className="cap fs-16">
                            {this.state.assigneeName}
                        </span>
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

                        this.setState({'isPaneOpen': false});

                    }}>
                    <div>
                        <ul>
                            {this.getAssigneesDom()}
                        </ul>
                        <div>
                            <button className="btn btn-success btn-big mr-10"
                                onClick={() => this.update()}>
                            Update
                            </button>
                            <button className="btn btn-default btn-big"
                                onClick={() => this.cancel()}>Cancel</button>
                        </div>
                    </div>
                </SlidingPane>
            </div>
        );

    }

    loadAssignees () {

        const that = this;
        ProjectsApi.getAssignees(this.props.projectId).
            then((assignees) => {

                const unassigned = {
                    'email': 'unassigned@email.com',
                    'label': 'Unassigned',
                    'value': null
                };
                assignees.unshift(unassigned);
                that.setState({assignees});

            });

    }

    getAssigneesDom () {

        const li = [],
            that = this;
        Lodash.each(this.state.assignees, (assignee) => {

            const assigneeDom = that.loadAssigneesItem(assignee);
            li.push(assigneeDom);

        });
        return li;

    }

    loadAssigneesItem (assignee) {

        let liClassName = '',
            liFaCheckClassName = 'fa fa-check done ';
        if (assignee.value === this.state.selectedAssigneeId) {

            liClassName = 'active';

        } else {

            liFaCheckClassName += 'done-hidden';

        }

        return (

            <li className={liClassName} key={assignee.value}
                onClick={() => this.handleChange(assignee)}>
                <span className="value">
                    {assignee.label}
                </span>
                <span className="selection">
                    <i className={liFaCheckClassName} />
                </span>
            </li>
        );

    }

    handleChange (assignee) {

        this.setState({'selectedAssigneeId': assignee.value});
        this.setState({'selectedAssigneeName': assignee.label});

    }

    cancel () {

        const currentAssigneeId = this.state.assigneeId;
        // Resetting the existing assignee id
        this.setState({'selectedAssigneeId': currentAssigneeId});
        this.setState({'isPaneOpen': false});

    }

    update () {

        const that = this,
            updateAssigneeId = this.state.selectedAssigneeId,
            updateAssigneeName = this.state.selectedAssigneeName;

        if (!this.state.issueId) {

            that.setState({'assigneeId': updateAssigneeId});
            that.setState({'assigneeName': updateAssigneeName});
            that.setState({'isPaneOpen': false});
            that.props.updateHandler(updateAssigneeId, updateAssigneeName);
            return;

        }

        IssuesApi.updateAssignee(this.state.issueId, updateAssigneeId).
            then(() => {

                that.setState({'isPaneOpen': false});
                that.setState({'assigneeId': updateAssigneeId});
                that.setState({'assigneeName': updateAssigneeName});

            });

    }

}

export default SelectAssignee;
