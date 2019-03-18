import React from 'react';
import PropTypes from 'prop-types';

const Title = ({text, additionalClasses}) => 
    <h1 className={`title text-center text-muted mb-5 ${additionalClasses}`}>
      {text}
    </h1>;

Title.propTypes = {
  text: PropTypes.string.isRequired,
  additionalClasses: PropTypes.string
};

export default Title;