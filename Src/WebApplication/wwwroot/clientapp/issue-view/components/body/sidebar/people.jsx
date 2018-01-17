import React, { Component } from 'react';
import PropTypes from 'prop-types';

class People extends Component {
    static get propTypes() {
        return {
            createdBy: PropTypes.string,
            createdByEmail: PropTypes.string,
            closedBy: PropTypes.string,
            closedByEmail: PropTypes.string,
        };
    }

    render() {
        let closedBySection = '';
        if (this.props.closedBy) {
            closedBySection = (
                <div>
                    <span className="lighter-gray">Closed By: </span>
                    <span title={this.props.closedByEmail}>
                        {this.props.closedBy}
                    </span>
                </div>
            );
        }
        return (
            <div className="people sidebar-item">
                <label className="fw-bold w-100">People</label>
                <div>
                    <span className="lighter-gray">Created By: </span>
                    <span title={this.props.createdByEmail}>
                        {this.props.createdBy}
                    </span>
                </div>
                { closedBySection }
            </div>
        );
    }
}

export default People;
