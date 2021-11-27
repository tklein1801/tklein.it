export const Project = ({ project }) => {
  const { owner, name, description, primaryLanguage, stargazerCount, forkCount } = project;
  const owner_url = 'https://github.com/' + owner.login;
  const repo_url = owner_url + '/' + name;
  const stargazer_url = repo_url + '/stargazers';
  const fork_url = repo_url + '/network/members';

  return (
    <div class="project-card">
      <div>
        <h4 class="repo-name">
          <a href={owner_url} class="repo-link">
            @{owner.login}
          </a>
          /
          <a href={repo_url} class="repo-link">
            {name}
          </a>
        </h4>
        <p class="repo-description">{description || 'No description'}</p>
        <div class="repo-info row">
          <div>
            <p>{primaryLanguage.name}</p>
          </div>

          <div>
            <a href={stargazer_url} class="repo-link row">
              <i class="far fa-star"></i>
              <p>{stargazerCount}</p>
            </a>
          </div>

          <div>
            <a href={fork_url} class="repo-link row">
              <i class="fas fa-code-branch"></i>
              <p>{forkCount}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
