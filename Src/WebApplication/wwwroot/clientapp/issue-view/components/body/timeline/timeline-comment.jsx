import React, {Component} from 'react';
import CommentView from './../shared/comment-view';
import PropTypes from 'prop-types';

class TimelineComment extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'content': props.content,
            'createdBy': props.createdBy,
            'createdByEmail': props.createdByEmail,
            'createdOn': props.createdOn
        };

    }

    static get propTypes () {

        return {

            'content': PropTypes.string,
            'createdBy': PropTypes.string,
            'createdByEmail': PropTypes.string,
            'createdOn': PropTypes.string

        };

    }

    render () {

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
