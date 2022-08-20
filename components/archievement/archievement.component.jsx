import React from 'react';

export const AchievementWrapper = ({ achievements }) => {
  return (
    <div id="achievement">
      {achievements.map((achievement, index) => (
        <Achievement key={index} {...achievement} />
      ))}
    </div>
  );
};

export const Achievement = ({ title, subtitle }) => {
  return (
    <div className="stats-card">
      <h5 className="count">{title}</h5>
      <p className="label">{subtitle}</p>
    </div>
  );
};
