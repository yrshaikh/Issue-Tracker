import React, { Component } from 'react';
import GravatarWithUserInfo from './../../../shared/gravatar-with-user-info';

class AuthorAndResolver extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.issue = this.props.issue;
    }
    
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    
    render () {
		return (
            <span>
			    {this.renderCreatedByAndClosedBy()}
            </span>
		);
    }
    
	renderCreatedByAndClosedBy(){
		var output = [];

		output.push(<GravatarWithUserInfo
			label="Opened by"
			createdBy={this.state.issue.createdBy}
			createdByEmail={this.state.issue.createdByEmail}
			createdOn={this.state.issue.createdOn}
			size={35}
			key={1} />);

		if(this.state.issue.closedBy){
			output.push(<GravatarWithUserInfo 
				label="Closed by"
				createdBy={this.state.issue.closedBy}
				createdByEmail={this.state.issue.closedByEmail}
				createdOn={this.state.issue.closedOn}
				size={35} 
				key={2} />);
		}
		
		return(output);
	}
}

export default AuthorAndResolver;