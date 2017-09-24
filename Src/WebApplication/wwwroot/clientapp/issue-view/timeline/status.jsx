import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Gravatar from 'react-gravatar';

class Status extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gravatarImageSize : 16,
			issueId: props.IssueId
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	render() {
		return (
			<div>
				<Gravatar email='Yasser Shaikh' size={this.state.gravatarImageSize} default='retro' />
				Yasser Shaikh reopened this issue.
			</div>
		);
	}
}

export default Status;