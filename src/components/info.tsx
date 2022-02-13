import React from 'react';

interface Props {
  url: string;
  fullName: string;
  description: string;
}

export default ({ url, fullName, description }: Props) => (
  <div className='mb-4'>
    <a className='github' href={url}>
      <img src='GitHub-Mark-64px.png' alt='GitHub' />
      {fullName}
    </a>
    <h4>
      <small className='text-muted'>{description}</small>
    </h4>
  </div>
);
