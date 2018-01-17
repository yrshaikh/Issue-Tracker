import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class People extends Component {
    static get propTypes() {
        return {
            createdOn: PropTypes.string,
            closedOn: PropTypes.string,
        };
    }

    render() {
        let closedOnSection = '';
        if (this.props.closedOn) {
            closedOnSection = (
                <div>
                    <span className="lighter-gray">Closed: </span>
                    <span>
                        <Moment fromNow>{this.props.closedOn}</Moment>
                    </span>
                </div>
            );
        }
        return (
            <div className="dates sidebar-item">
                <label className="fw-bold w-100">Dates</label>
                <div>
                    <span className="lighter-gray">Created: </span>
                    <span>
                        <Moment fromNow>{this.props.createdOn}</Moment>
                    </span>
                </div>
                { closedOnSection }
            </div>
        );
    }
}

export default People;
