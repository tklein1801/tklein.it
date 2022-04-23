import style from './experience.module.css';

export const Timeline = () => {
  const events = [
    {
      year: 'Aug. 2021 - Today',
      headline: 'Computer Science Expert Software Development',
      description:
        'On August 1, 2021, I started my 3-year apprenticeship as Computer Science Expert for Software Development at Tchibo GmbH.',
    },
    {
      left: true,
      year: 'Jun. 2019 - Jun. 2021',
      headline: 'Commercial Assistant Information Processing (KAI)',
      description:
        'Started my two-year school-based training as a Commerical Assistant Information Processing (Kaufmännischer Assistent Schwerpunkt Informationsverarbeitung)',
    },
    {
      year: '2019',
      headline: 'MSA KGS Schneverdingen',
      description: 'In July 2019 I successfully graduated from school at KGS Schneverdingen (MSA)',
    },
  ];

  return (
    <section>
      <h1>Experience</h1>

      <div className={style.timeline}>
        {events.map((element, index) => (
          <TimelineEvent key={index} {...element} />
        ))}
      </div>
    </section>
  );
};

const TimelineEvent = ({ year, headline, description, left = false }) => {
  return (
    <div className={`${style.container} ${left ? style.left : style.right}`}>
      <div className={style.content}>
        <p className={style.year}>{year}</p>
        <p className={style.headline}>{headline}</p>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  );
};
