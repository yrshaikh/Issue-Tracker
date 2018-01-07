import React from 'react';
import PropTypes from 'prop-types';

const ProjectHeader = props => (
    <div className="hero-banner">
        <div className="hero-banner-inner">
            <div className="hero-banner-title">
                <h1>{props.header}</h1>
                <span className="hero-banner-message">{props.subHeader}</span>
            </div>
        </div>
    </div>
);

ProjectHeader.propTypes = {
    header: PropTypes.string.isRequired,
    subHeader: PropTypes.string,
};

export default ProjectHeader;
