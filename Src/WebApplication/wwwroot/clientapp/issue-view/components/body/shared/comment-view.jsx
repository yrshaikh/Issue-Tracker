/* global require */
import React, {Component} from 'react';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Remarkable = require('remarkable'),
    md = new Remarkable('full', {
        'html': true,
        'linkify': true,
        'typographer': true
    });

class CommentView extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'createdBy': props.createdBy,
            'createdByEmail': props.createdByEmail,
            'createdOn': props.createdOn,
            'description': props.description,
            'title': props.title
        };

    }

    static get propTypes () {

        return {

            'createdBy': PropTypes.string,
            'createdByEmail': PropTypes.string,
            'createdOn': PropTypes.string,
            'description': PropTypes.string,
            'title': PropTypes.string,
            'type': PropTypes.string

        };

    }

    render () {

        let message = 'commented on';
        if (this.props.type === 'description') {

            message = 'opened';

        }
        return (
            <div className="form-group comment-box">
                <div className="avatar">
                    <Gravatar email={this.state.createdByEmail} size={35}
                        default="retro" />
                </div>
                <div className="comment ml-5">
                    <div className="comment-head">
                        <b className="cap">
                            {this.state.createdBy}
                        </b>
                        <span className="ml-5 mr-5">
                            {message} this issue
                        </span>
                        <Moment fromNow>{this.state.createdOn}</Moment>
                    </div>
                    <div className="comment-body">
                        {this.renderDescription()}
                    </div>
                </div>
            </div>
        );

    }

    renderDescription () {

        if (this.state.description) {

            const desc = md.render(this.state.description);
            return (
                <div
                    dangerouslySetInnerHTML={{'__html': desc}}
                />
            );

        }

        return (
            <div className="light-gray">No description provided.</div>
        );

    }

}

export default CommentView;
