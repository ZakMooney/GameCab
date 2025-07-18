import React from 'react';

function Card(props) {
  const { className, slim } = props;

  const defaultClasses = `transition-all duration-200 bg-bg-content/40 dark:bg-bg-content-dark/40 border border-card-border dark:border-card-border-dark rounded-2xl shadow-sm p-4`;

  let useClasses = defaultClasses + ' ' + className;

  return (
    <div className={useClasses}>
      {props.children}
    </div>
  );
}

export default Card;
