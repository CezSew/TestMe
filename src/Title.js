import React from 'react';

const Title = ({text, additionalClasses}) => 
    <h1 className={`title text-center text-muted mb-5 ${additionalClasses}`}>
      {text}
    </h1>;

export default Title;