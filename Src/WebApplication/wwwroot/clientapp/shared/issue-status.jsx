import React, {Component} from 'react';
import PropTypes from 'prop-types';

class IssueStatus extends Component {

    constructor (props) {

        super(props);
        this.state = {'status': props.status};

    }

    static get propTypes () {

        return {
            'additionalClasses': PropTypes.string,
            'status': PropTypes.string
        };

    }

    componentWillReceiveProps (nextProps) {

        this.setState({'status': nextProps.status});

    }

    getStyle () {

        let classes = 'badge badge-';
        if (this.state.status === 'open' || this.state.status === 'reopened') {

            classes += 'success ';

        } else if (this.state.status === 'closed') {

            classes += 'danger ';

        }

        if (this.props.additionalClasses) {

            classes += this.props.additionalClasses;

        }

        return classes;

    }

    render () {

        const classes = this.getStyle();
        return (
            <span className={classes}>
                {this.state.status}
            </span>
        );

    }

}

export default IssueStatus;
