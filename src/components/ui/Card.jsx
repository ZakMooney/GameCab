import React from 'react';

function Card(props) {
  const { className, slim } = props;

  const defaultClasses = `transition-all duration-200 bg-bg-content dark:bg-bg-content-dark rounded-2xl shadow-lg p-4`;

  let useClasses = defaultClasses + ' ' + className;

  return (
    <div className={useClasses}>
      {props.children}
    </div>
  );
}

export default Card;
