/* global require */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimelineComment from './timeline/timeline-comment';
import TimelineItem from './timeline/timeline-item';
const axios = require('axios');

class Timeline extends Component {

    constructor (props) {

        super(props);
        this.state = {
            'issueId': props.issueId,
            'loading': true,
            'timeline': []
        };

    }

    static get propTypes () {

        return {'issueId': PropTypes.number};

    }

    componentDidMount () {

        this.getTimeline();

    }

    getTimeline () {

        const that = this;
        axios.get(`/issue/${this.state.issueId}/timeline`).
            then((response) => {

                that.setState({'timeline': response.data});
                that.setState({'loading': false});

            }).
            catch((error) => error);

    }

    render () {

        if (this.state.loading) {

            return (
                <div className="light-gray loading-message">
                    fetching history...
                </div>
            );

        }

        const incrementValue = 1,
            output = [],
            timeline = this.state.timeline;

        for (let index = 0; index < timeline.length; index += incrementValue) {

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

    updateTimeline (data) {

        const timeline = this.state.timeline;
        timeline.push(data);
        this.setState('timeline', timeline);

    }

}

export default Timeline;
