import React, {Component} from 'react';

class Title extends Component {

    constructor (props) {

        super(props);
        this.state = {'title': ''};
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange (event) {

        const value = event.target.value;
        this.setState({'title': value});
        // eslint-disable-next-line react/prop-types
        this.props.change('title', value);

    }

    render () {

        let titleErrorMessage = '';
        if (!this.state.title) {

            titleErrorMessage = 'Title should atleast be of 10 characters';

        }

        return (
            <div className="col-md-12">
                <div className="form-group">
                    <div>
                        <label>Subject</label>
                        <span className="form-text text-danger pull-right">
                            {titleErrorMessage}
                        </span>
                    </div>
                    <input type="text" autoFocus
                        name="title"
                        className="form-control text-box title fw-bold"
                        placeholder="Enter a one-line summary of the issue."
                        value={this.state.title}
                        onChange={this.handleChange} >
                    </input>
                </div>
            </div>
        );

    }

}

export default Title;
