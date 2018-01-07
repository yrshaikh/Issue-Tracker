import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
        };
    }

    render() {
        return (
            <form className="col-sm-6" action="/projects/new">
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-12 col-form-label">Project Name</label>
                    <div className="col-sm-12">
                        <input type="text" className="form-control text-box" id="name"
                            name="name" placeholder="My Awesome Project" />
                    </div>
                    <div className="col-sm-12 help">
                        Keep it short and sweet.
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-sm-3 col-sm-9">
                        <button type="submit" className="btn btn-success">
                            Create this Project
                        </button>
                        <a href="/projects" className="btn btn-outline-dark">Cancel</a>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;
