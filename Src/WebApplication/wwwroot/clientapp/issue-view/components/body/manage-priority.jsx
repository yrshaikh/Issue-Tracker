import React, { Component } from 'react';
import Priority from './../../../shared/components/priority';

class ManagePriority extends Component {
	constructor(props) {
		super(props);
		this.state = {
			priorityId: this.props.id,
			priorityName: this.props.label
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.mouseLeaves();
	}
    
	render() {
		return (
            <div className='form-group sidebar-item' onMouseEnter={this.mouseOver} onMouseLeave={this.mouseLeaves}>
                <div id='priority-view'>
					<label className='fw-bold'>Priority</label>
					<div className='cap'>
					{
						this.state.priorityName ? 
						<div className='cap'>{ this.state.priorityName }</div> :
						<div className='gray'>Un-Assigned</div>
					}
					</div>
				</div>
				<div id='priority-edit'>
					{ this.renderPriorityComponent() }
				</div>
            </div>
		);
	}

	renderPriorityComponent(){
		return (
			<Priority
				label='Update Priority'
				priorityId={this.state.priorityId}
				action={this.handleChange} />
		);
	}

	mouseOver(event) {
        document.getElementById('priority-view').setAttribute('style', 'display:none;');
        document.getElementById('priority-edit').setAttribute('style', 'display:block;');
    }
    mouseLeaves(event) {
        document.getElementById('priority-view').setAttribute('style', 'display:block;');
        document.getElementById('priority-edit').setAttribute('style', 'display:none;');
    }

	handleChange(name, value, label){
		this.setState({priorityId: value});
		this.setState({priorityName: label});
		this.mouseLeaves();
	}
}

export default ManagePriority;