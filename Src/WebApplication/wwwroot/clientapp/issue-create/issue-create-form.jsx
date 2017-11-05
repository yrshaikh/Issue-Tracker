import React, {Component} from 'react';
import Description from './body-components/description';
import ErrorMessage from './body-components/error-message';
import {IssuesApi} from './../apis/issues-api';
import LoadingButtons from './body-components/loading-buttons';
import PropTypes from 'prop-types';
import SelectAssignee from './../shared/components/select-assignee';
import SelectPriority from './../shared/components/select-priority';
import SubmitButtons from './body-components/submit-buttons';
import Title from './body-components/title';
import {getSlug} from './../shared/utils';

class IssueCreateForm extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'assignees': [],
            'error': false,
            'issue': {
                'assigneeId': null,
                'assigneeName': 'Unassigned',
                'description': '',
                'priorityId': 3,
                'priorityName': 'Normal',
                'projectId': this.props.defaultProjectId,
                'title': ''
            },
            'loading': false,
            'priorities': []
        };
        this.handleChange = this.handleChange.bind(this);
        this.updatePriorityHandler = this.updatePriorityHandler.bind(this);
        this.updateAssigneeHandler = this.updateAssigneeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    static get propTypes () {

        return {'defaultProjectId': PropTypes.number};

    }

    render () {

        return (
            <form id="issue-create-form" className="row custom-form">
                <Title title={this.state.issue.title}
                    change={this.handleChange} />
                <Description description={this.state.issue.description}
                    change={this.handleChange} />
                <div className="sidebar col-md-3">
                    <SelectAssignee
                        projectId={this.state.issue.projectId}
                        issueId={this.state.issue.issueId}
                        id={this.state.issue.assigneeId}
                        label={this.state.issue.assigneeName}
                        updateHandler={this.updateAssigneeHandler}
                    />
                    <SelectPriority
                        issueId={this.state.issue.issueId}
                        id={this.state.issue.priorityId}
                        label={this.state.issue.priorityName}
                        updateHandler={this.updatePriorityHandler}
                    />
                </div>
                {this.renderButtons()}
                {this.renderErrorMessage()}
            </form>
        );

    }

    renderButtons () {

        if (this.state.loading) {

            return (
                <LoadingButtons />
            );

        }

        return (
            <SubmitButtons save={this.handleSubmit} />
        );

    }

    renderErrorMessage () {

        if (this.state.error) {

            return (
                <ErrorMessage />
            );

        }

        return '';

    }

    handleProjectChange (event, projectId) {

        this.handleChange('projectId', projectId);

    }

    handleChange (name, value) {

        const issue = this.state.issue;
        issue[name] = value;
        this.setState({issue});

    }

    handleSubmit () {

        this.setState({'loading': true});
        this.setState({'error': false});
        const slug = getSlug(this.state.issue.title),
            that = this;
        IssuesApi.createIssue(
            this.state.issue.projectId,
            this.state.issue.title,
            this.state.issue.description,
            this.state.issue.priorityId,
            this.state.issue.assigneeId
        ).
            then((response) => {

                that.setState({'loading': false});
                if (response.error) {

                    that.setState({'error': true});

                } else {

                    window.location.href = `/issue/${response.issueId}/${slug}`;

                }

            });

    }

    updateAssigneeHandler (id, value) {

        const issue = this.state.issue;
        issue.assigneeId = id;
        issue.assigneeName = value;
        this.setState({issue});

    }

    updatePriorityHandler (id, value) {

        const issue = this.state.issue;
        issue.priorityId = id;
        issue.priorityName = value;
        this.setState({issue});

    }

}

export default IssueCreateForm;
