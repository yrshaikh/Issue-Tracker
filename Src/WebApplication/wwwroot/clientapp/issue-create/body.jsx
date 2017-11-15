import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IssueCreateForm from './issue-create-form.jsx';

class Body extends Component {
    static get propTypes() {
        return { defaultProjectId: PropTypes.number };
    }

    render() {
        return (
            <div id="issues-create" className="body">
                <IssueCreateForm
                    defaultProjectId={this.props.defaultProjectId} />
            </div>
        );
    }
}

export default Body;
