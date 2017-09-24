import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';

class Status extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gravatarImageSize : 16,
			createdBy: props.data.createdBy,
			createdByEmail: props.data.createdByEmail,
			createdOn: props.data.createdOn,
			createdBy: props.data.createdBy,
			content: props.data.content
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		const dateToFormat = '1976-04-19T12:59-0500';
		return (
			<div className='timeline-item'>
				<Gravatar email={this.state.createdByEmail} size={16} default='retro' />
				<span className='ml-10'>
					<span className='fw-medium cap'>{this.state.createdBy}</span>
					<span className='light-gray'>
						&nbsp;{this.state.content} this <Moment fromNow>{this.state.createdOn}</Moment>
					</span>
				</span>
			</div>
		);
	}
}

export default Status;