/* global require */
import React, {Component} from 'react';
import CommentView from './shared/comment-view';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
const axios = require('axios');

class TitleDescription extends Component {

    static get propTypes () {

        return {

            'createdBy': PropTypes.string,
            'createdByEmail': PropTypes.string,
            'createdOn': PropTypes.string,
            'description': PropTypes.string,
            'issueId': PropTypes.number,
            'title': PropTypes.string

        };

    }

    constructor (props) {

        super(props);
        this.state = {
            'createdBy': props.createdBy,
            'createdByEmail': props.createdByEmail,
            'createdOn': props.createdOn,
            'description': props.description,
            'editIssue': false,
            'error': false,
            'issueId': props.issueId,
            'submitting': false,
            'title': props.title
        };

        this.cancelTitleDescriptionEdit = this.cancelTitleDescriptionEdit.
            bind(this);
        this.updateTitleDescription = this.updateTitleDescription.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount () {

        PubSub.subscribe('ISSUE_EDIT', this.handleIssueEdit.bind(this));

    }

    handleIssueEdit () {

        this.setState({'editIssue': true});

    }

    cancelTitleDescriptionEdit () {

        this.setState({'editIssue': false});

    }

    updateTitleDescription () {

        this.setState({'editIssue': false});
        axios.post('/issue/updatetitledescription', {
            'description': this.state.description,
            'issueId': this.state.issueId,
            'title': this.state.title
        }).
            catch(() => {

                self.setState({'submitting': false});
                self.setState({'error': true});
                self.setState({'editIssue': true});

            });
        this.setState({'editIssue': false});

    }

    handleChange (event) {

        const name = event.target.name;
        this.setState({[name]: event.target.value});

    }

    onDescriptionChange (editorState) {

        this.setState({editorState});

    }

    render () {

        let titleAndDescription = this.renderTitleAndDescription();
        if (this.state.editIssue) {

            titleAndDescription = this.renderTitleAndDescriptionInEditMode();

        }
        const renderError = this.renderError();
        return (
            <div>
                {titleAndDescription}
                <div>
                </div>
                {renderError}
            </div>
        );

    }

    renderTitleAndDescription () {

        return (
            <div>
                <div className="form-group">
                    <span className="issue-header fw-bold">
                        {this.state.title}
                    </span>
                </div>
                <CommentView
                    type="description"
                    description={this.state.description}
                    createdByEmail={this.state.createdByEmail}
                    createdBy={this.state.createdBy}
                    createdOn={this.state.createdOn}
                />
            </div>
        );

    }

    renderTitleAndDescriptionInEditMode () {

        // eslint-disable-next-line max-len
        const placeholderText = 'Steps to reproduce, what you expected to see, and what you saw it instead.';
        return (
            <div>
                <div className="form-group">
                    <input type="text" autoFocus
                        name="title"
                        className="form-control text-box title fw-bold"
                        placeholder="Enter a one-line summary of the issue."
                        value={this.state.title}
                        onChange={this.handleChange}>
                    </input>
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control text-area"
                        name="description"
                        rows="5"
                        placeholder={placeholderText}
                        value={this.state.description}
                        onChange={this.handleChange}
                    >
                    </textarea>
                </div>
                <div className="form-group ta-right">
                    <button type="button"
                        className="btn btn-default mr-10"
                        onClick={this.cancelTitleDescriptionEdit}>
                        Cancel
                    </button>
                    <button type="button" id="create"
                        className="btn btn-success"
                        onClick={this.updateTitleDescription}>
                        Update Issue
                    </button>
                </div>
            </div>
        );

    }

    renderError () {

        if (this.state.error) {

            return (
                <div className="mt-10">
                    <div className="alert alert-danger" role="alert">
                        Whoops! Something went wrong. Please try again.
                    </div>
                </div>
            );

        }
        return '';

    }

}

export default TitleDescription;
