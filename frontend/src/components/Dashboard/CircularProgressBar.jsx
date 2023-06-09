import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ val, total, textColor }) => {
  const percentage = Math.round((val / total) * 100);

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={{
        // Customize the root svg element
        root: {},
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          // stroke: textColor,
          stroke: textColor,
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // Customize transition animation
          transition: 'stroke-dashoffset 6s ease .5s',
          // Rotate the path
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: '#d6d6d6',
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'round',
          // Rotate the trail
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        // Customize the text
        text: {
          // Text color
          fill: textColor,
          // Text size
          fontSize: '20px',
          dominantBaseline: 'middle',
          textAnchor: 'middle',
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: { textColor },
        },
      }}
    />
  );
};

export default CircularProgressBar;
