import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
//import 'react-sliding-pane/dist/react-sliding-pane.css';
class SelectPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.issueId,
            priorityId: this.props.id,
            priorityName: this.props.label,
            isPaneOpen: false
        };
    }
    render() {
        return (
            <div className='form-group sidebar-item'>
                <div id='assignee-view'>
                    <label className='fw-bold w-100 hover-link' onClick={() => this.setState({ isPaneOpen: true })}>
                        Assignee
                        <i className='fa fa-cog pull-right' />
                    </label>
                    {
                        this.state.assigneeName ?
                            <div className='cap'>{this.state.assigneeName}</div> :
                            <div className='gray'>Un-Assigned</div>
                    }
                </div>
                <SlidingPane
                    className='assignee-sliding-pane'
                    overlayClassName='it-overlay-class'
                    isOpen={this.state.isPaneOpen}
                    title={'#' + this.state.issueId + ' - Update Priority'}
                    subtitle="When everything's a priority, nothing's a priority."
                    from='right'
                    width='355px'
                    onRequestClose={() => {
                        this.setState({ isPaneOpen: false });
                    }}>
                    <div>
                        <ul>
                            <li>Un-Assigned</li>
                            <li>Yasser Shaikh</li>
                            <li>Cristiano Ronaldo</li>
                        </ul>
                    </div>
                </SlidingPane>
            </div>
        );
    }
}

export default SelectPriority;