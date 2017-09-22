import React, { Component } from 'react';
import PubSub from 'pubsub-js';
const axios = require('axios');

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueId: window.app.issue.IssueId
		};
	}
	render() {
		return (
            <div className='col-md-3 sidebar'>
                <div className='form-group item'>
                    <span>
                        <label className='fw-bold'>Priority</label>
                        <i className='fa fa-cog pull-right cursor-hand' />
                    </span>
                    <div>Normal</div>
                </div>
                <div className='form-group item'>
                    <span>
                        <label className='fw-bold'>Assignee</label>
                        <i className='fa fa-cog pull-right cursor-hand' />
                    </span>
                    <div>John Cena</div>
                </div>
            </div>
		);
	}
}

export default Sidebar;