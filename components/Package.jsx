export const Package = ({ content }) => {
  return (
    <div className="package-card">
      <div>
        <h4 className="repo-name mb-0">
          <a href={content.package.links.npm} className="repo-link">
            {content.package.name} v{content.package.version}
          </a>
        </h4>
      </div>
    </div>
  );
};
