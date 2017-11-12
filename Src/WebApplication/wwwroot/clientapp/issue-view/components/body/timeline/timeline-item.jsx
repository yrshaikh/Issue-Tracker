import React, {Component} from 'react';
import Gravatar from 'react-gravatar';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

class TimelineItem extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'content': props.content,
            'createdBy': props.createdBy,
            'createdByEmail': props.createdByEmail,
            'createdOn': props.createdOn,
            'gravatarImageSize': 16,
            'type': props.type
        };

    }

    static get propTypes () {

        return {

            'content': PropTypes.string,
            'createdBy': PropTypes.string,
            'createdByEmail': PropTypes.string,
            'createdOn': PropTypes.string,
            'type': PropTypes.string

        };

    }

    render () {

        return (
            <div className="timeline-item">
                <Gravatar email={this.state.createdByEmail} size={16}
                    default="retro" />
                <span className="ml-10">
                    <span className="fw-medium cap medium-gray">
                        {this.state.createdBy}
                    </span>
                    <span className="light-gray">
                        {this.renderMessage(this.state.type)}
                    </span>
                </span>
            </div>
        );

    }

    renderMessage (type) {

        return (
            <span className="ml-5">
                <span>updated {type} of this issue</span>
                <i className="ml-5 fa fa-long-arrow-right" />
                <span className="ml-5 fw-medium medium-gray cap mr-5">
                    {this.state.content}
                </span>
                <Moment fromNow>{this.state.createdOn}</Moment>
            </span>
        );

    }

}

export default TimelineItem;
