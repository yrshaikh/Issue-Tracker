import React, { Component } from 'react';

class LoadingButtons extends Component {
    render() {
        return (
            <div className="col-md-12">
                <button type="button" id="create"
                    className="btn btn-default" disabled="disabled">
                    Submitting
                </button>
            </div>
        );
    }
}

export default LoadingButtons;
