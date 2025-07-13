import React from 'react';

function Card(props) {
  const { className, slim } = props;

  const defaultClasses = `transition-all duration-200 bg-bg-content dark:bg-bg-content-dark border border-card-border dark:border-card-border-dark rounded-2xl shadow-sm ${slim ? 'p-4' : 'p-4 md:p-8'}`;

  let useClasses = defaultClasses + ' ' + className;

  return (
    <div className={useClasses}>
      {props.children}
    </div>
  );
}

export default Card;
