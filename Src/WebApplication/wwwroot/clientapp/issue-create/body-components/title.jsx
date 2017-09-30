import React, { Component } from 'react';

class Title extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState({title: value});
		this.props.change('title', value);
	}
	
	render() {
		return (
			<div className='col-md-12'>
				<div className='form-group'>						
					<label>Subject</label>
					<input type='text' autoFocus
						name='title'
						className='form-control text-box title fw-bold' 
						placeholder='Enter a one-line summary of the issue.'						
						value={this.state.title }
						onChange={this.handleChange} >
					</input>
					{ !this.state.title ? 
						<span className='form-text text-danger'>Title should atleast be of 10 characters</span>
						: '' }
				</div>
			</div>
		)
	}
}

export default Title;