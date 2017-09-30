import React, { Component } from 'react';

class ErrorMessage extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
		if(this.props.error){
			return (
				<div className='col-md-9 mt-10'>
					<div className='alert alert-danger' role='alert'>
						Whoops! Something went wrong. Please try again.
					</div>
				</div>
			);
		}
		return (
            <span>
            </span>
		);
	}
}

export default ErrorMessage;