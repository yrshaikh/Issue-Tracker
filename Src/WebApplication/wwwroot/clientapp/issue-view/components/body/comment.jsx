import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorEmail: 'koghjy.uutr6s@outlook.com'
        };
    }
    render() {
        return (
            <div id='add-comment-box' className='form-group comment-box'>
                <div className='avatar'>
                    <Gravatar email={this.state.authorEmail} size={35} default='retro' />
                </div>
                <div className='comment form-group'>
                    <textarea
                        className='form-control text-area text-area-short'
                        name='description'
                        rows='5'
                        placeholder='Leave a comment.'
                        value={this.state.description}
                        onChange={this.handleChange}
                    >
                    </textarea>
                </div>
                <div>
                    <button className='btn btn-success'>Comment</button>
                </div>
            </div>
        )
    }
}

export default Comment; 