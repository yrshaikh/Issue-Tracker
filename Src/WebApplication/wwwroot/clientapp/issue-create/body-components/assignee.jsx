import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { ProjectsApi } from './../../apis/projects-api';
import _ from 'lodash';

class Assignee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectId: this.props.projectId,
            assigneeId: undefined,
            assignees: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
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
                <label>Assignee</label>
                { this.renderPriorities() }
            </div>
		);
	}

	renderPriorities(){
		if(this.state.assignees.length === 0)
			return(
				<span></span>
			);

		var assignees = [];
		assignees.push(
			<option key={0} value={undefined}></option>
		);
		_.forEach(this.state.assignees, function(p){
			assignees.push(
                <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
            )
		});
		return (
			<select defaultValue={undefined} onChange={this.handleOnChange} className='form-control' value={this.state.assigneeId}>
				{assignees}
			</select>
		);
	}
	
	handleOnChange(event){
		var selectedAssigneedId = event.target.value;
		this.setState({selectedAssigneedId});
		this.props.action('assigneeId', selectedAssigneedId);
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