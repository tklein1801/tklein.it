import style from './experience.module.css';

export const Timeline = () => {
  return (
    <section>
      <div className={style.timeline}>
        <div className={`${style.container} ${style.right}`}>
          <div className={style.content}>
            <h2>2017</h2>
            <p>Lorem ipsum..</p>
          </div>
        </div>
        <div className={`${style.container} ${style.right}`}>
          <div className={style.content}>
            <h2>2016</h2>
            <p>Lorem ipsum..</p>
          </div>
        </div>
      </div>
    </section>
  );
};
