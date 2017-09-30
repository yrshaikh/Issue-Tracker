import React, { Component } from 'react';
import { ProjectsApi } from './../../apis/projects-api';
import _ from 'lodash';
const Select = require('react-select/dist/react-select.js');

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
		return (
			<Select className='priority-select'
                        value={this.state.priorityId}
                        options={this.state.priorities}
                        onChange={this.handleChange}
                        clearable={false}
                        searchable={false} />
		);
	}
	
	handleChange(selection){
		var priorityId = selection.value;
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