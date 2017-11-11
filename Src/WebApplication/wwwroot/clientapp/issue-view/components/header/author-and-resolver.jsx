import React, {Component} from 'react';
import GravatarWithUserInfo from './../../../shared/gravatar-with-user-info';
import PropTypes from 'prop-types';

class AuthorAndResolver extends Component {

    static get propTypes () {

        return {

            'closedBy': PropTypes.string,
            'closedByEmail': PropTypes.string,
            'closedOn': PropTypes.string,
            'createdBy': PropTypes.string,
            'createdByEmail': PropTypes.string,
            'createdOn': PropTypes.string,
            'status': PropTypes.string

        };

    }

    constructor (props) {

        super(props);
        this.state = {
            'closedBy': this.props.closedBy,
            'closedByEmail': this.props.closedByEmail,
            'closedOn': this.props.closedOn,
            'createdBy': this.props.createdBy,
            'createdByEmail': this.props.createdByEmail,
            'createdOn': this.props.createdOn,
            'status': this.props.status
        };

    }

    render () {

        return (
            <span>
                {this.renderCreatedByAndClosedBy()}
            </span>
        );

    }

    renderCreatedByAndClosedBy () {

        const closedByLabel = 'Closed by',
            openedByLabel = 'Opened by',
            output = [];

        output.push(<GravatarWithUserInfo
            label={openedByLabel}
            createdBy={this.state.issue.createdBy}
            createdByEmail={this.state.issue.createdByEmail}
            createdOn={this.state.issue.createdOn}
            size={35}
            key={1} />);

        if (this.state.issue.closedBy && this.state.issue.status === 'closed') {

            output.push(<GravatarWithUserInfo
                label={closedByLabel}
                createdBy={this.state.issue.closedBy}
                createdByEmail={this.state.issue.closedByEmail}
                createdOn={this.state.issue.closedOn}
                size={35}
                key={2} />);

        }

        return (
            output
        );

    }

}

export default AuthorAndResolver;
