import React, { Component } from 'react';
import { ProjectsApi } from './../../apis/projects-api';
import _ from 'lodash';

class Assignee extends Component {
	constructor(props) {
		super(props);
		this.state = {
            priorityId: this.props.priorityId,
            priorities: []
		};
	}

	componentDidMount(){
		this.loadPriorities()
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
		var priorities = [];
		_.forEach(this.state.priorities, function(p){
			priorities.push(
                <option key={p.id} value={p.id}>{p.value}</option>
            )
		})
		return (
			<select onChange={this.props.action} className='form-control' value={this.state.priorityId}>
				{priorities}
			</select>
		);		
    }

	loadPriorities(){
		var self = this;
		ProjectsApi.getPriorities()
			.then(function(priorities){
				console.log('prior', priorities);
				self.setState({priorities: priorities});
			});
    }
}

export default Assignee;