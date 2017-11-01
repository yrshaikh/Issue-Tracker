import React, {Component} from 'react';
import {IssuesApi} from './../../apis/issues-api';
import Lodash from 'lodash';
import {ProjectsApi} from './../../apis/projects-api';
import PropTypes from 'prop-types';
import SlidingPane from 'react-sliding-pane';

class SelectPriority extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'isPaneOpen': false,
            'issueId': this.props.issueId,
            'priorities': [],
            'priorityId': this.props.id,
            'priorityName': this.props.label,
            'selectedPriorityId': this.props.id,
            'selectedPriorityName': this.props.label
        };

        this.handleChange = this.handleChange.bind(this);

    }

    static get propTypes () {

        return {
            'id': PropTypes.number,
            'issueId': PropTypes.number,
            'label': PropTypes.string
        };

    }

    componentDidMount () {

        this.loadPriorities();

    }

    render () {

        let title = 'Set Priority';
        if (this.state.issueId) {

            title = `#${this.state.issueId} - Update Priority`;

        }

        return (
            <div className="form-group sidebar-item">
                <div id="assignee-view">
                    <label className="fw-bold w-100 hover-link"
                        onClick={() => this.setState({'isPaneOpen': true})}>
                        Priority
                        <i className="fa fa-cog pull-right" />
                    </label>
                    <span className="cap fs-16">{this.state.priorityName}</span>
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

    loadPriorities () {

        const that = this;
        ProjectsApi.getPriorities().
            then((priorities) => {

                that.setState({priorities});

            });

    }

    getPrioritiesDom () {

        const li = [];
        Lodash.each(this.state.priorities, (priority) => {

            const priorityDom = self.loadPrioritiesItem(priority);
            li.push(priorityDom);

        });
        return li;

    }

    loadPrioritiesItem (priority) {

        let liClassName = '',
            liFaCheckClassName = 'fa fa-check done ';
        if (priority.value === this.state.selectedAssigneeId) {

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

    handleChange (priority) {

        this.setState({'selectedPriorityId': priority.value});
        this.setState({'selectedPriorityName': priority.label});

    }

    cancel () {

        const currentPriorityId = this.state.priorityId;
        // Resetting the existing priority id
        this.setState({'selectedPriorityId': currentPriorityId});
        this.setState({'isPaneOpen': false});

    }

    update () {

        const updatedPriorityId = this.state.selectedPriorityId,
            updatedPriorityName = this.state.selectedPriorityName;

        const that = this;

        if (!this.state.issueId) {

            self.setState({'priorityId': updatedPriorityId});
            self.setState({'priorityName': updatedPriorityName});
            self.setState({'isPaneOpen': false});
            this.props.updateHandler(updatedPriorityId, updatedPriorityName);
            return;

        }

        IssuesApi.updatePriority(this.state.issueId, updatedPriorityId).
            then((response) => {

                self.setState({"isPaneOpen": false});
                self.setState({"priorityId": updatedPriorityId});
                self.setState({"priorityName": updatedPriorityName});


                self._notificationSystem.addNotification({
                    "title": `#${  self.state.issueId  } Issue Updated`,
                    "message": `You updated priority of this issue to ${  updatedPriorityName  }.`,
                    "level": 'success',
                    "position": 'br',
                    "autoDismiss": 3
                });
            
});

    }

}

export default SelectPriority;
