import React from 'react';
import ProjectHeader from '../common/header.jsx';
import Body from '../create/body.jsx';

class ProjectCreateApp extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { defaultProjectId: window.app.defaultProjectId };        
    // }

    render() {
        return (
            <div>
                <ProjectHeader
                    header='Setup a New Project'
                    subHeader='Lorem ispum dispum blah bleh.' />
                <Body />
            </div>
        );
    }
}

export default ProjectCreateApp;
