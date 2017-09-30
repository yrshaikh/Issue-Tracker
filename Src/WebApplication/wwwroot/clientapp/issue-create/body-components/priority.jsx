import React, { Component } from 'react';
import { ProjectsApi } from './../../apis/projects-api';
import _ from 'lodash';

class Priority extends Component {
	constructor(props) {
		super(props);
		this.state = {
            priorityId: this.props.priorityId,
            priorities: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.loadPriorities()
	}
    
	render() {
		return (
            <div className='form-group'>
                <label>Priority</label>
                { this.renderPriorities() }
            </div>
		);
	}

	renderPriorities(){
		var priorities = [];
		_.forEach(this.state.priorities, function(p){
			priorities.push(
                <option key={p.id} value={p.id}>{p.value}</option>
            );
		})
		return (
			<select onChange={this.handleChange} className='form-control' value={this.state.priorityId}>
				{priorities}
			</select>
		);		
	}
	
	handleChange(event){
		var priorityId = event.target.value;
		this.setState({priorityId: priorityId});
		this.props.action('priorityId', priorityId);
	}

	loadPriorities(){
		var self = this;
		ProjectsApi.getPriorities()
			.then(function(priorities){
				self.setState({priorities: priorities});
			});
    }
}

export default Priority;