import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            classes: 'success',
            visible: false,
        };
    }

    componentWillMount() {
        this.token = PubSub.subscribe('NOTIFY', (topic, object) => {
            const message = object.message;
            const classes = object.classes;
            this.setState({ message });
            if (classes && (classes === 'success' || classes === 'error')) {
                this.setState({ classes });
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
            const notificationStyle = `notification ${this.state.classes}`;
            return (
                <div className={notificationStyle}>
                    {this.state.message}
                </div>
            );
        }
        return (<div></div>);
    }
}

export default Notification;
