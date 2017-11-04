import React, {Component} from 'react';

class SubmitButtons extends Component {

    constructor (props) {

        super(props);
        this.state = {'submitting': false};

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render () {

        return (
            <div className="col-md-12">
                <button type="button" id="create" className="btn btn-success"
                    onClick={this.handleSubmit}>Create Issue</button>
            </div>
        );

    }

    handleSubmit () {

        // eslint-disable-next-line react/prop-types
        this.props.save();

    }

}

export default SubmitButtons;
