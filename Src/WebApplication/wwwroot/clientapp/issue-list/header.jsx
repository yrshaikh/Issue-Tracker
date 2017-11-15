import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div id="hero-issues" className="hero-banner">
                <div className="hero-banner-inner issue-list">
                    <div className="hero-banner-title">
                        <h1>Issues</h1>
                        <a className="btn btn-success pull-right new-issue"
                            href="issue/new">New Issue</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
