import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: props.issueId,
            comment: '',
            authorEmail: 'hahah.lololol@outlook.com' // todo get this from serverside on pageload.
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }
    render() {
        return (
            <div id='add-comment-box'>
                <div className='comment-box'>
                    <div className='avatar'>
                        <Gravatar email={this.state.authorEmail} size={35} default='retro' />
                    </div>
                    <div className='comment form-group'>
                        <textarea
                            className='form-control text-area text-area-short'
                            name='description'
                            rows='5'
                            placeholder='Leave a comment.'
                            value={this.state.comment}
                            onChange={this.handleChange}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='button-box'>
                    <button type='button' className='btn btn-success' onClick={this.submitComment}>Comment</button>
                </div>
            </div>
        )
    }
    handleChange(event) {
        this.setState({ comment: event.target.value });
    }
    submitComment() {
        console.log(this.state.comment, this.state.issueId);
    }
}

export default Comment; 