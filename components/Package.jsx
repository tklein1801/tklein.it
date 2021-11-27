export const Package = ({ content }) => {
  return (
    <div class="package-card">
      <div>
        <h4 class="repo-name mb-0">
          <a href={content.package.links.npm} class="repo-link">
            {content.package.name} v{content.package.version}
          </a>
        </h4>
      </div>
    </div>
  );
};
