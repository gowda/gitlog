import React from 'react';

export default (props) => {
  return (
    <a href="#" className="commit pl-0 pr-0 list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="message mb-1">{props.message}</h5>
        <small className="timestamp text-muted">{props.timestamp}</small>
      </div>
      <h5 className="author mb-1">
        <small className="text-muted">{props.author}</small>
      </h5>
      <small>{props.sha}</small>
    </a>
  );
}
