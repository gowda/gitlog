import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Info from './components/info';
import Commit from './components/commit';
import Scroll from './components/scroll';

import GitHub from './github';

/* Few commits from rails */
const COMMITS = [
  {
    author: 'Nick Soracco <nick.soracco@ring.com>',
    timestamp: 'Thu Jan 2 11:50:06 2020 -0800',
    message: 'Minor fix to correctly identify the entire scope of the loopback address, per RFC-3330.',
    sha: '8544c9c23687964ab754c06a7745215a5369a4e0',
  },
  {
    author: 'Adam Hess <HParker@github.com>',
    timestamp: 'Wed Apr 8 15:29:08 2020 -0700',
    message: 'Add attribute_names method on errors',
    sha: '89eb5540258d217b780dee384c47445a2c1e8a46',
  },
  {
    author: 'Adam Hess <HParker@github.com>',
    timestamp: 'Wed Apr 8 15:09:37 2020 -0700',
    message: 'Update the Active Model deprecation warning',
    sha: '19ec6233cc8fa331c327216b720e33a58e45d7b7',
  },
  {
    author: 'Rafael Mendonça França <rafael@franca.dev>',
    timestamp: 'Wed Apr 8 17:22:38 2020 -0400',
    message: 'Move CHANGELOG entry to the top',
    sha: '855c9897eb98ea4d77ec5036d15cdd1764698838',
  },
  {
    author: 'Joel Hawksley <joel@hawksley.org>',
    timestamp: 'Wed Apr 8 11:52:36 2020 -0600',
    message: '`ActionView::Base.annotate_template_file_names` only annotates HTML output.',
    sha: '3b28486e9352c7aedce6b6105d270f93308c4797',
  },
  {
    author: 'Vinicius Stock <vinicius.stock@shopify.com>',
    timestamp: 'Wed Apr 8 15:39:09 2020 -0400',
    message: 'Build Journey::Path::Pattern ast in a single loop',
    sha: '5c4f2ebd90d3e349e92803bba026f66962f8b8bc',
  },
  {
    author: 'Ryuta Kamizono <kamipo@gmail.com>',
    timestamp: 'Thu Apr 9 00:54:48 2020 +0900',
    message: 'Update tzinfo to avoid taint warnings',
    sha: '09ff877610a09d930ca84a94113f678d4e79e100',
  },
  {
    author: 'John Hawthorn <john@hawthorn.email>',
    timestamp: 'Tue Apr 7 19:23:13 2020 -0700',
    message: 'Update actionview CHANGELOG',
    sha: '960ceb237ac886711b8d50cdca3ac13c2e147be8',
  },
  {
    author: 'eileencodes <eileencodes@gmail.com>',
    timestamp: 'Fri Apr 3 14:33:14 2020 -0400',
    message: 'Add regression test for enum getter/setter behavior',
    sha: 'c34d14776719fc8c77277efa31c90f92c8b69a14',
  },
  {
    author: 'Rafael Mendonça França <rafael@franca.dev>',
    timestamp: 'Tue Apr 7 12:40:11 2020 -0400',
    message: 'Make _protected_ivars private',
    sha: 'f1a2c021e3c4d4e0916c8bb2e4c13bfed55d177e',
  },
  {
    author: 'Bill Cromie <bill.cromie@gmail.com>',
    timestamp: 'Sun Mar 22 14:26:13 2020 -0400',
    message: "Add a route to handle Mandrill's webhook URL check",
    sha: 'fce29be3356269d2a0f586e15dcaf91ae680278a',
  },
  {
    author: 'Jonathan Hefner <jonathan@hefner.pro>',
    timestamp: 'Mon Apr 6 23:31:29 2020 -0500',
    message: 'Fix random CI fail due to auto-updating timestamp',
    sha: '056b252010f90210b608d3a950d43a994218c32f',
  },
];

/* rails */
const REPOSITORY = {
  owner: 'rails',
  name: 'rails',
  fullName: 'rails/rails',
  url: 'https://github.com/rails/rails',
  description: 'Ruby on Rails',
  commits: COMMITS,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    if (!this.state.repo) {
      // first time, get the repo itself first
      GitHub.fetchRepo('rails/rails')
        .then(repo => this.setState({repo}))
        .then(() => GitHub.fetchCommits('rails/rails'))
        .then(commits => {
          this.setState((state, _props) => ({
            repo: {
              ...state.repo,
              commits: [...state.repo.commits, ...commits],
            }
          }));
        })
        .catch(error => console.log('error', error));
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const { isIntersecting } = entry;
          if (isIntersecting && entry.target.id === 'scroll') {
            if (this.state.repo) {
              GitHub.fetchCommits('rails/rails')
                .then(commits => {
                  this.setState((state, _props) => ({
                    repo: {
                      ...state.repo,
                      commits: [...state.repo.commits, ...commits]
                    },
                  }));
                });
            }
          }
        });
      },
      options
    );
    this.observer.observe(this.scroll);
  }

  render() {
    return(
      <div className='container'>
        <Info {...this.state.repo} />
        <div className="commits list-group list-group-flush">
          {this.state.repo && this.state.repo.commits.map((commit, index) => (<Commit key={index} {...commit} />))}
          <Scroll ref={el => this.scroll = el} />
        </div>
      </div>
    )
  }
}

export default hot(module)(App);
