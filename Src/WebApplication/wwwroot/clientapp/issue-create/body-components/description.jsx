import React, { Component } from 'react';

class Description extends Component {

	constructor(props) {
		super(props);
		this.state = {
			description: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState({description: value});
		this.props.change('description', value);
	}
	
	render() {
		return (
			<div className='col-md-9'>
				<div className='form-group'>
					<label>Description</label>
					<textarea 
						className='form-control text-area'
						name='description'
						rows='5'
						placeholder='Steps to reproduce, what you expected to see, and what you saw it instead.'
						value={this.state.description }
						onChange={this.handleChange}>
					>
					</textarea>
				</div>
			</div>
		)
	}
}

export default Description;