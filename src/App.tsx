import React, { Component, createRef } from 'react';
import { hot } from 'react-hot-loader';

import Info from './components/info';
import Commit from './components/commit';
import Scroll from './components/scroll';

import GitHub from './github';

interface Commit {
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

interface Props {

}

interface State {
  repo?: Repo;
  commits: Commit[];
}

class App extends Component<Props, State> {
  private scrollRef: React.RefObject<HTMLDivElement>;
  private observer: IntersectionObserver;

  constructor(props: Props) {
    super(props);
    this.scrollRef = createRef<HTMLDivElement>();

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const { isIntersecting } = entry;
          if (isIntersecting && entry.target.id === 'scroll') {
            if (this.state.repo) {
              GitHub.fetchCommits('rails/rails')
                .then(commits => {
                  this.setState((state) => ({
                    ...state,
                    commits: [...state.commits, ...commits]
                  }));
                });
            }
          }
        });
      },
      options
    );
    this.state = {commits: []};
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (!this.state.repo) {
      // first time, get the repo itself first
      GitHub.fetchRepo('rails/rails')
        .then(repo => this.setState({repo}))
        .then(() => GitHub.fetchCommits('rails/rails'))
        .then(commits => {
          this.setState((state) => ({
            ...state,
            commits: [...state.commits, ...commits]
          }));
        })
        .catch(error => console.log('error', error));
    }

    if (this.scrollRef.current) {
      this.observer.observe(this.scrollRef.current);
    }
  }

  render() {
    return(
      <div className='container'>
        {this.state.repo && <Info {...this.state.repo} />}
        <div className="commits list-group list-group-flush">
          {this.state.repo && this.state.commits.map((commit, index) => (<Commit key={index} {...commit} />))}
          <Scroll ref={this.scrollRef} />
        </div>
      </div>
    )
  }
}

export default hot(module)(App);
