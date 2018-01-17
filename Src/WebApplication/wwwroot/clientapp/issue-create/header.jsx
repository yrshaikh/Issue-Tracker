import React, { Component } from 'react';
import PubSub from 'pubsub-js';

const Select = require('react-select/dist/react-select.js');

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { projectId: -1 };

        this.projectChanged = this.projectChanged.bind(this);
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects() {
        this.projects = [];
        for (let index = 0; index < window.app.projects.length; index += 1) {
            if (index === 0) {
                this.setState({ projectId: window.app.defaultProjectId });
            }
            this.projects.push({
                label: window.app.projects[index].Name,
                value: window.app.projects[index].Id,
            });
        }
    }

    projectChanged(selection) {
        this.setState({ projectId: selection.value });
        PubSub.publish('PROJECT_CHANGED', selection.value);
    }

    render() {
        return (
            <div id="hero-issues-create"
                className="hero-banner hero-banner-issue-create">
                <div className="hero-banner-inner">
                    <div className="hero-banner-title">
                        <h1>Create a New Issue</h1>
                        <div className="select-project col-md-8">
                            <div className="form-group">
                                <label>Project</label>
                                <Select
                                    name="form-field-name"
                                    value={this.state.projectId}
                                    options={this.projects}
                                    onChange={this.projectChanged}
                                    clearable={false}
                                    searchable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
