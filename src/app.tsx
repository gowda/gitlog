import React, { useEffect, useRef, useState } from 'react';

import Info from './components/info';
import Commit from './components/commit';
import Scroll from './components/scroll';

import GitHub from './github';

interface ICommit {
  author: string;
  timestamp: string;
  message: string;
  sha: string;
}

interface Repo {
  owner: string;
  name: string;
  fullName: string;
  url: string;
  description: string;
}

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [repo, setRepo] = useState<Repo>();
  const [commits, setCommits] = useState<ICommit[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      const options = {
        rootMargin: '0px',
        threshold: 1.0,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting && entry.target.id === 'scroll') {
            if (repo) {
              GitHub.fetchCommits('rails/rails').then((moreCommits) =>
                setCommits([...commits, ...moreCommits])
              );
            }
          }
        });
      }, options);
      observer.observe(scrollRef.current);
    }
  }, [scrollRef.current]);

  useEffect(() => {
    if (!fetched) {
      GitHub.fetchRepo('rails/rails')
        .then((newRepo: Repo) => setRepo({ ...newRepo }))
        .then(() => setFetched(true))
        .then(() => GitHub.fetchCommits('rails/rails'))
        .then((newCommits: ICommit[]) => setCommits([...newCommits]))
        .catch((error) => console.log('error', error));
    }
  });

  return (
    <div className='container'>
      {repo && <Info {...repo} />}
      <div className='commits list-group list-group-flush'>
        {commits &&
          commits.map((commit, index) => <Commit key={index} {...commit} />)}
        <Scroll ref={scrollRef} />
      </div>
    </div>
  );
};
