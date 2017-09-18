import React, { Component } from 'react';
import PubSub from 'pubsub-js';
const axios = require('axios');

class IssueStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.status
		};
    }
    getStyle(){
        var classes = 'badge badge-';
        if(this.state.status === 'open' || this.state.status === 'reopened')
            classes += 'success';
        else if(this.state.status === 'closed')
            classes += 'danger';

        if(this.props.additionalClasses)
            classes += ' ' + this.props.additionalClasses;
        return classes;
    }
	render() {
        var classes = this.getStyle();
		return (
            <div className={classes}>
                {this.state.status}
            </div>
		);
	}
}

export default IssueStatus;