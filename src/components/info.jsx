import React from 'react';

export default (props) => (
  <div className="mb-4">
    <a className="github" href={props.url}>
      <img src="GitHub-Mark-64px.png" alt="GitHub"></img>
      {props.fullName}
    </a>
    <h4>
      <small className="text-muted">{props.description}</small>
    </h4>
  </div>
);
