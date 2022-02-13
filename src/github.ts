const httpOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
};

const fetchRepo = (name: string) => fetch(`https://api.github.com/repos/${name}`, httpOptions)
      .then(response => response.json())
      .then(json => ({
        owner: json.owner.login,
        name: json.name,
        fullName: json.full_name,
        url: json.html_url,
        description: json.description,
        commits: []
      }));

const fetchCommits = (name: string) => fetch(`https://api.github.com/repos/${name}/commits`, httpOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json.map(
          ({ sha, html_url, commit }: any) => ({
            author: `${commit.author.name} <${commit.author.email}>`,
            timestamp: commit.author.date,
            message: commit.message.length > 80 ? `${commit.message.substring(0, 77)} ...` : commit.message,
            sha: sha,
            url: html_url,
        }));
      });

export default {fetchRepo, fetchCommits}
