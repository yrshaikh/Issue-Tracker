import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Gravatar from 'react-gravatar';
const axios = require('axios');

class GravatarWithUserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createdBy: props.createdBy,
			createdOn: props.createdOn,
			size: props.size
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		return (
			<div className='gravy'>
				<div className='fs-14 title-case fw-bold'>Opened By:</div>		
				<div>
					<div className='image'>
						<Gravatar email={this.state.createdBy} size={this.state.size} default="retro" />
					</div>
					<div className='summary'>						
						<span className='fs-14 title-case fw-light'>{this.state.createdBy}</span>
						<span className='fs-14 fw-light'>{this.state.createdOn}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default GravatarWithUserInfo;