﻿import React, {Component} from 'react';
import Gravatar from 'react-gravatar';
import {IssuesApi} from './../../../apis/issues-api';
import PropTypes from 'prop-types';

class AddComment extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'authorEmail': 'hahah.lololol@outlook.com',
            'comment': '',
            'error': false,
            'issueId': props.issueId,
            'submitting': false
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitComment = this.submitComment.bind(this);

    }

    static get propTypes () {

        return {'issueId': PropTypes.number};

    }

    render () {

        return (
            <div id="add-comment-box">
                <div className="comment-box">
                    <div className="avatar">
                        <Gravatar email={this.state.authorEmail} size={35}
                            default="retro" />
                    </div>
                    <div className="comment form-group">
                        <textarea
                            className="form-control text-area text-area-short"
                            name="description"
                            rows="5"
                            placeholder="Leave a comment."
                            value={this.state.comment}
                            onChange={this.handleChange}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="button-box">
                    {!this.state.submitting
                        ? <button type="button" className="btn btn-success" onClick={this.submitComment}>Comment</button>
                        : <button type="button" id="create" className="btn" disabled="disabled">Submitting</button>}
                </div>
            </div>
        );

    }

    handleChange (event) {

        this.setState({'comment': event.target.value});

    }

    submitComment () {

        this.setState({'error': false});
        this.setState({'submitting': true});

        const self = this;
        IssuesApi.submitComment(this.state.issueId, this.state.comment).
            then((response) => {

                self.setState({"comment": ''});
                self.setState({"submitting": false});
                if (response.error) {self.setState({ error: true });}
            
});

    }

}

export default AddComment;
