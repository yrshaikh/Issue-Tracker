import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';
const axios = require('axios');

class GravatarWithUserInfo extends Component {
	constructor(props) {
		super(props);
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
						<Gravatar email={this.props.createdByEmail} size={this.props.size} default="retro" />
					</div>
					<div className='summary'>						
						<span className='fs-14 title-case fw-light'>{this.props.createdBy}</span>
						<span className='fs-14 fw-light'><Moment fromNow>{this.props.createdOn}</Moment></span>
					</div>
				</div>
			</div>
		);
	}
}

export default GravatarWithUserInfo;