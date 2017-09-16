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
            <div className='col-md-3'>
                <div className='form-group'>
                    <label>Priority</label>
                    <div>Normal</div>
                </div>
                <div className='form-group'>
                    <label>Assignee</label>
                    <div>John Cena</div>
                </div>
            </div>
		);
	}
}

export default Sidebar;