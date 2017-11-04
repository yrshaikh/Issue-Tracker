import React, {Component} from 'react';

class Description extends Component {

    constructor (props) {

        super(props);
        this.state = {'description': ''};
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange (event) {

        const value = event.target.value;
        this.setState({'description': value});
        // eslint-disable-next-line react/prop-types
        this.props.change('description', value);

    }

    render () {

        // eslint-disable-next-line max-len
        const placeholderText = 'Steps to reproduce, what you expected to see, and what you saw it instead.';
        return (
            <div className="col-md-9">
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control text-area"
                        name="description"
                        rows="5"
                        placeholder={placeholderText}
                        value={this.state.description}
                        onChange={this.handleChange}>
                    </textarea>
                </div>
            </div>
        );

    }

}

export default Description;
