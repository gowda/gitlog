import React from 'react';

interface Props {
  message: string;
  timestamp: string;
  author: string;
  sha: string;
}

export default ({message, timestamp, author, sha}: Props) => {
  return (
    <a href="#" className="commit pl-0 pr-0 list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="message mb-1">{message}</h5>
        <small className="timestamp text-muted">{timestamp}</small>
      </div>
      <h5 className="author mb-1">
        <small className="text-muted">{author}</small>
      </h5>
      <small>{sha}</small>
    </a>
  );
}
