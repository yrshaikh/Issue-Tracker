import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineComment from './timeline/timeline-comment.jsx';
import TimelineItem from './timeline/timeline-item.jsx';

class Timeline extends Component {
    static get propTypes() {
        return {
            loading: PropTypes.bool,
            timeline: PropTypes.array,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            timeline: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.loading });
        this.setState({ timeline: nextProps.timeline });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="light-gray loading-message">
                    fetching history...
                </div>
            );
        }

        const output = [];
        const timeline = this.state.timeline;

        for (let index = 0; index < timeline.length; index += 1) {
            if (timeline[index].type === 'comment') {
                output.push(<TimelineComment key={index}
                    content={timeline[index].content}
                    createdBy={timeline[index].createdBy}
                    createdByEmail={timeline[index].createdByEmail}
                    createdOn={timeline[index].createdOn}
                />);
            } else {
                output.push(<TimelineItem key={index}
                    content={timeline[index].content}
                    createdBy={timeline[index].createdBy}
                    createdByEmail={timeline[index].createdByEmail}
                    createdOn={timeline[index].createdOn}
                />);
            }
        }

        return (
            <div className="fs-14">
                {output}
            </div>
        );
    }
}

export default Timeline;
