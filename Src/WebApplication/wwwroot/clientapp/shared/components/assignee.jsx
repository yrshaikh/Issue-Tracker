import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { ProjectsApi } from './../../apis/projects-api';
const Select = require('react-select/dist/react-select.js');

class Assignee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectId: this.props.projectId,
            assigneeId: this.props.defaultValue ? this.props.defaultValue : null,
            assignees: []
		};

		this.handleChange = this.handleChange.bind(this);
	}
	
	componentWillMount(){
		PubSub.subscribe('PROJECT_CHANGED', this.handleProjectChange.bind(this));
	}

	componentDidMount(){
		this.loadAssignees()
	}
    
	render() {
		return (
            <div className='form-group'>
                <label className='fw-bold'>
					{
						this.props.label ? this.props.label : 'Assignee'
					}
				</label>
                { this.renderAssignees() }
            </div>
		);
	}

	renderAssignees(){
		return (
			<Select className='assignees-select'
                        value={this.state.assigneeId}
                        options={this.state.assignees}
                        onChange={this.handleChange}
                        clearable={false}
                        searchable={false} />
		);
	}
	
	handleChange(selection){
		this.setState({assigneeId: selection.value});
		this.props.action('assigneeId', selection.value, selection.label);
	}

	handleProjectChange(event, projectId){
		this.setState({projectId: projectId});
		this.state.assigneeId = undefined;
		this.props.action('assigneeId', undefined);
		this.loadAssignees();
	}

	loadAssignees(){
		var self = this;
		ProjectsApi.getAssignees(this.state.projectId)
			.then(function(assignees){
				self.setState({assignees: assignees});
			});
    }
}

export default Assignee;