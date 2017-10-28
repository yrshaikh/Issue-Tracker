import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';

var Remarkable = require('remarkable');
var md = new Remarkable('full', {
	html: true,
	linkify: true,
	typographer: true
});

class CommentView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title,
			description: props.description,
			createdBy: props.createdBy,
			createdByEmail: props.createdByEmail
		};
	}
	render() {
		return (
			<div className='form-group comment-box'>
				<div className='avatar'>
					<Gravatar email={this.state.createdByEmail} size={35} default='retro' />
				</div>
				<div className='comment'>
					<div className='comment-head'>
						<b className='cap'>{this.state.createdBy}</b> opened this issue <Moment fromNow>{this.state.createdOn}</Moment>
					</div>
					<div className='comment-body'>
						{
							(this.state.description) ?
								<div dangerouslySetInnerHTML={{ __html: md.render(this.state.description) }} />
								: <div className='light-gray'>No description provided.</div>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default CommentView;