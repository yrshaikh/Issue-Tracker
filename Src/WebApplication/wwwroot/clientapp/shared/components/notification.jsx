import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            type: 'success',
            visible: false,
        };
    }

    componentWillMount() {
        this.token = PubSub.subscribe('NOTIFY', (topic, message, type) => {
            this.setState({ message });
            if (type && (type === 'success' || type === 'error')) {
                this.setState({ type });
            }
            this.setState({ visible: true });
            const that = this;
            setTimeout(() => {
                that.setState({ visible: false });
            }, 3000);
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    showMessage() {
        this.setState({ editIssue: true });
    }

    render() {
        if (this.state.visible) {
            return (
                <div className="notification">
                    {this.state.message}
                </div>
            );
        }
        return (<div></div>);
    }
}

export default Notification;
