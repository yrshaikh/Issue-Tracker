import React, {Component} from 'react';
import Body from './issue-list/body';
import Header from './issue-list/header';

class IssueListApp extends Component {

    render () {

        return (
            <div>
                <Header />
                <Body />
            </div>
        );

    }

}

export default IssueListApp;
