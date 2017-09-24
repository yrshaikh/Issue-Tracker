import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Gravatar from 'react-gravatar';
const NotificationSystem = require('react-notification-system');
const axios = require('axios');

class TitleDescription extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: props.issueId,
			title: props.title,
			description: props.description,
			createdBy: props.createdBy,
            editIssue: false,
            submitting: false,
            error: false
        };
		this._notificationSystem = null;
		
		this.cancelTitleDescriptionEdit = this.cancelTitleDescriptionEdit.bind(this);
        this.updateTitleDescription = this.updateTitleDescription.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }    
	componentWillMount(){
		PubSub.subscribe('ISSUE_EDIT', this.handleIssueEdit.bind(this));
	}
	componentDidMount(){
		this._notificationSystem = this.refs.notificationSystem;
    }
    handleIssueEdit(){
		this.setState({editIssue: true});
	}
	cancelTitleDescriptionEdit(){
		this.setState({editIssue: false});
	}
	updateTitleDescription(){
        var self = this;
        this.setState({editIssue: false});
		axios.post('/issue/updatetitledescription', {
			issueId: this.state.issueId
			, title : this.state.title
			, description: this.state.description
		})
		.then(function (response) {
			// do nothing.
			self._notificationSystem.addNotification({
				title: '#' + self.state.issueId + ' Issue Updated',
				message: 'You updated title and description of this issue.',
				level: 'success',
				position: 'br',
				autoDismiss: 5
			});	
		})
		.catch(function (error) {
			self.setState({ submitting : false });
            self.setState({ error : true });
            self.setState({editIssue: true});
		});
		this.setState({editIssue: false});
	}
	handleChange(event){
        var name = event.target.name;
		this.setState({[name]: event.target.value});
	}
	render() {
        var titleAndDescription = this.state.editIssue ? 
        this.renderTitleAndDescriptionInEditMode() :
        this.renderTitleAndDescription();
        var renderError = this.renderError();
		return (
            <div>
                {titleAndDescription}
            <div>
            </div>
                {renderError}
				<NotificationSystem ref="notificationSystem" />
            </div>
		);
    }
    
    renderTitleAndDescription() {
		return (
			<div>
				<div className='form-group'>
					<span className='issue-header fw-bold'>{this.state.title}</span>					
				</div>
				<div className='form-group comment-box'>
					<div className='avatar'>
						<Gravatar email={this.state.createdBy} size={35} default='retro' />
					</div>
					<div className='comment'>
						<div className='comment-head'>
							<b>Yasser Shaikh</b> opened this issue on Aug 14
						</div>
						<div className='comment-body'>
							{this.state.description}
						</div>
					</div>
				</div>
			</div>
		);	
	}
	renderTitleAndDescriptionInEditMode() {
		return (
			<div>
				<div className='form-group'>						
					<input type='text' autoFocus
						name='title'
						className='form-control text-box title fw-bold' 
						placeholder='Enter a one-line summary of the issue.'
						value={this.state.title}
						onChange={this.handleChange}>
					</input>
				</div>
				<div className='form-group'>
					<textarea 
						className='form-control text-area'
						name='description'
						rows='5'
						placeholder='Steps to reproduce, what you expected to see, and what you saw it instead.'
						value={this.state.description}
						onChange={this.handleChange}
					>
					</textarea>
				</div>
				<div className='form-group ta-right'>
					<button type='button' className='btn btn-default mr-10' onClick={this.cancelTitleDescriptionEdit}>Cancel</button>
					<button type='button' id='create' className='btn btn-success' onClick={this.updateTitleDescription}>Update Issue</button>					
				</div>
			</div>
		);		
    }
    
    renderError() {
		if(this.state.error){
			return (
				<div className='mt-10'>
					<div className='alert alert-danger' role='alert'>
						Whoops! Something went wrong. Please try again.
					</div>
				</div>
			);
        }
        return '';
	}
}

export default TitleDescription;