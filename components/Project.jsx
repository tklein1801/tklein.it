export const Project = ({ project }) => {
  const { owner, name, description, primaryLanguage, stargazerCount, forkCount } = project;
  const owner_url = 'https://github.com/' + owner.login;
  const repo_url = owner_url + '/' + name;
  const stargazer_url = repo_url + '/stargazers';
  const fork_url = repo_url + '/network/members';

  return (
    <div className="project-card">
      <div>
        <h4 className="repo-name">
          <a href={owner_url} className="repo-link">
            @{owner.login}
          </a>
          /
          <a href={repo_url} className="repo-link">
            {name}
          </a>
        </h4>
        <p className="repo-description">{description || 'No description'}</p>
        <div className="repo-info row">
          <div>
            <p>{primaryLanguage.name}</p>
          </div>

          <div>
            <a href={stargazer_url} className="repo-link row">
              <i className="far fa-star"></i>
              <p>{stargazerCount}</p>
            </a>
          </div>

          <div>
            <a href={fork_url} className="repo-link row">
              <i className="fas fa-code-branch"></i>
              <p>{forkCount}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
