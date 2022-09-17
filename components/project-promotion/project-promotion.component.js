import style from './project-promotion.module.css';

export const ProjectPromotion = () => {
  return (
    <section>
      <div className={style.projectPromotion}>
        <div className={style.projectInformation}>
          <h1 className={style.projectName}>Budget-Buddy</h1>
          <p className={style.projectDescription}>
            ReactJS bases web-app to keep track of your finances and manage your montly budget.
          </p>
          <a className={style.projectLink}>Visit Project</a>
        </div>
        <div></div>
      </div>
    </section>
  );
};
