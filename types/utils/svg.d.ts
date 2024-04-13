import React from 'react';
import mySvg from './my-svg.svg';

const MyComponent: React.FC = () => {
  return (
    <div>
      <img src={mySvg} alt="My SVG" />
    </div>
  );
};

export default MyComponent;
