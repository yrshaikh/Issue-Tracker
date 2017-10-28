import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';
import CommentView from './../comment-view';

class TimelineComment extends Component {
	constructor(props) {
		console.log('yo');
		super(props);
		this.state = {
			createdByEmail: props.data.createdByEmail,
			createdOn: props.data.createdOn,
			createdBy: props.data.createdBy,
			content: props.data.content
		};
	}
	componentWillMount() {
	}
	componentDidMount() {
	}
	render() {
		return (
			<CommentView
				description={this.state.content}
				createdByEmail={this.state.createdByEmail}
				createdBy={this.state.createdBy}
				createdOn={this.state.createdOn}
			/>
		);
	}
}

export default TimelineComment;