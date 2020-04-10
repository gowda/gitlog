export default {
  httpOptions: {
    method: 'GET',
    redirect: 'follow',
  },
  fetchRepo(name) {
    return fetch(`https://api.github.com/repos/${name}`, this.httpOptions)
      .then(response => response.json())
      .then(json => ({
        owner: json.owner.login,
        name: json.name,
        fullName: json.full_name,
        url: json.html_url,
        description: json.description,
        commits: []
      }));
  },
  fetchCommits(name) {
    return fetch(`https://api.github.com/repos/${name}/commits`, this.httpOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json.map(
          ({ sha, html_url, commit }) => ({
            author: `${commit.author.name} <${commit.author.email}>`,
            timestamp: commit.author.date,
            message: commit.message.length > 80 ? `${commit.message.substring(0, 77)} ...` : commit.message,
            sha: sha,
            url: html_url,
        }));
      });
  },
}
